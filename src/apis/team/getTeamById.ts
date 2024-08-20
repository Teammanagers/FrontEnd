import { Axios } from '@apis/axios';
import { GetTeamResponse } from 'src/types/team';

export const getTeamById = async (teamId: number): Promise<GetTeamResponse> => {
  try {
    const response = await Axios.get(`/api/team/${teamId}`, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};
