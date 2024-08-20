import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { GetTeamByCodeResponse } from 'src/types/team';
import { getTeamByCode } from '@apis/team/getTeamByCode';

export const useGetTeamByCode = (
  teamCode: string,
  enabled: boolean
): UseQueryResult<GetTeamByCodeResponse> => {
  return useQuery({
    queryKey: ['team', teamCode],
    queryFn: () => getTeamByCode(teamCode),
    enabled: enabled,
    retry: false,
    refetchOnWindowFocus: false
  });
};
