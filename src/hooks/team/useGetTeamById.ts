import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getTeamById } from '@apis/team/getTeamById';
import { GetTeamResponse } from 'src/types/team';

export const useGetTeamById = (
  teamId: number
): UseQueryResult<GetTeamResponse> => {
  return useQuery({
    queryKey: ['team', teamId],
    queryFn: () => getTeamById(teamId)
  });
};
