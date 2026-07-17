import type {
  Auth,
  DSharedFolder,
  DSharedFolderTeam,
  DSharedFolderUser,
  DUser,
} from "@keeper-security/keeperapi";
import { webSafe64FromBytes } from "@keeper-security/keeperapi";
import { InMemoryStorage } from "../storage/InMemoryStorage";
import {
  FolderKind,
  VaultObjectKind,
  sharedFolderName,
} from "../folders/folderHelpers";
import {
  EnterpriseDataInclude,
  EnterpriseDataManager,
} from "../teams/enterpriseData";
import { extractErrorMessage, logger } from "../utils";

/** A single user or team permission entry on a shared folder (Commander JSON shape). */
export type MembershipPermission = {
  name: string;
  manage_users: boolean;
  manage_records: boolean;
};

/** A shared folder's membership, matching Commander's `download-membership` JSON shape. */
export type MembershipSharedFolder = {
  uid: string;
  path: string;
  manage_users: boolean;
  manage_records: boolean;
  can_edit: boolean;
  can_share: boolean;
  permissions: MembershipPermission[];
};

/** Enterprise team + its members, included alongside shared folder membership. */
export type MembershipTeam = {
  uid: string;
  name: string;
  members: string[];
};

export type MembershipData = {
  shared_folders: MembershipSharedFolder[];
  teams?: MembershipTeam[];
};

export type DownloadMembershipOptions = {
  /** Skip enterprise team lookup and only export shared folder membership. */
  foldersOnly?: boolean;
  /** Case-insensitive substring/exact-uid filter applied to shared folder name or uid. */
  folderFilter?: string;
  /** Force every exported user/team permission's manage_users flag to `true`. */
  forceManageUsers?: boolean;
  /** Force every exported user/team permission's manage_records flag to `true`. */
  forceManageRecords?: boolean;
  /** Force every exported user/team permission's manage_users flag to `false`. */
  forceRestrictUsers?: boolean;
  /** Force every exported user/team permission's manage_records flag to `false`. */
  forceRestrictRecords?: boolean;
};

function resolveForcedFlag(
  value: boolean,
  force: boolean | undefined,
  restrict: boolean | undefined,
): boolean {
  if (force === true) return true;
  if (restrict === true) return false;
  return value;
}

/** Maps `DUser.accountUid` (webSafe64) to the account's username/email. */
export function buildAccountUidEmailMap(
  storage: InMemoryStorage,
): Map<string, string> {
  const accountUidToEmail = new Map<string, string>();
  for (const user of storage.getAll<DUser>(VaultObjectKind.User)) {
    const uid = user.accountUid ? webSafe64FromBytes(user.accountUid) : "";
    const email = (user.username || "").trim();
    if (uid && email) accountUidToEmail.set(uid, email);
  }
  return accountUidToEmail;
}

/** Resolves the best-known email/username for a shared-folder user/owner entry. */
export function resolveUserEmail(
  accountUid: string | undefined,
  accountUsername: string | undefined,
  emailMap: Map<string, string>,
): string {
  const explicit = (accountUsername || "").trim();
  if (explicit) return explicit;
  if (accountUid) return emailMap.get(accountUid) || accountUid;
  return "";
}

function collectFolderPermissions(
  storage: InMemoryStorage,
  sharedFolder: DSharedFolder,
  emailMap: Map<string, string>,
  options: DownloadMembershipOptions,
): MembershipPermission[] {
  const permissions: MembershipPermission[] = [];
  const seenUserUids = new Set<string>();
  const seenEmails = new Set<string>();

  for (const sharedUser of storage.getAll<DSharedFolderUser>(
    VaultObjectKind.SharedFolderUser,
  )) {
    if (sharedUser.sharedFolderUid !== sharedFolder.uid) continue;
    if (sharedUser.accountUid) seenUserUids.add(sharedUser.accountUid);
    const email = resolveUserEmail(
      sharedUser.accountUid,
      sharedUser.accountUsername,
      emailMap,
    );
    if (!email) continue;
    const key = email.toLowerCase();
    if (seenEmails.has(key)) continue;
    seenEmails.add(key);
    permissions.push({
      name: email,
      manage_users: resolveForcedFlag(
        sharedUser.manageUsers === true,
        options.forceManageUsers,
        options.forceRestrictUsers,
      ),
      manage_records: resolveForcedFlag(
        sharedUser.manageRecords === true,
        options.forceManageRecords,
        options.forceRestrictRecords,
      ),
    });
  }

  if (
    sharedFolder.ownerAccountUid &&
    !seenUserUids.has(sharedFolder.ownerAccountUid)
  ) {
    const ownerEmail = resolveUserEmail(
      sharedFolder.ownerAccountUid,
      sharedFolder.ownerUsername,
      emailMap,
    );
    const key = ownerEmail.toLowerCase();
    if (ownerEmail && !seenEmails.has(key)) {
      seenEmails.add(key);
      permissions.push({
        name: ownerEmail,
        manage_users: resolveForcedFlag(
          true,
          options.forceManageUsers,
          options.forceRestrictUsers,
        ),
        manage_records: resolveForcedFlag(
          true,
          options.forceManageRecords,
          options.forceRestrictRecords,
        ),
      });
    }
  }

  for (const sharedTeam of storage.getAll<DSharedFolderTeam>(
    VaultObjectKind.SharedFolderTeam,
  )) {
    if (sharedTeam.sharedFolderUid !== sharedFolder.uid) continue;
    const name = (sharedTeam.name || sharedTeam.teamUid || "").trim();
    if (!name) continue;
    permissions.push({
      name,
      manage_users: resolveForcedFlag(
        sharedTeam.manageUsers === true,
        options.forceManageUsers,
        options.forceRestrictUsers,
      ),
      manage_records: resolveForcedFlag(
        sharedTeam.manageRecords === true,
        options.forceManageRecords,
        options.forceRestrictRecords,
      ),
    });
  }

  permissions.sort((permissionA, permissionB) =>
    permissionA.name
      .toLowerCase()
      .localeCompare(permissionB.name.toLowerCase()),
  );
  return permissions;
}

function matchesFolderFilter(
  sharedFolder: DSharedFolder,
  filter: string | undefined,
): boolean {
  const pattern = (filter || "").trim().toLowerCase();
  if (!pattern) return true;
  if (sharedFolder.uid.toLowerCase() === pattern) return true;
  return sharedFolderName(sharedFolder).toLowerCase().includes(pattern);
}

async function collectEnterpriseTeams(auth: Auth): Promise<MembershipTeam[]> {
  const enterpriseData = new EnterpriseDataManager(auth);
  const data = await enterpriseData.getData([
    EnterpriseDataInclude.Users,
    EnterpriseDataInclude.Teams,
    EnterpriseDataInclude.QueuedTeams,
    EnterpriseDataInclude.TeamUsers,
    EnterpriseDataInclude.QueuedTeamUsers,
  ]);

  const usernameById = new Map<number, string>();
  for (const user of data.users || []) {
    usernameById.set(user.enterprise_user_id, user.username);
  }

  const membersByTeam = new Map<string, Set<string>>();
  for (const link of [
    ...(data.team_users || []),
    ...(data.queued_team_users || []),
  ]) {
    const username = usernameById.get(link.enterprise_user_id);
    if (!username) continue;
    let members = membersByTeam.get(link.team_uid);
    if (!members) {
      members = new Set<string>();
      membersByTeam.set(link.team_uid, members);
    }
    members.add(username);
  }

  const teams: MembershipTeam[] = [];
  const seenTeamUids = new Set<string>();
  for (const team of [...(data.teams || []), ...(data.queued_teams || [])]) {
    if (!team.team_uid || seenTeamUids.has(team.team_uid)) continue;
    seenTeamUids.add(team.team_uid);
    const members = Array.from(membersByTeam.get(team.team_uid) || []).sort(
      (memberA, memberB) => memberA.localeCompare(memberB),
    );
    teams.push({
      uid: team.team_uid,
      name: team.name || team.team_uid,
      members,
    });
  }
  teams.sort((teamA, teamB) =>
    teamA.name.toLowerCase().localeCompare(teamB.name.toLowerCase()),
  );
  return teams;
}

/**
 * Exports shared folder (and optionally enterprise team) membership to a
 * Commander-compatible JSON structure, suitable for later re-applying with
 * `applyMembership`.
 *
 * `auth` is only required (and only used) to fetch enterprise team data; pass
 * `null` (or set `options.foldersOnly`) to export shared folder membership only.
 */
export async function downloadMembership(
  auth: Auth | null,
  storage: InMemoryStorage,
  options: DownloadMembershipOptions = {},
): Promise<MembershipData> {
  const emailMap = buildAccountUidEmailMap(storage);

  const shared_folders: MembershipSharedFolder[] = storage
    .getAll<DSharedFolder>(FolderKind.SharedFolder)
    .filter((sharedFolder) =>
      matchesFolderFilter(sharedFolder, options.folderFilter),
    )
    .map((sharedFolder) => ({
      uid: sharedFolder.uid,
      path: sharedFolderName(sharedFolder),
      manage_users: resolveForcedFlag(
        sharedFolder.defaultManageUsers === true,
        options.forceManageUsers,
        options.forceRestrictUsers,
      ),
      manage_records: resolveForcedFlag(
        sharedFolder.defaultManageRecords === true,
        options.forceManageRecords,
        options.forceRestrictRecords,
      ),
      can_edit: sharedFolder.defaultCanEdit === true,
      can_share: sharedFolder.defaultCanShare === true,
      permissions: collectFolderPermissions(
        storage,
        sharedFolder,
        emailMap,
        options,
      ),
    }))
    .sort((folderA, folderB) =>
      folderA.path.toLowerCase().localeCompare(folderB.path.toLowerCase()),
    );

  const result: MembershipData = { shared_folders };

  if (!options.foldersOnly && auth) {
    try {
      result.teams = await collectEnterpriseTeams(auth);
    } catch (err) {
      logger.debug(
        `download-membership: could not include enterprise team membership: ${extractErrorMessage(err)}`,
      );
    }
  }

  return result;
}
