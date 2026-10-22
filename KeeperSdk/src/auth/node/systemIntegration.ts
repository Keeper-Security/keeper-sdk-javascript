/** CAUTION: Node-only helpers that call the operating system's browser launcher and clipboard tools. */

type ShellCommand = {
    command: string
    args: string[]
}

type ClipboardAction = 'copy' | 'paste'

function browserCommand(url: string): ShellCommand {
    if (process.platform === 'darwin') return { command: 'open', args: [url] }
    if (process.platform === 'win32') return { command: 'rundll32', args: ['url.dll,FileProtocolHandler', url] }
    return { command: 'xdg-open', args: [url] }
}

/** Clipboard tools to try, in order of preference, for the current platform. */
function clipboardCommands(action: ClipboardAction): ShellCommand[] {
    if (process.platform === 'darwin') {
        return [{ command: action === 'paste' ? 'pbpaste' : 'pbcopy', args: [] }]
    }
    if (process.platform === 'win32') {
        return [
            action === 'paste'
                ? { command: 'powershell', args: ['-NoProfile', '-Command', 'Get-Clipboard'] }
                : { command: 'clip', args: [] },
        ]
    }
    return action === 'paste'
        ? [
              { command: 'wl-paste', args: ['--no-newline'] },
              { command: 'xclip', args: ['-selection', 'clipboard', '-o'] },
              { command: 'xsel', args: ['--clipboard', '--output'] },
          ]
        : [
              { command: 'wl-copy', args: [] },
              { command: 'xclip', args: ['-selection', 'clipboard'] },
              { command: 'xsel', args: ['--clipboard', '--input'] },
          ]
}

/** Runs `shellCommand` with `input` on stdin and resolves its stdout when it exits successfully. */
async function runShellCommand({ command, args }: ShellCommand, input: string): Promise<string> {
    const { spawn } = await import('child_process')
    return new Promise<string>((resolve, reject) => {
        const child = spawn(command, args, { stdio: ['pipe', 'pipe', 'ignore'] })
        let output = ''
        child.stdout.on('data', (data: Buffer) => {
            output += data.toString('utf8')
        })
        child.stdin.on('error', () => undefined)
        child.once('error', reject)
        child.once('close', (code: number | null) =>
            code === 0 ? resolve(output) : reject(new Error(`${command} exited with code ${code}`))
        )
        child.stdin.end(input)
    })
}

/** Runs the first available clipboard tool for `action`. */
async function runClipboardCommand(action: ClipboardAction, input: string): Promise<string> {
    let lastError: unknown
    for (const shellCommand of clipboardCommands(action)) {
        try {
            return await runShellCommand(shellCommand, input)
        } catch (e) {
            lastError = e
        }
    }
    throw lastError
}

export async function openUrlInBrowser(url: string): Promise<void> {
    const { spawn } = await import('child_process')
    const { command, args } = browserCommand(url)
    await new Promise<void>((resolve, reject) => {
        const child = spawn(command, args, { detached: true, stdio: 'ignore' })
        child.once('error', reject)
        child.once('spawn', () => {
            child.unref()
            resolve()
        })
    })
}

export async function copyToClipboard(text: string): Promise<void> {
    await runClipboardCommand('copy', text)
}

export async function readClipboard(): Promise<string> {
    return runClipboardCommand('paste', '')
}
