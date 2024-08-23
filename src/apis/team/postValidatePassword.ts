import { Axios } from '@apis/axios';
import { ValidatePasswordResponse } from 'src/types/team';

export const postValidatePassword = async ({
  teamId,
  teamCode,
  password
}: ValidatePasswordResponse) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return null;
  }

  try {
    const response = await Axios.post(
      `/api/team/${teamId}`,
      { teamCode: teamCode, password: password },
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};
