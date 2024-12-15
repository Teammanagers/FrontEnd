import { getAlarm } from '@/apis/new/alarm';
import { IAlarm } from '@/types/new/common';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetAlarmList = (teamId: number): UseQueryResult<IAlarm> => {
  return useQuery({
    queryKey: ['alarm', teamId],
    queryFn: () => getAlarm(teamId)
  });
};
