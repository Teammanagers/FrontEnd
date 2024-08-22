import { postTerms } from '@apis/login/postTerms';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useSubmitTerm = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: postTerms,
    onSuccess: (data) => {
      if (data.data.isSuccess) {
        navigate('/login-complete');
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
