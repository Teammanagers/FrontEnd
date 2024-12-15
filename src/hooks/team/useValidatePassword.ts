import { updateTeam } from '@/apis/new/team';
import { useMutation } from '@tanstack/react-query';

export const useValidatePassword = () => {
  const mutation = useMutation({
    mutationFn: updateTeam, // API 호출 함수 전달
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log(error, 'error');
      return error;
    }
  });

  return mutation;
};
