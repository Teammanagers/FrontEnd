import { useQuery } from '@tanstack/react-query';
import { getTeamById } from '@apis/team/getTeamById';

export const useGetTeamById = () => {
  return useQuery({
    queryKey: ['team', teamId],
    queryFn: () => getTeamById()
  });
};
