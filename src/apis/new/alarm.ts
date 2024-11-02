import { AxiosInstance } from '@/apis/new/axios-instance';
import { alarmApiUrl, alarmApiUrlWithTeamId } from '@/apis/new/urls';
import { getAlarmResponse } from '@/types/new/response/alarm';

// 알림 생성
export const createAlarm = async (
  teamId: number,
  referenceId: number
): Promise<void> => {
  const response = await AxiosInstance.post(
    `${alarmApiUrlWithTeamId(teamId)}/${referenceId}`
  );
  return response.data;
};

// 알림 조회
export const getAlarm = async (teamId: number): Promise<getAlarmResponse> => {
  const response = await AxiosInstance.get(`${alarmApiUrl}/${teamId}`);
  return response.data;
};

// 알림 삭제
export const deleteAlarm = async (alarmId: number): Promise<void> => {
  const response = await AxiosInstance.delete(`${alarmApiUrl}/${alarmId}`);
  return response.data;
};

// 알림 읽음 표시
export const readAlarm = async (alarmId: number): Promise<void> => {
  const response = await AxiosInstance.patch(`${alarmApiUrl}/${alarmId}`);
  return response.data;
};
