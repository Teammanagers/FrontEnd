import { updateMyProfile } from './new/member';

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

    const response = await updateMyProfile(formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response;
  } catch (err) {
    console.error('Failed to update profile:', err);
    throw err;
  }
};
