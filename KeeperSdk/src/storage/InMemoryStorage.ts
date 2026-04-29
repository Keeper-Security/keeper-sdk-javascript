import type {
    VaultStorage,
    VaultStorageData,
    VaultStorageKind,
    VaultStorageResult,
    Dependency,
    Dependencies,
    RemovedDependencies,
    DRecord,
} from '@keeper-security/keeperapi'
import { webSafe64FromBytes } from '@keeper-security/keeperapi'

export class InMemoryStorage implements VaultStorage {
    private keys = new Map<string, Uint8Array>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- KeyStorage.saveObject<T> is unconstrained
    private objects = new Map<string, any>()
    private store = new Map<string, Map<string, VaultStorageData>>()
    private deps = new Map<string, Dependency[]>()
    private arrayCache = new Map<string, VaultStorageData[]>()

    public async getKeyBytes(keyId: string): Promise<Uint8Array | undefined> {
        return this.keys.get(keyId)
    }

    public async saveKeyBytes(keyId: string, key: Uint8Array): Promise<void> {
        this.keys.set(keyId, key)
    }

    public async getObject<T>(key: string): Promise<T | undefined> {
        return this.objects.get(key) as T | undefined
    }

    public async saveObject<T>(key: string, value: T): Promise<void> {
        this.objects.set(key, value)
    }

    public async put(item: VaultStorageData): Promise<void> {
        const kind = item.kind
        if (!this.store.has(kind)) {
            this.store.set(kind, new Map())
        }
        const uid = this.extractUid(item)
        this.store.get(kind)!.set(uid, item)
        this.arrayCache.delete(kind)
    }

    public async get<T extends VaultStorageKind>(kind: T, uid?: string): Promise<VaultStorageResult<T>> {
        const kindMap = this.store.get(kind)
        if (!kindMap) return undefined as VaultStorageResult<T>

        if (uid) {
            return kindMap.get(uid) as VaultStorageResult<T>
        }
        const first = kindMap.values().next()
        return (first.done ? undefined : first.value) as VaultStorageResult<T>
    }

    public async delete(kind: VaultStorageKind, uid: string | Uint8Array): Promise<void> {
        const uidStr = typeof uid === 'string' ? uid : webSafe64FromBytes(uid)
        this.store.get(kind)?.delete(uidStr)
        this.arrayCache.delete(kind)
    }

    public async clear(): Promise<void> {
        this.store.clear()
        this.keys.clear()
        this.objects.clear()
        this.deps.clear()
        this.arrayCache.clear()
    }

    public async getDependencies(uid: string): Promise<Dependency[] | undefined> {
        return this.deps.get(uid)
    }

    public async addDependencies(dependencies: Dependencies): Promise<void> {
        for (const [parentUid, children] of Object.entries(dependencies)) {
            if (!this.deps.has(parentUid)) {
                this.deps.set(parentUid, [])
            }
            const existing = this.deps.get(parentUid)!
            const seen = new Set(existing.map((d) => d.uid))
            for (const child of children) {
                if (!seen.has(child.uid)) {
                    existing.push(child)
                    seen.add(child.uid)
                }
            }
        }
    }

    public async removeDependencies(dependencies: RemovedDependencies): Promise<void> {
        for (const [parentUid, children] of Object.entries(dependencies)) {
            if (children === '*') {
                this.deps.delete(parentUid)
            } else {
                const existing = this.deps.get(parentUid)
                if (existing) {
                    const removeSet = children as Set<string>
                    this.deps.set(
                        parentUid,
                        existing.filter((d) => !removeSet.has(d.uid))
                    )
                }
            }
        }
    }

    public getAll<T extends VaultStorageData>(kind: VaultStorageKind): T[] {
        const cached = this.arrayCache.get(kind)
        if (cached) return cached as T[]

        const kindMap = this.store.get(kind)
        if (!kindMap) return []

        const arr = Array.from(kindMap.values())
        this.arrayCache.set(kind, arr)
        return arr as T[]
    }

    public getRecords(): DRecord[] {
        return this.getAll<DRecord>('record')
    }

    public getByUid<T extends VaultStorageData>(kind: VaultStorageKind, uid: string): T | undefined {
        return this.store.get(kind)?.get(uid) as T | undefined
    }

    public getCount(kind: VaultStorageKind): number {
        return this.store.get(kind)?.size ?? 0
    }

    private extractUid(item: VaultStorageData): string {
        const record = item as VaultStorageData & {
            uid?: string
            token?: string
            sharedFolderUid?: string
            recordUid?: string
            accountUid?: string | Uint8Array
            teamUid?: string
        }
        const accountUidStr =
            typeof record.accountUid === 'string'
                ? record.accountUid
                : record.accountUid instanceof Uint8Array
                  ? webSafe64FromBytes(record.accountUid)
                  : undefined
        if (record.uid) return record.uid
        if (record.token) return record.token
        if (record.sharedFolderUid && record.recordUid) {
            return `${record.sharedFolderUid}:${record.recordUid}`
        }
        if (record.sharedFolderUid && accountUidStr) {
            return `${record.sharedFolderUid}:${accountUidStr}`
        }
        if (record.sharedFolderUid && record.teamUid) {
            return `${record.sharedFolderUid}:${record.teamUid}`
        }
        if (item.kind === 'user' && accountUidStr) return accountUidStr
        return '_singleton_'
    }
}
