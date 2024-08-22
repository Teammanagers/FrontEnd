import { Axios } from './axios';
import { CreateEventProps, UpdateEventProps } from 'src/types/calendar';

export const getTeamMember = async (teamId: number) => {
  const response = await Axios.get(`/api/team/${teamId}/member`);
  return response;
};

export const createCalendarEvent = async (
  teamId: number,
  event: CreateEventProps
) => {
  const response = await Axios.post(`/api/team/${teamId}/calendar`, event);
  return response;
};

export const updateCalendarEvent = async (
  eventId: number,
  data: UpdateEventProps
) => {
  const response = await Axios.patch(`/api/calendar/${eventId}`, data);
  return response;
};

export const updateEventState = async (eventId: number) => {
  const response = await Axios.patch(`/api/calendar/${eventId}/state`);
  return response;
};

export const deleteCalendarEvent = async (eventId: number) => {
  const response = await Axios.delete(`/api/calendar/${eventId}`);
  return response;
};

export const getCalendarEventList = async (
  teamId: number,
  month: number | null
) => {
  const response = await Axios.get(
    `/api/team/${teamId}/calendar?month=${month}`
  );
  return response;
};

export const getCalendarEventDetail = async (calendarId: number) => {
  const response = await Axios.get(`/api/calendar/${calendarId}`);
  return response;
};

export const getUpcomingEvent = async (teamId: number) => {
  const response = await Axios.get(`/api/team/${teamId}/calendar/coming`);
  return response;
};
