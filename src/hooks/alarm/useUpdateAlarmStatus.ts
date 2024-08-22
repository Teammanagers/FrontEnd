import { useMutation } from '@tanstack/react-query';
import { updateAlarmStatus } from '@apis/alarm/patchUpdatePassword';

export const useUpdateAlarmStatus = () => {
  const mutation = useMutation({
    mutationFn: updateAlarmStatus // API 호출 함수 전달
  });

  return mutation;
};
