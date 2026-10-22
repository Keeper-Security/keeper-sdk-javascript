import type {
    AuthUI3,
    DeviceApprovalChannel,
    TwoFactorChannelData,
    WebAuthnAssertionProvider,
} from '@keeper-security/keeperapi'
import { Authentication } from '@keeper-security/keeperapi'
import { getSdkPlatform } from '../platform'
import type { SdkReadline } from '../platform'
import { logger, extractErrorMessage, extractResultCode, KeeperSdkError, AuthDefaults, ResultCodes } from '../utils'
import { copyToClipboard, openUrlInBrowser, readClipboard } from './node/systemIntegration'

/** A 2FA code duration offered at the "Enter 2FA Code or Duration" prompt. */
type TwoFactorDurationOption = {
    code: string
    description: string
    expiration: Authentication.TwoFactorExpiration
}

/** How the 2FA code prompt ended: code accepted, step completed elsewhere (push), or user went back to the menu. */
type TwoFactorCodeOutcome = 'verified' | 'completedElsewhere' | 'backToMenu'

type TwoFactorCodePromptResult = {
    outcome: TwoFactorCodeOutcome
    duration: TwoFactorDurationOption
}

/** Asks a question; resolves `undefined` when the 2FA step completes elsewhere (e.g. approved by push). */
type CancellableQuestion = (query: string) => Promise<string | undefined>

const TWO_FACTOR_DURATION_COMMAND = '2fa_duration='
const SSO_TOKEN_MIN_LENGTH = 10

export class ConsoleAuthUI implements AuthUI3 {
    /** Cloud SSO shows a "Copy authentication token" button instead of redirecting back to a browser client. */
    public readonly detachedSsoLogin = true

    private static readonly DEVICE_VERIFICATION = {
        Email: 0,
        KeeperPush: 1,
        TFA: 2,
        AdminApproval: 3,
    } as const

    /** 2FA code durations offered by Commander, ordered from shortest to longest. */
    private static readonly TWO_FACTOR_DURATIONS: ReadonlyArray<TwoFactorDurationOption> = [
        {
            code: 'login',
            description: 'Require Every Login',
            expiration: Authentication.TwoFactorExpiration.TWO_FA_EXP_IMMEDIATELY,
        },
        {
            code: '12_hours',
            description: 'Ask Every 12 hours',
            expiration: Authentication.TwoFactorExpiration.TWO_FA_EXP_12_HOURS,
        },
        {
            code: '24_hours',
            description: 'Ask Every 24 hours',
            expiration: Authentication.TwoFactorExpiration.TWO_FA_EXP_24_HOURS,
        },
        {
            code: '30_days',
            description: 'Ask Every 30 days',
            expiration: Authentication.TwoFactorExpiration.TWO_FA_EXP_30_DAYS,
        },
        {
            code: 'forever',
            description: 'Save on this Device Forever',
            expiration: Authentication.TwoFactorExpiration.TWO_FA_EXP_NEVER,
        },
    ]

    constructor(private readonly webAuthnAssertionProvider?: WebAuthnAssertionProvider) {}

    private static createConsoleReadline(): SdkReadline {
        return getSdkPlatform().createReadline(
            typeof process !== 'undefined' ? process.stdin : undefined,
            typeof process !== 'undefined' ? process.stdout : undefined
        )
    }

    private static deviceApprovalChannelName(channel: number): string {
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

    private static twoFactorChannelName(channelType: Authentication.TwoFactorChannelType | null | undefined): string {
        switch (channelType) {
            case Authentication.TwoFactorChannelType.TWO_FA_CT_TOTP:
                return 'TOTP (Google and Microsoft Authenticator)'
            case Authentication.TwoFactorChannelType.TWO_FA_CT_SMS:
                return 'Send SMS Code'
            case Authentication.TwoFactorChannelType.TWO_FA_CT_DUO:
                return 'DUO'
            case Authentication.TwoFactorChannelType.TWO_FA_CT_RSA:
                return 'RSA SecurID'
            case Authentication.TwoFactorChannelType.TWO_FA_CT_BACKUP:
                return 'Backup Code'
            case Authentication.TwoFactorChannelType.TWO_FA_CT_DNA:
                return 'Keeper DNA (Watch)'
            case Authentication.TwoFactorChannelType.TWO_FA_CT_U2F:
                return 'U2F Security Key'
            case Authentication.TwoFactorChannelType.TWO_FA_CT_WEBAUTHN:
                return 'WebAuthN (FIDO2 Security Key)'
            case Authentication.TwoFactorChannelType.TWO_FA_CT_KEEPER:
                return 'Keeper'
            default:
                throw new KeeperSdkError(
                    `Unsupported 2FA channel type: ${channelType}`,
                    ResultCodes.UNSUPPORTED_2FA_CHANNEL
                )
        }
    }

    private static isSecurityKeyChannel(channel: TwoFactorChannelData): boolean {
        return (
            channel.channel.channelType === Authentication.TwoFactorChannelType.TWO_FA_CT_U2F ||
            channel.channel.channelType === Authentication.TwoFactorChannelType.TWO_FA_CT_WEBAUTHN
        )
    }

    private static async waitWithCancel(timeoutMs: number, cancel?: Promise<void>): Promise<void> {
        const platform = getSdkPlatform()
        if (!cancel) {
            await platform.delay(timeoutMs)
            return
        }
        await Promise.race([platform.delay(timeoutMs), cancel])
    }

    private static async questionUnlessCancelled(
        rl: SdkReadline,
        query: string,
        cancel: Promise<void>
    ): Promise<string | undefined> {
        const answer: Promise<string> = rl.question(query)
        answer.catch(() => undefined)
        const result: string | undefined = await Promise.race([answer, cancel.then(() => undefined)])
        return result === undefined ? undefined : result.trim()
    }

    public async waitForDeviceApproval(channels: DeviceApprovalChannel[], _isCloud: boolean): Promise<boolean> {
        const rl = ConsoleAuthUI.createConsoleReadline()

        try {
            logger.info('\n--- Device Approval Required ---')
            logger.info('This device needs to be approved before you can log in.')
            logger.info('Available verification methods:')
            channels.forEach((ch, i) => {
                logger.info(`  ${i + 1}. ${ConsoleAuthUI.deviceApprovalChannelName(ch.channel)}`)
            })

            const choice = (await rl.question('\nSelect method (number): ')).trim()
            const idx = parseInt(choice, 10) - 1

            if (isNaN(idx) || idx < 0 || idx >= channels.length) {
                logger.warn('Invalid selection, cancelling.')
                return false
            }

            const selected = channels[idx]
            logger.info(`\nSending ${ConsoleAuthUI.deviceApprovalChannelName(selected.channel)} request...`)
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
        let rl: SdkReadline = ConsoleAuthUI.createConsoleReadline()
        const ask: CancellableQuestion = (query) => ConsoleAuthUI.questionUnlessCancelled(rl, query, cancel)
        let duration: TwoFactorDurationOption = ConsoleAuthUI.TWO_FACTOR_DURATIONS[0]

        try {
            for (;;) {
                ConsoleAuthUI.printTwoFactorMenu(channels)

                for (;;) {
                    const selection = await ask('Selection: ')
                    if (selection === undefined) return true
                    if (selection === 'q' || selection === 'Q') return false

                    const index = ConsoleAuthUI.parseMenuIndex(selection, channels.length)
                    if (index === undefined) {
                        logger.info(
                            'Invalid entry, additional factors of authentication shown may be configured if not currently enabled.'
                        )
                        continue
                    }
                    const selected = channels[index]
                    const name = ConsoleAuthUI.twoFactorChannelName(selected.channel.channelType)
                    logger.info(`Selected ${index + 1}. ${name}`)

                    if (ConsoleAuthUI.isSecurityKeyChannel(selected)) {
                        // Release stdin so the assertion provider can prompt for the security key PIN.
                        rl.close()
                        if (await ConsoleAuthUI.verifySecurityKey(selected)) return true
                        rl = ConsoleAuthUI.createConsoleReadline()
                        continue
                    }

                    if (await ConsoleAuthUI.sendTwoFactorPush(selected, name, ask, cancel)) return true

                    const result = await ConsoleAuthUI.promptTwoFactorCode(selected, duration, ask)
                    duration = result.duration
                    if (result.outcome !== 'backToMenu') return true
                    break
                }
            }
        } finally {
            rl.close()
        }
    }

    private static printTwoFactorMenu(channels: TwoFactorChannelData[]): void {
        logger.info('\nThis account requires 2FA Authentication')
        channels.forEach((ch, i) => {
            const name = ConsoleAuthUI.twoFactorChannelName(ch.channel.channelType)
            logger.info(`  ${i + 1}. ${name} ${ch.channel.channelName ?? ''} ${ch.channel.phoneNumber ?? ''}`)
        })
        logger.info('  q. Quit authentication attempt and return to Commander prompt.')
    }

    /** Returns the zero-based index for a numeric menu selection, or `undefined` when it is out of range. */
    private static parseMenuIndex(selection: string, itemCount: number): number | undefined {
        if (!/^\d+$/.test(selection)) return undefined
        const index = parseInt(selection, 10) - 1
        return index >= 0 && index < itemCount ? index : undefined
    }

    private static async verifySecurityKey(selected: TwoFactorChannelData): Promise<boolean> {
        try {
            await selected.sendSecurityKeyAssertion?.()
            logger.info('Verified Security Key.')
            return true
        } catch (e) {
            logger.error(extractErrorMessage(e))
            return false
        }
    }

    /** Sends the channel's push notification. Returns `true` when the 2FA step finished without a code. */
    private static async sendTwoFactorPush(
        selected: TwoFactorChannelData,
        name: string,
        ask: CancellableQuestion,
        cancel: Promise<void>
    ): Promise<boolean> {
        const pushes: Authentication.TwoFactorPushType[] = selected.availablePushes ?? []

        // Text message and Keeper DNA deliver the code by push; it is then entered at the code prompt.
        const codePush = pushes.find(
            (push) =>
                push === Authentication.TwoFactorPushType.TWO_FA_PUSH_SMS ||
                push === Authentication.TwoFactorPushType.TWO_FA_PUSH_DNA
        )
        if (codePush !== undefined) {
            selected.sendPush?.(codePush)
            return false
        }
        if (pushes.length === 0 || !selected.sendPush) return false

        const answer = await ask(`Send push notification for ${name}? (y/n): `)
        if (answer === undefined) return true
        if (answer.toLowerCase() !== 'y') return false

        selected.sendPush(pushes[0])
        logger.info('Push sent. Waiting for approval...')
        await ConsoleAuthUI.waitWithCancel(AuthDefaults.APPROVAL_TIMEOUT_MS, cancel)
        return true
    }

    /** Durations the channel allows: "login" always, plus every duration up to the channel's maximum. */
    private static availableTwoFactorDurations(
        maxExpiration: Authentication.TwoFactorExpiration | null | undefined
    ): TwoFactorDurationOption[] {
        const max = maxExpiration ?? Authentication.TwoFactorExpiration.TWO_FA_EXP_IMMEDIATELY
        return ConsoleAuthUI.TWO_FACTOR_DURATIONS.filter((d, i) => i === 0 || d.expiration <= max)
    }

    private static async promptTwoFactorCode(
        selected: TwoFactorChannelData,
        initialDuration: TwoFactorDurationOption,
        ask: CancellableQuestion
    ): Promise<TwoFactorCodePromptResult> {
        const available = ConsoleAuthUI.availableTwoFactorDurations(selected.channel.maxExpiration)
        let duration = available.includes(initialDuration) ? initialDuration : available[available.length - 1]
        const codes = available.map((d) => d.code).join('|')

        for (;;) {
            logger.info(
                `\n2FA Code Duration: ${duration.description}.\nTo change duration: ${TWO_FACTOR_DURATION_COMMAND}${codes}`
            )
            const entry = await ask('\nEnter 2FA Code or Duration: ')
            if (entry === undefined) return { outcome: 'completedElsewhere', duration }
            if (!entry) return { outcome: 'backToMenu', duration }

            const isDurationCommand = entry.startsWith(TWO_FACTOR_DURATION_COMMAND)
            const durationCode = isDurationCommand ? entry.slice(TWO_FACTOR_DURATION_COMMAND.length) : entry
            const newDuration = available.find((d) => d.code === durationCode)
            if (newDuration) {
                duration = newDuration
                continue
            }
            if (isDurationCommand) {
                logger.info(`Invalid 2FA duration: ${durationCode}`)
                continue
            }

            try {
                selected.setExpiration(duration.expiration)
                await selected.sendCode(entry)
                logger.info('Successfully verified 2FA Code.')
                return { outcome: 'verified', duration }
            } catch (e) {
                logger.info(`Invalid 2FA code: (${extractResultCode(e) ?? 'error'}) ${extractErrorMessage(e)}`)
            }
        }
    }

    public async getPassword(isAlternate: boolean): Promise<string> {
        const rl = ConsoleAuthUI.createConsoleReadline()
        try {
            const label = isAlternate ? 'alternate master password' : 'master password'
            return (await rl.question(`Enter your ${label}: `)).trim()
        } finally {
            rl.close()
        }
    }

    public async getWebAuthnAssertion(requestOptions: string): Promise<string> {
        if (!this.webAuthnAssertionProvider) {
            throw new KeeperSdkError(
                'WebAuthn assertion provider is not configured',
                ResultCodes.UNSUPPORTED_2FA_CHANNEL
            )
        }
        return this.webAuthnAssertionProvider(requestOptions)
    }

    /** Returns the Cloud SSO token (string) or the On-Premises SSO response (JSON object). */
    public async ssoLogin(url: string): Promise<unknown> {
        const rl = ConsoleAuthUI.createConsoleReadline()

        try {
            ConsoleAuthUI.printSsoMenu()

            for (;;) {
                const selection = (await rl.question('Selection: ')).trim()
                let token: string | undefined = selection
                switch (selection) {
                    case 'q':
                        throw new KeeperSdkError('SSO login cancelled.', ResultCodes.USER_CANCELLED)
                    case 'a':
                        throw new KeeperSdkError(
                            'SSO user requested Master Password login.',
                            ResultCodes.SSO_MASTER_PASSWORD_LOGIN
                        )
                    case 'c':
                        await ConsoleAuthUI.copySsoLoginUrl(url)
                        continue
                    case 'o':
                        await openUrlInBrowser(url).catch((e) =>
                            logger.warn('Failed to open web browser:', extractErrorMessage(e))
                        )
                        continue
                    case 'p':
                        token = await ConsoleAuthUI.pasteSsoToken()
                        break
                    default:
                        if (selection.length < SSO_TOKEN_MIN_LENGTH) {
                            logger.warn(`Unsupported menu option: ${selection}`)
                            continue
                        }
                }
                if (!token) continue

                const response = ConsoleAuthUI.parseSsoResponse(token)
                if (response !== undefined) return response
            }
        } finally {
            rl.close()
        }
    }

    private static printSsoMenu(): void {
        logger.info('\n--- SSO Authentication Required ---')
        logger.info('Navigate to SSO Login URL with your browser and complete authentication.')
        logger.info('Copy a returned SSO Token into clipboard. Paste that token into Commander.')
        logger.info('NOTE: To copy SSO Token please click "Copy authentication token" button on "SSO Connect" page.\n')
        logger.info('  a. SSO User with a Master Password.')
        logger.info('  c. Copy SSO Login URL to clipboard.')
        logger.info('  o. Navigate to SSO Login URL with the default web browser.')
        logger.info('  p. Paste SSO Token from clipboard.')
        logger.info('  q. Quit SSO authentication attempt and return to Commander prompt.')
    }

    private static async copySsoLoginUrl(url: string): Promise<void> {
        try {
            await copyToClipboard(url)
            logger.info('SSO Login URL is copied to clipboard.')
        } catch {
            logger.warn('Failed to copy SSO Login URL to clipboard.')
        }
    }

    /** Returns the trimmed clipboard contents, or `undefined` when the clipboard cannot be read. */
    private static async pasteSsoToken(): Promise<string | undefined> {
        try {
            return (await readClipboard()).trim()
        } catch {
            logger.warn('Failed to paste from clipboard')
            return undefined
        }
    }

    /** Cloud SSO tokens are returned as-is; On-Premises responses are JSON. Returns `undefined` for invalid JSON. */
    private static parseSsoResponse(token: string): unknown {
        if (!token.startsWith('{')) return token
        try {
            const response: unknown = JSON.parse(token)
            return response
        } catch {
            logger.warn('Invalid SSO Token. Paste the complete token returned by SSO Connect.')
            return undefined
        }
    }
}
