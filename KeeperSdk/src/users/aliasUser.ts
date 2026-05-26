import { Authentication, type Auth } from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, logger, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseUser,
    type EnterpriseUserAliasLink,
} from '../teams/enterpriseData'
import {
    resolveExistingUsers,
    AliasOperation,
    type AliasUserInput,
    type AliasUserResult,
} from './userTypes'

export { AliasOperation }
export type { AliasUserInput, AliasUserResult }

const ADD_ALIAS_PATH = 'enterprise/enterprise_user_add_alias'
const SET_PRIMARY_ALIAS_PATH = 'enterprise/enterprise_user_set_primary_alias'
const DELETE_ALIAS_PATH = 'enterprise/enterprise_user_delete_alias'

const ALIAS_USER_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Users,
    EnterpriseDataInclude.UserAliases,
]

export async function aliasUser(auth: Auth, input: AliasUserInput): Promise<AliasUserResult> {
    const alias = input.alias.trim().toLowerCase()

    if (!alias) {
        throw new KeeperSdkError('Alias is required.', ResultCodes.USER_ALIAS_FAILED)
    }

    const identifier = input.email.trim()
    if (!identifier) {
        throw new KeeperSdkError('User email or ID is required.', ResultCodes.USER_NOT_FOUND)
    }

    const enterpriseData = new EnterpriseDataManager(auth)
    const response = await enterpriseData.getData(ALIAS_USER_INCLUDES)

    const [user] = resolveExistingUsers(response.users || [], [identifier])
    const existingAliases = (response.user_aliases || []).filter(
        (a) => a.enterprise_user_id === user.enterprise_user_id
    )

    if (input.operation === AliasOperation.Add) {
        return addAlias(auth, user, existingAliases, alias)
    }
    return removeAlias(auth, user, existingAliases, alias)
}

async function addAlias(
    auth: Auth,
    user: EnterpriseUser,
    existingAliases: EnterpriseUserAliasLink[],
    alias: string
): Promise<AliasUserResult> {
    const base = { username: user.username, enterpriseUserId: user.enterprise_user_id, alias, operation: AliasOperation.Add }

    if (user.username === alias) {
        logger.info(`Alias "${alias}" is already the primary email for this user.`)
        return { ...base, success: true, detail: 'Alias is already the primary email.' }
    }

    const alreadyExists = existingAliases.some((a) => a.username === alias)

    try {
        if (alreadyExists) {
            await sendSetPrimaryAlias(auth, user.enterprise_user_id, alias)
            return { ...base, success: true, detail: 'Alias promoted to primary.' }
        }

        await sendAddAlias(auth, user.enterprise_user_id, alias)
        return { ...base, success: true, detail: 'Alias added.' }
    } catch (err) {
        throw new KeeperSdkError(extractErrorMessage(err), ResultCodes.USER_ALIAS_FAILED)
    }
}

async function removeAlias(
    auth: Auth,
    user: EnterpriseUser,
    existingAliases: EnterpriseUserAliasLink[],
    alias: string
): Promise<AliasUserResult> {
    const base = { username: user.username, enterpriseUserId: user.enterprise_user_id, alias, operation: AliasOperation.Remove }

    const exists = alias === user.username || existingAliases.some((a) => a.username === alias)

    if (!exists) {
        logger.info(`Alias "${alias}" does not exist for user.`)
        return { ...base, success: false, detail: 'Alias does not exist.' }
    }
    try {
        await sendDeleteAlias(auth, user.enterprise_user_id, alias)
        return { ...base, success: true, detail: 'Alias removed.' }
    } catch (err) {
        throw new KeeperSdkError(extractErrorMessage(err), ResultCodes.USER_ALIAS_FAILED)
    }
}

async function sendAddAlias(auth: Auth, enterpriseUserId: number, alias: string): Promise<void> {
    const request = Authentication.EnterpriseUserAddAliasRequest.create({
        enterpriseUserId,
        alias,
        primary: true,
    })
    const message = {
        path: ADD_ALIAS_PATH,
        toBytes(): Uint8Array {
            return Authentication.EnterpriseUserAddAliasRequest.encode(request).finish()
        },
        fromBytes(data: Uint8Array): Authentication.IEnterpriseUserAddAliasResponse {
            return Authentication.EnterpriseUserAddAliasResponse.decode(data)
        },
    }
    const response = await auth.executeRest(message)
    for (const status of response.status || []) {
        if (status.status && status.status !== 'success') {
            throw new KeeperSdkError(`Add alias failed: ${status.status}`, ResultCodes.USER_ALIAS_FAILED)
        }
    }
}

async function sendSetPrimaryAlias(auth: Auth, enterpriseUserId: number, alias: string): Promise<void> {
    const request = Authentication.EnterpriseUserAliasRequest.create({ enterpriseUserId, alias })
    const message = {
        path: SET_PRIMARY_ALIAS_PATH,
        toBytes(): Uint8Array {
            return Authentication.EnterpriseUserAliasRequest.encode(request).finish()
        },
        fromBytes(data: Uint8Array): Record<string, never> {
            return {}
        },
    }
    await auth.executeRest(message)
}

async function sendDeleteAlias(auth: Auth, enterpriseUserId: number, alias: string): Promise<void> {
    const request = Authentication.EnterpriseUserAliasRequest.create({ enterpriseUserId, alias })
    const message = {
        path: DELETE_ALIAS_PATH,
        toBytes(): Uint8Array {
            return Authentication.EnterpriseUserAliasRequest.encode(request).finish()
        },
        fromBytes(data: Uint8Array): Record<string, never> {
            return {}
        },
    }
    await auth.executeRest(message)
}
