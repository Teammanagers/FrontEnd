import { AxiosInstance } from '@/apis/new/axios-instance';

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

    const response = await AxiosInstance.patch(`/api/member`, formData, {
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
