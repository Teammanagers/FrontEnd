import { useMutation } from '@tanstack/react-query';
import { postValidatePassword } from '@apis/team/postValidatePassword';
import { useNavigate } from 'react-router-dom';

export const useValidatePassword = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: postValidatePassword, // API 호출 함수 전달
    onSuccess: (data) => {
      if (data.isSuccess) {
        navigate('/');
      } else {
        return data;
      }
    },
    onError: (error) => {
      console.log(error, 'error');
      return error;
    }
  });

  return mutation;
};
