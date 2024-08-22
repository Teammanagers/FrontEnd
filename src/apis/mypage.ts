import { Axios } from './axios';
import { ProfileResponse } from 'src/types/profile';

// 내 프로필 조회
export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const response = await Axios.get<ProfileResponse>(`/api/member`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
};

//내 프로필 수정
export const updateProfile = async (
  image: File | null,
  name: string,
  belong: string,
  phoneNumber: string,
  confidentRole: string[]
) => {
  try {
    const formData = new FormData();

    const profileData = JSON.stringify({
      name,
      belong,
      phoneNumber,
      confidentRole
    });

    formData.append('updateProfile', profileData);

    if (image) {
      formData.append('image', image);
    }

    const response = await Axios.patch(`/api/member`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Profile updated successfully:', response.data);
    console.log(profileData);
    return response.data;
  } catch (err) {
    console.error('Failed to update profile:', err);
    throw err;
  }
};
