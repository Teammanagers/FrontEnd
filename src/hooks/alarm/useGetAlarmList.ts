import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getAlarm } from '@apis/alarm/getAlarmList';
import { AlarmListType } from 'src/types/alarm';

export const useGetAlarmList = (
  teamId: number | null
): UseQueryResult<AlarmListType> => {
  return useQuery({
    queryKey: ['alarm', teamId],
    queryFn: () => getAlarm(teamId)
  });
};
