// 팀 조회
import { Axios } from '@apis/Axios.ts';
import { TeamData } from '../types/team.ts';
import { MemberTypes } from '../types/member.ts';

export const getTeamData = async (teamId: number): Promise<TeamData> => {
  try {
    const response = await Axios.get(`/api/team/${teamId}`);
    return response.data.result.team;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 팀 멤버 조회
export const getMembers = async (teamId: number): Promise<MemberTypes> => {
  try {
    const response = await Axios.get(`/api/team/${teamId}/member`);
    return response.data.result.teamMember;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
