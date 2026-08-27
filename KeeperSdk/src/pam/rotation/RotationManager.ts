import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../../utils'
import { formatRotationInfoJson, formatRotationInfoOutput, getRotationInfo } from './getRotationInfo'
import {
    formatRotationSchedulesJson,
    formatRotationSchedulesOutput,
    formatRotationSchedulesTable,
    listRotationSchedules,
    renderRotationSchedulesAsciiTable,
} from './listRotations'
import { editRotation, validateRotationInput } from './editRotation'
import {
    listRotationScripts,
    formatRotationScriptsTable,
    formatRotationScriptsJson,
} from './listRotationScripts'
import { addRotationScript } from './addRotationScript'
import { editRotationScript } from './editRotationScript'
import { deleteRotationScript } from './deleteRotationScript'
import type {
    FormatRotationSchedulesTableOptions,
    FormattedRotationSchedulesTable,
    GetRotationInfoInput,
    ListRotationSchedulesOptions,
    ListRotationSchedulesResult,
    RenderRotationSchedulesAsciiTableOptions,
    RotationInfoResult,
    EditRotationInput,
    EditRotationResult,
} from './rotationTypes'
import type {
    ListRotationScriptsOptions,
    ListRotationScriptsResult,
    AddRotationScriptInput,
    AddRotationScriptResult,
    EditRotationScriptInput,
    EditRotationScriptResult,
    DeleteRotationScriptInput,
    DeleteRotationScriptResult,
} from './rotationScriptTypes'

export type AuthProvider = () => Auth

export class RotationManager {
    private readonly storage: InMemoryStorage
    private readonly authProvider: AuthProvider

    constructor(storage: InMemoryStorage, authProvider: AuthProvider) {
        this.storage = storage
        this.authProvider = authProvider
    }

    private requireAuth(): Auth {
        const auth = this.authProvider()
        if (!auth?.sessionToken) {
            throw new KeeperSdkError('Not logged in. Call login() first.', ResultCodes.NOT_LOGGED_IN)
        }
        return auth
    }

    public async listRotationSchedules(options: ListRotationSchedulesOptions = {}): Promise<ListRotationSchedulesResult> {
        return listRotationSchedules(this.requireAuth(), this.storage, options)
    }

    public formatRotationSchedulesTable(
        result: ListRotationSchedulesResult,
        options: FormatRotationSchedulesTableOptions = {}
    ): FormattedRotationSchedulesTable {
        return formatRotationSchedulesTable(result, options)
    }

    public renderRotationSchedulesAsciiTable(
        table: FormattedRotationSchedulesTable,
        options: RenderRotationSchedulesAsciiTableOptions = {}
    ): string {
        return renderRotationSchedulesAsciiTable(table, options)
    }

    public formatRotationSchedulesJson(
        result: ListRotationSchedulesResult,
        options: ListRotationSchedulesOptions = {}
    ): string {
        return formatRotationSchedulesJson(result, options)
    }

    public formatRotationSchedulesOutput(
        result: ListRotationSchedulesResult,
        options: ListRotationSchedulesOptions = {}
    ): string {
        return formatRotationSchedulesOutput(result, options)
    }

    public async getRotationInfo(input: GetRotationInfoInput): Promise<RotationInfoResult> {
        return getRotationInfo(this.requireAuth(), this.storage, input)
    }

    public formatRotationInfoJson(result: RotationInfoResult): string {
        return formatRotationInfoJson(result)
    }

    public formatRotationInfoOutput(
        result: RotationInfoResult,
        options: Pick<GetRotationInfoInput, 'format'> = {}
    ): string {
        return formatRotationInfoOutput(result, options)
    }

    public async editRotation(input: EditRotationInput): Promise<EditRotationResult> {
        const errors = validateRotationInput(input)
        if (errors.length > 0) {
            throw new KeeperSdkError(
                `Invalid rotation input: ${errors.join('; ')}`,
                ResultCodes.PAM_ROTATION_RECORD_REQUIRED
            )
        }
        return editRotation(this.requireAuth(), this.storage, input)
    }

    /* ========== Rotation Script Operations ========== */

    public async listRotationScripts(
        options: ListRotationScriptsOptions = {}
    ): Promise<ListRotationScriptsResult> {
        return listRotationScripts(this.requireAuth(), this.storage, options)
    }

    public formatRotationScriptsTable(result: ListRotationScriptsResult): string[][] {
        return formatRotationScriptsTable(result)
    }

    public formatRotationScriptsJson(result: ListRotationScriptsResult): string {
        return formatRotationScriptsJson(result)
    }

    public async addRotationScript(
        input: AddRotationScriptInput
    ): Promise<AddRotationScriptResult> {
        return addRotationScript(this.requireAuth(), this.storage, input)
    }

    public async editRotationScript(
        input: EditRotationScriptInput
    ): Promise<EditRotationScriptResult> {
        return editRotationScript(this.requireAuth(), this.storage, input)
    }

    public async deleteRotationScript(
        input: DeleteRotationScriptInput
    ): Promise<DeleteRotationScriptResult> {
        return deleteRotationScript(this.requireAuth(), this.storage, input)
    }
}
