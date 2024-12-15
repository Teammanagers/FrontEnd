import { getMyTeam } from '@/apis/new/member';
import { useQuery } from '@tanstack/react-query';

export const useGetTeamById = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: () => getMyTeam()
  });
};
