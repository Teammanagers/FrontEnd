// 팀 조회
import { Axios } from '@apis/Axios.ts';
import { TeamData } from '../types/team.ts';

export const getTeamData = async (teamId: number): Promise<TeamData> => {
  try {
    const response = await Axios.get(`/api/team/${teamId}`);
    console.log(response.data.result.team);
    return response.data.result.team;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
