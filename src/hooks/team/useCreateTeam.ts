import { createTeam } from '@apis/team/postCreateTeam';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { CreateTeamInput, CreateTeamResponse } from 'src/types/team';

export const useCreateTeam = (): UseMutationResult<
  CreateTeamResponse,
  Error,
  CreateTeamInput
> => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createTeam, // 올바른 함수 전달
    onSuccess: (data) => {
      console.log(data.result, 'ㅎㅇ');
      navigate('/team/share', {
        state: {
          teamCode: data.result.teamCode,
          teamId: data.result.teamId
        }
      });
    },
    onError: (error) => {
      return error;
    }
  });

  return mutation;
};
