import { Axios } from '@apis/axios.ts';
import { ScheduleRequestBody, TeamData } from '../types/management.ts';

// 내 팀 조회
export const getMyTeam = async () => {
  try {
    const response = await Axios.get(`/api/member/team`);
    return response.data.result.teamList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 팀 조회
export const getTeamData = async (teamId: number): Promise<TeamData> => {
  try {
    const response = await Axios.get(`/api/team/${teamId}`);
    return response.data.result.team;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 팀 멤버 조회 (역할태그 포함)
export const getMembers = async (teamId: number) => {
  try {
    const response = await Axios.get(`/api/team/${teamId}/member/detail`);
    return response.data.result.teamMember;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 팀 정보 수정(이름, 이미지)
export const updateProfile = async (
  teamId: number,
  title: string,
  imageFile: File | null // 이미지 파일 null 가능
) => {
  try {
    const formData = new FormData();

    formData.append(
      'updateProfile',
      JSON.stringify({
        title: title
      })
    );

    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    const response = await Axios.patch(`/api/team/${teamId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 팀 태그 수정
export const updateTag = async (
  teamId: number,
  tagId: number,
  name: string
) => {
  try {
    const response = await Axios.patch(`/api/team/${teamId}/tag/${tagId}`, {
      name: name
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 역할 태그 생성
export const createRoleTag = async (teamManageId: number, name: string) => {
  try {
    const response = await Axios.post(`/api/management/${teamManageId}/role`, {
      name: name
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 역할 태그 수정
export const updateRoleTag = async (
  teamManageId: number,
  tagId: number,
  name: string
) => {
  try {
    const response = await Axios.patch(
      `/api/management/${teamManageId}/role/${tagId}`,
      {
        name: name
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 역할 태그 삭제
export const deleteRoleTag = async (teamManageId: number, tagId: number) => {
  try {
    await Axios.delete(`/api/management/${teamManageId}/role/${tagId}`);
    console.log('역할 태그 삭제');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 스케줄 조회
export const getSchedules = async (teamId: number) => {
  try {
    const response = await Axios.get(`/api/team/${teamId}/schedule`);
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 내 스케줄 조회
export const getMySchedules = async (teamId: number) => {
  try {
    const response = await Axios.get(`/api/schedule/${teamId}`);
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 스케줄 추가
export const createSchedule = async (
  teamId: number,
  scheduleData: ScheduleRequestBody
) => {
  try {
    const response = await Axios.post(
      `/api/team/${teamId}/schedule`,
      scheduleData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 내 스케줄 수정
export const updateSchedule = async (
  teamId: number,
  scheduleData: ScheduleRequestBody
) => {
  try {
    const response = await Axios.patch(
      `/api/team/${teamId}/schedule`,
      scheduleData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
