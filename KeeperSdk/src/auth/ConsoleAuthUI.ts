import readline from 'readline'
import type { AuthUI3, DeviceApprovalChannel, TwoFactorChannelData } from '@keeper-security/keeperapi'
import { Authentication } from '@keeper-security/keeperapi'
import { logger } from '../utils/Logger'
import { extractErrorMessage } from '../utils/errors'

const APPROVAL_TIMEOUT_MS = 60_000
const CODE_VALIDATION_DELAY_MS = 2_000

enum DeviceVerificationMethod {
    Email = 0,
    KeeperPush = 1,
    TFA = 2,
    AdminApproval = 3,
}

function channelName(channel: number): string {
    switch (channel) {
        case DeviceVerificationMethod.Email:
            return 'Email Verification'
        case DeviceVerificationMethod.KeeperPush:
            return 'Keeper Push'
        case DeviceVerificationMethod.TFA:
            return 'Two-Factor Authentication'
        case DeviceVerificationMethod.AdminApproval:
            return 'Admin Approval'
        default:
            return `Channel ${channel}`
    }
}

function twoFactorChannelName(channelType: Authentication.TwoFactorChannelType): string {
    switch (channelType) {
        case Authentication.TwoFactorChannelType.TWO_FA_CT_TOTP:
            return 'Authenticator App (TOTP)'
        case Authentication.TwoFactorChannelType.TWO_FA_CT_SMS:
            return 'SMS'
        case Authentication.TwoFactorChannelType.TWO_FA_CT_DUO:
            return 'Duo Security'
        case Authentication.TwoFactorChannelType.TWO_FA_CT_RSA:
            return 'RSA SecurID'
        case Authentication.TwoFactorChannelType.TWO_FA_CT_DNA:
            return 'Keeper DNA'
        case Authentication.TwoFactorChannelType.TWO_FA_CT_U2F:
            return 'U2F Security Key'
        case Authentication.TwoFactorChannelType.TWO_FA_CT_WEBAUTHN:
            return 'WebAuthn Security Key'
        case Authentication.TwoFactorChannelType.TWO_FA_CT_KEEPER:
            return 'Keeper'
        default:
            return `2FA Channel ${channelType}`
    }
}

function askQuestion(rl: readline.Interface, question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => resolve(answer.trim()))
    })
}

function waitWithCancel(timeoutMs: number, cancel?: Promise<void>): Promise<void> {
    return new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, timeoutMs)
        cancel?.then(() => {
            clearTimeout(timer)
            resolve()
        })
    })
}

export class ConsoleAuthUI implements AuthUI3 {
    public async waitForDeviceApproval(channels: DeviceApprovalChannel[], isCloud: boolean): Promise<boolean> {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

        try {
            logger.info('\n--- Device Approval Required ---')
            logger.info('This device needs to be approved before you can log in.')
            logger.info('Available verification methods:')
            channels.forEach((ch, i) => {
                logger.info(`  ${i + 1}. ${channelName(ch.channel)}`)
            })

            const choice = await askQuestion(rl, '\nSelect method (number): ')
            const idx = parseInt(choice, 10) - 1

            if (isNaN(idx) || idx < 0 || idx >= channels.length) {
                logger.warn('Invalid selection, cancelling.')
                return false
            }

            const selected = channels[idx]
            logger.info(`\nSending ${channelName(selected.channel)} request...`)
            await selected.sendApprovalRequest()

            if (selected.validateCode) {
                const code = await askQuestion(rl, 'Enter verification code: ')
                if (!code) return false
                await selected.validateCode(code)
            } else {
                logger.info('Approval request sent. Waiting for approval on your other device...')
                await waitWithCancel(APPROVAL_TIMEOUT_MS)
            }

            return true
        } catch (e) {
            logger.error('Device approval error:', extractErrorMessage(e))
            return false
        } finally {
            rl.close()
        }
    }

    public async waitForTwoFactorCode(channels: TwoFactorChannelData[], cancel: Promise<void>): Promise<boolean> {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

        try {
            logger.info('\n--- Two-Factor Authentication Required ---')
            logger.info('Available 2FA methods:')
            channels.forEach((ch, i) => {
                const name = twoFactorChannelName(ch.channel.channelType!)
                logger.info(`  ${i + 1}. ${name}`)
            })

            const choice = await askQuestion(rl, '\nSelect method (number): ')
            const idx = parseInt(choice, 10) - 1

            if (isNaN(idx) || idx < 0 || idx >= channels.length) {
                logger.warn('Invalid selection, cancelling.')
                return false
            }

            const selected = channels[idx]
            const name = twoFactorChannelName(selected.channel.channelType!)

            if (selected.availablePushes && selected.availablePushes.length > 0) {
                const pushChoice = await askQuestion(rl, `Send push notification for ${name}? (y/n): `)
                if (pushChoice.toLowerCase() === 'y' && selected.sendPush) {
                    selected.sendPush(selected.availablePushes[0])
                    logger.info('Push sent. Waiting for approval...')
                    await waitWithCancel(APPROVAL_TIMEOUT_MS, cancel)
                    return true
                }
            }

            const code = await askQuestion(rl, `Enter ${name} code: `)
            if (!code) return false

            selected.sendCode(code)
            await waitWithCancel(CODE_VALIDATION_DELAY_MS, cancel)
            return true
        } catch (e) {
            logger.error('2FA error:', extractErrorMessage(e))
            return false
        } finally {
            rl.close()
        }
    }

    public async getPassword(isAlternate: boolean): Promise<string> {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
        try {
            const label = isAlternate ? 'alternate master password' : 'master password'
            return await askQuestion(rl, `Enter your ${label}: `)
        } finally {
            rl.close()
        }
    }
}
