import { Axios } from '@apis/Axios';
import { GetTeamByCodeResponse } from 'src/types/team';

export const getTeamByCode = async (
  teamCode: string
): Promise<GetTeamByCodeResponse> => {
  try {
    const response = await Axios.get(`/api/team?teamCode=${teamCode}`, {
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
