import { Axios } from '@apis/axios';
import { CreateTeamInput } from 'src/types/team';

export const createTeam = async ({
  title,
  teamTagList,
  imageFile
}: CreateTeamInput) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return null;
  }

  try {
    const formData = new FormData();
    const createTeam = JSON.stringify({ title, teamTagList });

    formData.append('createTeam', createTeam);
    formData.append('imageFile', imageFile);

    const response = await Axios.post('/api/team', formData, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return { error };
  }
};
