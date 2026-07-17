import {
  Enterprise,
  teamEnterpriseUserUpdateCommand,
  type Auth,
} from "@keeper-security/keeperapi";
import { extractErrorMessage, KeeperSdkError, ResultCodes } from "../utils";
import {
  EnterpriseDataInclude,
  EnterpriseDataManager,
  type EnterpriseTeamRecord,
  type EnterpriseTeamUserLink,
  type EnterpriseUser,
} from "../teams/enterpriseData";
import { resolveExistingTeams } from "../teams/teamUtils";
import { normalizeEmailInputs, resolveExistingUsers } from "./userTypes";

const UPDATE_TEAM_USER_INCLUDES: EnterpriseDataInclude[] = [
  EnterpriseDataInclude.Users,
  EnterpriseDataInclude.Teams,
  EnterpriseDataInclude.TeamUsers,
];

const UPDATE_TEAM_USER_TABLE_HEADERS = [
  "#",
  "Status",
  "User Email",
  "User ID",
  "Team Name",
  "Team UID",
  "Detail",
];

export enum UpdateTeamUserStatus {
  Updated = "updated",
  Skipped = "skipped",
  Failed = "failed",
}

export enum UpdateTeamUserSkipReason {
  NotMember = "not_member",
}

export type UpdateUsersOnTeamsInput = {
  users: string[];
  teams: string[];
  hideSharedFolders: boolean;
};

export type UpdateTeamUserItemResult = {
  username: string;
  enterpriseUserId: number;
  teamUid: string;
  teamName: string;
  status: UpdateTeamUserStatus;
  skipReason?: UpdateTeamUserSkipReason;
  message?: string;
};

export type UpdateUsersOnTeamsResult = {
  success: boolean;
  items: UpdateTeamUserItemResult[];
  updated: number;
  skipped: number;
  failed: number;
};

export type FormattedUpdateTeamUserTable = {
  headers: string[];
  rows: string[][];
  summary: string;
};

type ResolvedTeam = Pick<EnterpriseTeamRecord, "team_uid" | "name">;

const membershipKey = (userId: number, teamUid: string): string =>
  `${userId}:${teamUid}`;

function buildMembershipSet(
  teamUsers: EnterpriseTeamUserLink[] | undefined,
): Set<string> {
  const membership = new Set<string>();
  for (const link of teamUsers || []) {
    membership.add(membershipKey(link.enterprise_user_id, link.team_uid));
  }
  return membership;
}

function normalizeTeamIdentifiers(teams: string[] | undefined): string[] {
  return (teams || []).map((t) => t.trim()).filter((t) => t.length > 0);
}

export async function updateUsersOnTeams(
  auth: Auth,
  input: UpdateUsersOnTeamsInput,
): Promise<UpdateUsersOnTeamsResult> {
  const emails = normalizeEmailInputs(input.users);
  if (emails.length === 0) {
    throw new KeeperSdkError(
      "No users provided.",
      ResultCodes.NO_USERS_TO_UPDATE,
    );
  }
  const teamIdentifiers = normalizeTeamIdentifiers(input.teams);
  if (teamIdentifiers.length === 0) {
    throw new KeeperSdkError(
      "No teams provided.",
      ResultCodes.NO_TEAMS_FOR_USER_OP,
    );
  }
  if (input.hideSharedFolders === undefined || input.hideSharedFolders === null) {
    throw new KeeperSdkError(
      "hideSharedFolders (on/off) is required.",
      ResultCodes.HIDE_SHARED_FOLDERS_REQUIRED,
    );
  }

  const userType = input.hideSharedFolders
    ? Enterprise.TeamUserType.ADMIN_ONLY
    : Enterprise.TeamUserType.USER;

  const enterpriseData = new EnterpriseDataManager(auth);
  const response = await enterpriseData.getData(UPDATE_TEAM_USER_INCLUDES);

  const teams: ResolvedTeam[] = resolveExistingTeams(
    response.teams || [],
    teamIdentifiers,
  ).map((team) => ({ team_uid: team.team_uid, name: team.name }));
  const users: EnterpriseUser[] = resolveExistingUsers(
    response.users || [],
    emails,
  );
  const membership = buildMembershipSet(response.team_users);

  const items: UpdateTeamUserItemResult[] = [];
  for (const team of teams) {
    for (const user of users) {
      const base = {
        username: user.username,
        enterpriseUserId: user.enterprise_user_id,
        teamUid: team.team_uid,
        teamName: team.name,
      };

      if (!membership.has(membershipKey(user.enterprise_user_id, team.team_uid))) {
        items.push({
          ...base,
          status: UpdateTeamUserStatus.Skipped,
          skipReason: UpdateTeamUserSkipReason.NotMember,
        });
        continue;
      }

      try {
        const response = await auth.executeRestCommand(
          teamEnterpriseUserUpdateCommand({
            team_uid: team.team_uid,
            enterprise_user_id: user.enterprise_user_id,
            user_type: userType,
          }),
        );
        const result = (response.result || "").toLowerCase();
        if (result && result !== "success") {
          throw new KeeperSdkError(
            response.message ||
              response.result_code ||
              `team_enterprise_user_update failed for user=${user.username}, team=${team.team_uid}`,
            response.result_code || ResultCodes.TEAM_ENTERPRISE_USER_UPDATE_FAILED,
          );
        }
        items.push({ ...base, status: UpdateTeamUserStatus.Updated });
      } catch (err) {
        items.push({
          ...base,
          status: UpdateTeamUserStatus.Failed,
          message: extractErrorMessage(err),
        });
      }
    }
  }

  return finalizeResult(items);
}

function finalizeResult(
  items: UpdateTeamUserItemResult[],
): UpdateUsersOnTeamsResult {
  const updated = items.filter(
    (item) => item.status === UpdateTeamUserStatus.Updated,
  ).length;
  const skipped = items.filter(
    (item) => item.status === UpdateTeamUserStatus.Skipped,
  ).length;
  const failed = items.filter(
    (item) => item.status === UpdateTeamUserStatus.Failed,
  ).length;
  return {
    success: failed === 0 && updated > 0,
    items,
    updated,
    skipped,
    failed,
  };
}

export function formatUpdateTeamUserResult(
  result: UpdateUsersOnTeamsResult,
): FormattedUpdateTeamUserTable {
  const rows = result.items.map((item, index) => [
    String(index + 1),
    item.status,
    item.username,
    String(item.enterpriseUserId),
    item.teamName,
    item.teamUid,
    item.message || item.skipReason || "",
  ]);
  return {
    headers: [...UPDATE_TEAM_USER_TABLE_HEADERS],
    rows,
    summary: `Updated: ${result.updated}  Skipped: ${result.skipped}  Failed: ${result.failed}`,
  };
}

export function renderUpdateTeamUserAsciiTable(
  table: FormattedUpdateTeamUserTable,
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
