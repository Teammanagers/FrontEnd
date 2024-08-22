import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { updateTeamPassword } from '@apis/team/patchUpdatePassword';
import { UpdateTeamPasswordInput } from 'src/types/team';

export const useCreatePassword = (
  teamId: number
): UseMutationResult<void, Error, UpdateTeamPasswordInput> => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: updateTeamPassword, // API 호출 함수 전달
    onSuccess: () => {
      // 성공 시 네비게이션
      navigate('/team', {
        state: {
          teamId: teamId
        }
      });
    },
    onError: (error) => {
      console.error('Error:', error.message);
    }
  });

  return mutation;
};
