import type { Auth } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'
import {
    formatNodesTable,
    listNodes,
    renderNodesAsciiTable,
    type FormatNodesTableOptions,
    type FormattedNodesTable,
    type ListNodeRow,
    type ListNodesOptions,
} from './listNodes'
import {
    formatNodeView,
    nodeViewTable,
    viewNode,
    type FormatNodeViewOptions,
    type FormattedNodeViewTable,
    type NodeView,
} from './viewNode'
import {
    addNodes,
    formatAddNodeResult,
    renderAddNodeAsciiTable,
    type AddNodeInput,
    type AddNodeResult,
    type FormattedAddNodeTable,
} from './addNode'
import {
    formatUpdateNodeResult,
    renderUpdateNodeAsciiTable,
    updateNodes,
    type FormattedUpdateNodeTable,
    type UpdateNodeInput,
    type UpdateNodeResult,
} from './updateNode'
import {
    deleteNodes,
    formatDeleteNodeResult,
    renderDeleteNodeAsciiTable,
    type DeleteNodeInput,
    type DeleteNodeResult,
    type FormattedDeleteNodeTable,
} from './deleteNode'

export type AuthProvider = () => Auth

export class NodeManager {
    private readonly authProvider: AuthProvider

    constructor(authProvider: AuthProvider) {
        this.authProvider = authProvider
    }

    public async listNodes(options: ListNodesOptions = {}): Promise<ListNodeRow[]> {
        return listNodes(this.requireAuth(), options)
    }

    public formatNodesTable(rows: ListNodeRow[], options: FormatNodesTableOptions = {}): FormattedNodesTable {
        return formatNodesTable(rows, options)
    }

    public renderNodesAsciiTable(table: FormattedNodesTable, options: { minColWidth?: number } = {}): string {
        return renderNodesAsciiTable(table, options)
    }

    public async viewNode(identifier: string): Promise<NodeView> {
        return viewNode(this.requireAuth(), identifier)
    }

    public formatNodeView(view: NodeView, options: FormatNodeViewOptions = {}): FormattedNodeViewTable {
        return formatNodeView(view, options)
    }

    public nodeViewTable(table: FormattedNodeViewTable): string {
        return nodeViewTable(table)
    }

    public async addNodes(input: AddNodeInput): Promise<AddNodeResult> {
        return addNodes(this.requireAuth(), input)
    }

    public formatAddNodeResult(result: AddNodeResult): FormattedAddNodeTable {
        return formatAddNodeResult(result)
    }

    public renderAddNodeAsciiTable(table: FormattedAddNodeTable): string {
        return renderAddNodeAsciiTable(table)
    }

    public async updateNodes(input: UpdateNodeInput): Promise<UpdateNodeResult> {
        return updateNodes(this.requireAuth(), input)
    }

    public formatUpdateNodeResult(result: UpdateNodeResult): FormattedUpdateNodeTable {
        return formatUpdateNodeResult(result)
    }

    public renderUpdateNodeAsciiTable(table: FormattedUpdateNodeTable): string {
        return renderUpdateNodeAsciiTable(table)
    }

    public async deleteNodes(input: DeleteNodeInput): Promise<DeleteNodeResult> {
        return deleteNodes(this.requireAuth(), input)
    }

    public formatDeleteNodeResult(result: DeleteNodeResult): FormattedDeleteNodeTable {
        return formatDeleteNodeResult(result)
    }

    public renderDeleteNodeAsciiTable(table: FormattedDeleteNodeTable): string {
        return renderDeleteNodeAsciiTable(table)
    }

    private requireAuth(): Auth {
        const auth = this.authProvider()
        if (!auth) {
            throw new KeeperSdkError('You are not logged in. Please log in first.', ResultCodes.NOT_LOGGED_IN)
        }
        return auth
    }
}
