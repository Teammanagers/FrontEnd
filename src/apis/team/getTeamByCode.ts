import { Axios } from '@apis/axios';

export const getTeamByCode = async (teamCode: string) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return null;
  }
  try {
    const response = await Axios.get(`/api/team?teamCode=${teamCode}`, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};
