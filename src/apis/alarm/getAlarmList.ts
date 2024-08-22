import { Axios } from '@apis/Axios';
import { GetTeamResponse } from 'src/types/team';

export const getAlarm = async (teamId: number): Promise<GetTeamResponse> => {
  try {
    const response = await Axios.get(`/api/alarm/${teamId}`, {
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
