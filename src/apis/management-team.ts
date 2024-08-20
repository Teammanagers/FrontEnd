import { Axios } from '@apis/Axios.ts';
import { TeamData } from '../types/team.ts';
import { MemberTypes } from '../types/member.ts';

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

// 팀 멤버 조회
export const getMembers = async (teamId: number): Promise<MemberTypes> => {
  try {
    const response = await Axios.get(`/api/team/${teamId}/member`);
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
