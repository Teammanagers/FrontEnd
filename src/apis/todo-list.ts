import { instance } from './instance';

const teamCode = 'AA1AA1';

export const getTeamId = async () => {
  const response = await instance.get('/api/team', {
    params: {
      teamCode
    }
  });
  return response;
};
