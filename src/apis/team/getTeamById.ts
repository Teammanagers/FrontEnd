import { Axios } from '@apis/axios';

export const getTeamById = async () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return null;
  }

  try {
    const response = await Axios.get(`/api/member/team`, {
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
