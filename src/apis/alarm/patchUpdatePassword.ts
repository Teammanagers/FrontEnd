import { Axios } from '@apis/axios';

export const updateAlarmStatus = async (alarmId: number) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return null;
  }

  try {
    const response = await Axios.patch(`/api/alarm/${alarmId}`, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return { error };
  }
};
