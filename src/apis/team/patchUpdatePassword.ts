import { Axios } from '@apis/axios';
import { UpdateTeamPasswordInput } from 'src/types/team';

export const updateTeamPassword = async ({
  teamId,
  password
}: UpdateTeamPasswordInput) => {
  try {
    const response = await Axios.patch(
      `/api/team/${teamId}/password`,
      {
        password
      },
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    return { error };
  }
};
