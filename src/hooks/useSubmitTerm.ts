import { createTerms } from '@/apis/new/terms';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useSubmitTerm = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createTerms,
    onSuccess: () => {
      navigate('/login-complete');
    },
    onError: (error) => {
      console.log(error, 'error');
      return error;
    }
  });

  return mutation;
};
