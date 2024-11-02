import { AxiosInstance } from '@/apis/new/axios-instance';
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
    const response = await AxiosInstance.patch(
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
