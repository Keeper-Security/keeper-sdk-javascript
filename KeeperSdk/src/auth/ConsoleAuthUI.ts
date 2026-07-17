import type { AuthUI3, DeviceApprovalChannel, TwoFactorChannelData } from '@keeper-security/keeperapi'
import { Authentication } from '@keeper-security/keeperapi'
import { getSdkPlatform } from '../platform'
import { logger, extractErrorMessage, KeeperSdkError, AuthDefaults, ResultCodes } from '../utils'

export class ConsoleAuthUI implements AuthUI3 {
    private static readonly DEVICE_VERIFICATION = {
        Email: 0,
        KeeperPush: 1,
        TFA: 2,
        AdminApproval: 3,
    } as const

    private static channelName(channel: number): string {
        switch (channel) {
            case ConsoleAuthUI.DEVICE_VERIFICATION.Email:
                return 'Email Verification'
            case ConsoleAuthUI.DEVICE_VERIFICATION.KeeperPush:
                return 'Keeper Push'
            case ConsoleAuthUI.DEVICE_VERIFICATION.TFA:
                return 'Two-Factor Authentication'
            case ConsoleAuthUI.DEVICE_VERIFICATION.AdminApproval:
                return 'Admin Approval'
            default:
                return `Channel ${channel}`
        }
    }

    private static twoFactorChannelName(channelType: Authentication.TwoFactorChannelType): string {
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
                throw new KeeperSdkError(
                    `Unsupported 2FA channel type: ${channelType}`,
                    ResultCodes.UNSUPPORTED_2FA_CHANNEL
                )
        }
    }

    private static async waitWithCancel(timeoutMs: number, cancel?: Promise<void>): Promise<void> {
        const platform = getSdkPlatform()
        if (!cancel) {
            await platform.delay(timeoutMs)
            return
        }
        await Promise.race([platform.delay(timeoutMs), cancel])
    }

    public async waitForDeviceApproval(channels: DeviceApprovalChannel[], _isCloud: boolean): Promise<boolean> {
        const rl = getSdkPlatform().createReadline(
            typeof process !== 'undefined' ? process.stdin : undefined,
            typeof process !== 'undefined' ? process.stdout : undefined
        )

        try {
            logger.info('\n--- Device Approval Required ---')
            logger.info('This device needs to be approved before you can log in.')
            logger.info('Available verification methods:')
            channels.forEach((ch, i) => {
                logger.info(`  ${i + 1}. ${ConsoleAuthUI.channelName(ch.channel)}`)
            })

            const choice = (await rl.question('\nSelect method (number): ')).trim()
            const idx = parseInt(choice, 10) - 1

            if (isNaN(idx) || idx < 0 || idx >= channels.length) {
                logger.warn('Invalid selection, cancelling.')
                return false
            }

            const selected = channels[idx]
            logger.info(`\nSending ${ConsoleAuthUI.channelName(selected.channel)} request...`)
            await selected.sendApprovalRequest()

            if (selected.validateCode) {
                const code = (await rl.question('Enter verification code: ')).trim()
                if (!code) return false
                await selected.validateCode(code)
            } else {
                logger.info('Approval request sent. Waiting for approval on your other device...')
                await ConsoleAuthUI.waitWithCancel(AuthDefaults.APPROVAL_TIMEOUT_MS)
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
        const rl = getSdkPlatform().createReadline(
            typeof process !== 'undefined' ? process.stdin : undefined,
            typeof process !== 'undefined' ? process.stdout : undefined
        )

        try {
            logger.info('\n--- Two-Factor Authentication Required ---')
            logger.info('Available 2FA methods:')
            channels.forEach((ch, i) => {
                const name = ConsoleAuthUI.twoFactorChannelName(ch.channel.channelType!)
                logger.info(`  ${i + 1}. ${name}`)
            })

            const choice = (await rl.question('\nSelect method (number): ')).trim()
            const idx = parseInt(choice, 10) - 1

            if (isNaN(idx) || idx < 0 || idx >= channels.length) {
                logger.warn('Invalid selection, cancelling.')
                return false
            }

            const selected = channels[idx]
            const name = ConsoleAuthUI.twoFactorChannelName(selected.channel.channelType!)

            if (selected.availablePushes && selected.availablePushes.length > 0) {
                const pushChoice = (await rl.question(`Send push notification for ${name}? (y/n): `)).trim()
                if (pushChoice.toLowerCase() === 'y' && selected.sendPush) {
                    selected.sendPush(selected.availablePushes[0])
                    logger.info('Push sent. Waiting for approval...')
                    await ConsoleAuthUI.waitWithCancel(AuthDefaults.APPROVAL_TIMEOUT_MS, cancel)
                    return true
                }
            }

            const code = (await rl.question(`Enter ${name} code: `)).trim()
            if (!code) return false

            selected.sendCode(code)
            await ConsoleAuthUI.waitWithCancel(AuthDefaults.CODE_VALIDATION_DELAY_MS, cancel)
            return true
        } catch (e) {
            logger.error('2FA error:', extractErrorMessage(e))
            return false
        } finally {
            rl.close()
        }
    }

    public async getPassword(isAlternate: boolean): Promise<string> {
        const rl = getSdkPlatform().createReadline(
            typeof process !== 'undefined' ? process.stdin : undefined,
            typeof process !== 'undefined' ? process.stdout : undefined
        )
        try {
            const label = isAlternate ? 'alternate master password' : 'master password'
            return (await rl.question(`Enter your ${label}: `)).trim()
        } finally {
            rl.close()
        }
    }
}
