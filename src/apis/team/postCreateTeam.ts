import { CreateTeamInput } from 'src/types/team';
import { createTeam } from '../new/team';

export const createTeamFetcher = async ({
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
    const requestBody = JSON.stringify({ title, teamTagList });

    formData.append('createTeam', requestBody);
    formData.append('imageFile', imageFile);

    const response = await createTeam(formData);
    return response;
  } catch (error) {
    return { error };
  }
};
