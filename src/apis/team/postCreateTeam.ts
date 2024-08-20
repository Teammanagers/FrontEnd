import { Axios } from '@apis/axios';
import { CreateTeamInput } from 'src/types/team';

export const createTeam = async ({
  title,
  teamTagList,
  imageFile
}: CreateTeamInput) => {
  try {
    const formData = new FormData();
    const createTeam = JSON.stringify({ title, teamTagList });

    formData.append('createTeam', createTeam);
    formData.append('imageFile', imageFile);

    const response = await Axios.post('/api/team', formData, {
      withCredentials: true,
      headers: {
        Accept: 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return { error };
  }
};
