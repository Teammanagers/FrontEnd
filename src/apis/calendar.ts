import { instance } from './instance';
import { CreateEventProps } from 'src/types/calendar';

export const getTeamMember = async (teamId: number) => {
  const response = await instance.get(`/api/team/${teamId}/member`);
  return response;
};

export const createCalendarEvent = async (
  teamId: number,
  event: CreateEventProps
) => {
  const response = await instance.post(`/api/team/${teamId}/calendar`, event);
  return response;
};

export const getCalendarEvent = async (
  teamId: number,
  month: number | null
) => {
  const response = await instance.get(
    `/api/team/${teamId}/calendar?month=${month}`
  );
  return response;
};
