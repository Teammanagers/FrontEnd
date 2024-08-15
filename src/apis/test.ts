import { instance } from './instance';

export const getTeam = async () => {
  const response = await instance.get('/api/team/1');
  return response;
};

export const createTeam = async () => {
  try {
    const formData = new FormData();
    formData.append(
      'createTeam',
      JSON.stringify({
        title: 'Test Team 2',
        teamTagList: ['123', '234', '345']
      })
    );
    formData.append('imageFile', new Blob([]), '');
    const response = await instance.post('/api/team', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
