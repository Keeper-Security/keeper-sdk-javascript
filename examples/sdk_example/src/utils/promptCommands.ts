import { logger, prompt } from '@keeper-security/keeper-sdk-javascript'

export const YES_NO_PROMPT_SUFFIX = '[y/n]: '

const YES_ANSWERS = new Set(['y', 'yes'])
const NO_ANSWERS = new Set(['n', 'no'])

export function yesNoPrompt(label: string): string {
    return `${label} ${YES_NO_PROMPT_SUFFIX}`
}

export function isYes(answer: string): boolean {
    const normalized = answer.trim().toLowerCase()
    return YES_ANSWERS.has(normalized)
}

function parseYesNo(answer: string): boolean | null | undefined {
    const normalized = answer.trim().toLowerCase()
    if (normalized === '') return undefined
    if (YES_ANSWERS.has(normalized)) return true
    if (NO_ANSWERS.has(normalized)) return false
    return null
}

export async function promptYesNo(question: string, defaultValue = false): Promise<boolean> {
    while (true) {
        const answer = await prompt(question)
        const parsed = parseYesNo(answer)
        if (parsed === null) {
            logger.warn('Invalid input. Enter y, yes, n, or no.')
            continue
        }
        if (parsed === undefined) return defaultValue
        return parsed
    }
}

export async function promptChoice<T extends string>(
    question: string,
    choices: Readonly<Record<string, T>>,
    defaultKey = ''
): Promise<T> {
    while (true) {
        const raw = await prompt(question)
        const key = raw.trim().toLowerCase()
        const lookupKey = key === '' ? defaultKey : key
        if (lookupKey in choices) {
            return choices[lookupKey]
        }

        const validKeys = [...new Set(Object.keys(choices).filter((k) => k !== ''))].join(', ')
        const defaultHint = defaultKey in choices ? ` (default: ${defaultKey || 'Enter'})` : ''
        logger.warn(`Invalid input "${raw.trim()}". Valid choices: ${validKeys}${defaultHint}.`)
    }
}

export async function promptRequired(question: string, message = 'Value is required.'): Promise<string> {
    while (true) {
        const answer = (await prompt(question)).trim()
        if (answer) return answer
        logger.warn(message)
    }
}

export async function promptOptional(question: string): Promise<string> {
    return (await prompt(question)).trim()
}

export async function promptRequiredList(
    question: string,
    parse: (input: string) => string[],
    message = 'At least one value is required.'
): Promise<string[]> {
    while (true) {
        const items = parse((await prompt(question)).trim())
        if (items.length > 0) return items
        logger.warn(message)
    }
}
