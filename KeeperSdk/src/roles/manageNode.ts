import {
  Enterprise,
  getPublicKeysMessage,
  platform,
  roleManagedNodeAddCommand,
  roleManagedNodeRemoveCommand,
  roleManagedNodeUpdateCommand,
  webSafe64FromBytes,
  type Auth,
  type Authentication,
  type RoleManagedNodeTreeKey,
} from "@keeper-security/keeperapi";
import { extractErrorMessage, KeeperSdkError, logger, ResultCodes } from "../utils";
import {
  EnterpriseDataInclude,
  EnterpriseDataManager,
  type EnterpriseNode,
  type EnterpriseRole,
  type EnterpriseRoleManagedNodeLink,
  type EnterpriseRoleUserLink,
  type EnterpriseUser,
} from "../teams/enterpriseData";
import {
  applyDecryptedNodeNames,
  applyEnterpriseNameToRoot,
  resolveParentNode,
} from "../teams/teamUtils";
import {
  applyDecryptedRoleNames,
  assertCommandSucceeded,
  nodePathOrFallback,
  normalizeIdentifiers,
  resolveExistingRoles,
  resolveToggle,
  type RoleToggleInput,
} from "./roleUtils";

const MANAGE_NODE_BASE_INCLUDES: EnterpriseDataInclude[] = [
  EnterpriseDataInclude.Nodes,
  EnterpriseDataInclude.Roles,
  EnterpriseDataInclude.ManagedNodes,
];

const MANAGE_NODE_TABLE_HEADERS = [
  "#",
  "Status",
  "Role Name",
  "Role ID",
  "Node Name",
  "Node ID",
  "Detail",
];

export type ManageRoleNodesAction = "add" | "update" | "remove";

export enum RoleManagedNodeStatus {
  Added = "added",
  Updated = "updated",
  Removed = "removed",
  Skipped = "skipped",
  Failed = "failed",
}

export type ManageRoleNodesInput = {
  roles: string[];
  nodes: string[];
  action: ManageRoleNodesAction;
  cascade?: RoleToggleInput;
};

export type RoleManagedNodeItemResult = {
  roleId: number;
  roleName: string;
  nodeId: number;
  nodeName: string;
  status: RoleManagedNodeStatus;
  message?: string;
};

export type ManageRoleNodesResult = {
  success: boolean;
  items: RoleManagedNodeItemResult[];
  succeeded: number;
  skipped: number;
  failed: number;
};

export type FormattedManageRoleNodesTable = {
  headers: string[];
  rows: string[][];
  summary: string;
};

type UserPublicKeys = {
  rsaPublicKey: Uint8Array | null;
  eccPublicKey: Uint8Array | null;
};

function findLink(
  links: EnterpriseRoleManagedNodeLink[],
  roleId: number,
  nodeId: number,
): EnterpriseRoleManagedNodeLink | undefined {
  return links.find(
    (link) => link.role_id === roleId && link.managed_node_id === nodeId,
  );
}

function roleDisplayName(role: EnterpriseRole): string {
  return (role.displayName || "").trim() || String(role.role_id);
}

async function fetchUserPublicKeys(
  auth: Auth,
  emails: string[],
): Promise<Map<string, UserPublicKeys>> {
  const result = new Map<string, UserPublicKeys>();
  if (emails.length === 0) return result;

  let response: Authentication.IGetPublicKeysResponse;
  try {
    response = await auth.executeRest(getPublicKeysMessage({ usernames: emails }));
  } catch (err) {
    logger.warn(`Failed to fetch public keys: ${extractErrorMessage(err)}`);
    return result;
  }

  for (const entry of response.keyResponses || []) {
    const username = (entry.username || "").toLowerCase();
    if (!username || entry.errorCode) continue;
    result.set(username, {
      rsaPublicKey: entry.publicKey && entry.publicKey.length > 0 ? entry.publicKey : null,
      eccPublicKey:
        entry.publicEccKey && entry.publicEccKey.length > 0 ? entry.publicEccKey : null,
    });
  }
  return result;
}

async function encryptTreeKeyForUser(
  treeKey: Uint8Array,
  publicKeys: UserPublicKeys,
  enterpriseUserId: number,
): Promise<RoleManagedNodeTreeKey | null> {
  if (publicKeys.rsaPublicKey) {
    const encrypted = platform.publicEncrypt(
      treeKey,
      platform.bytesToBase64(publicKeys.rsaPublicKey),
    );
    return {
      enterprise_user_id: enterpriseUserId,
      tree_key: webSafe64FromBytes(encrypted),
      tree_key_type: Enterprise.EncryptedKeyType.KT_ENCRYPTED_BY_PUBLIC_KEY,
    };
  }
  if (publicKeys.eccPublicKey) {
    const encrypted = await platform.publicEncryptEC(treeKey, publicKeys.eccPublicKey);
    return {
      enterprise_user_id: enterpriseUserId,
      tree_key: webSafe64FromBytes(encrypted),
      tree_key_type: Enterprise.EncryptedKeyType.KT_ENCRYPTED_BY_PUBLIC_KEY_ECC,
    };
  }
  return null;
}

async function buildTreeKeysForRole(
  auth: Auth,
  roleId: number,
  roleUserLinks: EnterpriseRoleUserLink[],
  usersById: Map<number, EnterpriseUser>,
  treeKey: Uint8Array,
): Promise<RoleManagedNodeTreeKey[]> {
  const memberIds = roleUserLinks
    .filter((link) => link.role_id === roleId)
    .map((link) => link.enterprise_user_id);
  if (memberIds.length === 0) return [];

  const emails = memberIds
    .map((id) => usersById.get(id)?.username)
    .filter((email): email is string => !!email);
  const publicKeyMap = await fetchUserPublicKeys(auth, emails);

  const treeKeys: RoleManagedNodeTreeKey[] = [];
  for (const userId of memberIds) {
    const user = usersById.get(userId);
    if (!user?.username) continue;
    const publicKeys = publicKeyMap.get(user.username.toLowerCase());
    if (!publicKeys) {
      logger.warn(
        `No public key available for "${user.username}"; role admin will not be able to decrypt the enterprise tree key for this node until they re-key.`,
      );
      continue;
    }
    const entry = await encryptTreeKeyForUser(treeKey, publicKeys, userId);
    if (entry) treeKeys.push(entry);
  }
  return treeKeys;
}

export async function manageRoleNodes(
  auth: Auth,
  input: ManageRoleNodesInput,
): Promise<ManageRoleNodesResult> {
  const roleIdentifiers = normalizeIdentifiers(input.roles);
  if (roleIdentifiers.length === 0) {
    throw new KeeperSdkError("No roles specified.", ResultCodes.ROLE_REQUIRED);
  }
  const nodeIdentifiers = normalizeIdentifiers(input.nodes);
  if (nodeIdentifiers.length === 0) {
    throw new KeeperSdkError(
      "No nodes specified.",
      ResultCodes.NO_NODES_FOR_ROLE_OP,
    );
  }

  const action = input.action;
  const cascade = resolveToggle(input.cascade);

  const includes = [...MANAGE_NODE_BASE_INCLUDES];
  if (action === "add") {
    includes.push(EnterpriseDataInclude.Users, EnterpriseDataInclude.RoleUsers);
  }

  const enterpriseData = new EnterpriseDataManager(auth);
  const [response, displayNames] = await Promise.all([
    enterpriseData.getData(includes),
    enterpriseData.getDisplayNames(),
  ]);

  const nodes = response.nodes || [];
  applyDecryptedNodeNames(nodes, displayNames.nodes);
  applyEnterpriseNameToRoot(nodes, response.enterprise_name);
  await enterpriseData.decryptNodeNames(nodes);

  const roles = response.roles || [];
  applyDecryptedRoleNames(roles, displayNames.roles);
  const resolvedRoles = resolveExistingRoles(roles, roleIdentifiers);
  const resolvedNodes: EnterpriseNode[] = nodeIdentifiers.map((identifier) =>
    resolveParentNode(nodes, identifier),
  );

  const managedNodeLinks = response.managed_nodes || [];
  const usersById = new Map<number, EnterpriseUser>();
  for (const user of response.users || []) usersById.set(user.enterprise_user_id, user);

  let treeKey: Uint8Array | null = null;
  if (action === "add") {
    treeKey = await enterpriseData.getTreeKey();
    if (!treeKey) {
      throw new KeeperSdkError(
        "Enterprise tree key is unavailable. The current user may not have permission to administer roles.",
        ResultCodes.ENTERPRISE_TREE_KEY_UNAVAILABLE,
      );
    }
  }

  const items: RoleManagedNodeItemResult[] = [];
  for (const role of resolvedRoles) {
    const roleName = roleDisplayName(role);

    for (const node of resolvedNodes) {
      const nodeName = nodePathOrFallback(nodes, node);
      const existingLink = findLink(managedNodeLinks, role.role_id, node.node_id);

      try {
        if (action === "add") {
          if (existingLink) {
            items.push({
              roleId: role.role_id,
              roleName,
              nodeId: node.node_id,
              nodeName,
              status: RoleManagedNodeStatus.Skipped,
              message: `Role "${roleName}" already manages node "${nodeName}".`,
            });
            continue;
          }
          const treeKeys = await buildTreeKeysForRole(
            auth,
            role.role_id,
            response.role_users || [],
            usersById,
            treeKey as Uint8Array,
          );
          const addResponse = await auth.executeRestCommand(
            roleManagedNodeAddCommand({
              role_id: role.role_id,
              managed_node_id: node.node_id,
              cascade_node_management: cascade ?? false,
              tree_keys: treeKeys.length > 0 ? treeKeys : undefined,
            }),
          );
          assertCommandSucceeded(
            addResponse,
            `role_managed_node_add failed for role_id=${role.role_id}, node_id=${node.node_id}`,
            ResultCodes.ROLE_MANAGED_NODE_ADD_FAILED,
          );
          items.push({
            roleId: role.role_id,
            roleName,
            nodeId: node.node_id,
            nodeName,
            status: RoleManagedNodeStatus.Added,
          });
        } else if (action === "update") {
          if (!existingLink) {
            items.push({
              roleId: role.role_id,
              roleName,
              nodeId: node.node_id,
              nodeName,
              status: RoleManagedNodeStatus.Skipped,
              message: `Role "${roleName}" does not manage node "${nodeName}".`,
            });
            continue;
          }
          const updateResponse = await auth.executeRestCommand(
            roleManagedNodeUpdateCommand({
              role_id: role.role_id,
              managed_node_id: node.node_id,
              cascade_node_management:
                cascade ?? existingLink.cascade_node_management,
            }),
          );
          assertCommandSucceeded(
            updateResponse,
            `role_managed_node_update failed for role_id=${role.role_id}, node_id=${node.node_id}`,
            ResultCodes.ROLE_MANAGED_NODE_UPDATE_FAILED,
          );
          items.push({
            roleId: role.role_id,
            roleName,
            nodeId: node.node_id,
            nodeName,
            status: RoleManagedNodeStatus.Updated,
          });
        } else {
          if (!existingLink) {
            items.push({
              roleId: role.role_id,
              roleName,
              nodeId: node.node_id,
              nodeName,
              status: RoleManagedNodeStatus.Skipped,
              message: `Role "${roleName}" does not manage node "${nodeName}".`,
            });
            continue;
          }
          const removeResponse = await auth.executeRestCommand(
            roleManagedNodeRemoveCommand({
              role_id: role.role_id,
              managed_node_id: node.node_id,
            }),
          );
          assertCommandSucceeded(
            removeResponse,
            `role_managed_node_remove failed for role_id=${role.role_id}, node_id=${node.node_id}`,
            ResultCodes.ROLE_MANAGED_NODE_REMOVE_FAILED,
          );
          items.push({
            roleId: role.role_id,
            roleName,
            nodeId: node.node_id,
            nodeName,
            status: RoleManagedNodeStatus.Removed,
          });
        }
      } catch (err) {
        items.push({
          roleId: role.role_id,
          roleName,
          nodeId: node.node_id,
          nodeName,
          status: RoleManagedNodeStatus.Failed,
          message: extractErrorMessage(err),
        });
      }
    }
  }

  return finalizeResult(items);
}

function finalizeResult(
  items: RoleManagedNodeItemResult[],
): ManageRoleNodesResult {
  let succeeded = 0;
  let skipped = 0;
  let failed = 0;
  for (const item of items) {
    if (
      item.status === RoleManagedNodeStatus.Added ||
      item.status === RoleManagedNodeStatus.Updated ||
      item.status === RoleManagedNodeStatus.Removed
    )
      succeeded++;
    else if (item.status === RoleManagedNodeStatus.Skipped) skipped++;
    else failed++;
  }
  return {
    success: failed === 0 && succeeded > 0,
    items,
    succeeded,
    skipped,
    failed,
  };
}

export function formatManageRoleNodesResult(
  result: ManageRoleNodesResult,
): FormattedManageRoleNodesTable {
  const rows = result.items.map((item, index) => [
    String(index + 1),
    item.status,
    item.roleName,
    String(item.roleId),
    item.nodeName,
    String(item.nodeId),
    item.message || "",
  ]);
  return {
    headers: [...MANAGE_NODE_TABLE_HEADERS],
    rows,
    summary: `Succeeded: ${result.succeeded}  Skipped: ${result.skipped}  Failed: ${result.failed}`,
  };
}

export function renderManageRoleNodesAsciiTable(
  table: FormattedManageRoleNodesTable,
): string {
  const { headers, rows } = table;
  const widths = headers.map((header, columnIndex) =>
    Math.max(header.length, ...rows.map((row) => (row[columnIndex] || "").length)),
  );
  const padCell = (cell: string, columnIndex: number): string =>
    cell + " ".repeat(Math.max(0, widths[columnIndex] - cell.length));
  const formatRow = (cells: string[]): string =>
    cells.map((cell, columnIndex) => padCell(cell, columnIndex)).join("  ");

  return [
    formatRow(headers),
    formatRow(widths.map((w) => "-".repeat(w))),
    ...rows.map(formatRow),
    table.summary,
  ].join("\n");
}
