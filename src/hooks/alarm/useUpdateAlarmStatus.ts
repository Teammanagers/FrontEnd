import { useMutation } from '@tanstack/react-query';
import { readAlarm } from '@/apis/new/alarm';

export const useUpdateAlarmStatus = () => {
  const mutation = useMutation({
    mutationFn: readAlarm // API 호출 함수 전달
  });

  return mutation;
};
