import { Axios } from '@apis/axios';
import { UpdateTeamPasswordInput } from 'src/types/team';

export const updateTeamPassword = async ({
  teamId,
  password
}: UpdateTeamPasswordInput) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return null;
  }

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
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    return { error };
  }
};
