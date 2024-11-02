import { AxiosInstance } from '@/apis/new/axios-instance';

export const updateAlarmStatus = async (alarmId: number) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return null;
  }

  try {
    const response = await AxiosInstance.patch(`/api/alarm/${alarmId}`, {
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
