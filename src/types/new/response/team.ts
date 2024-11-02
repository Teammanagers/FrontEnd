import { ISimpleTeamMember, ITeam, ITeamMember } from '@/types/new/common';

export interface createTeamResponse {
  teamId: number;
}

export interface getTeamResponse {
  team: ITeam;
}

export interface getTeamByCodeResponse {
  team: ITeam;
}

export interface getTeamMemberResponse {
  teamMembers: ISimpleTeamMember[];
}

export interface getTeamMemberDetailResponse {
  teamMember: ITeamMember[];
}

export interface deleteTeamResponse {
  teamMemberList: ITeamMember[];
}
