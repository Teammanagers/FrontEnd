import { instance } from './instance';
import { ScheduleInfoType } from 'src/types/calendar';

export const getTeamMember = async (teamId: number) => {
  const response = await instance.get(`/api/team/${teamId}/member`);
  return response;
};

export const createCalendarEvent = async (
  teamId: number,
  schedule: ScheduleInfoType
) => {
  const response = await instance.post(`/api/team/${teamId}/calendar`, {
    schedule
  });
  return response;
};

export const getCalendarEvent = async (teamManageId: number, month: number) => {
  const response = await instance.get(
    `/api/team/${teamManageId}/calendar?month=${month}`
  );
  return response;
};
