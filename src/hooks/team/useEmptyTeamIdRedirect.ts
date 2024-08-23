import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useEmptyTeamIdRedirect = (redirectPath: string = '/login') => {
  const location = useLocation();
  const navigate = useNavigate();

  const { teamId, teamCode } =
    (location.state as { teamId: number; teamCode: string }) || {};

  useEffect(() => {
    if (!teamId || !teamCode) {
      // navigate(redirectPath);
    }
  }, [teamId, teamCode, navigate, redirectPath]);

  return { teamId, teamCode };
};
