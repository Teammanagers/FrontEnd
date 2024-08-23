import { Axios } from '@apis/Axios';

export const getTeamById = async () => {
  try {
    const response = await Axios.get(`/api/member/team`, {
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
