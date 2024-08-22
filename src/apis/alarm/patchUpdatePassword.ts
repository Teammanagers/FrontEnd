import { Axios } from '@apis/axios';

export const updateAlarmStatus = async (alarmId: number) => {
  try {
    const response = await Axios.patch(`/api/alarm/${alarmId}`, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return { error };
  }
};
