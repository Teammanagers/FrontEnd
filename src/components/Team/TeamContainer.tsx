import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LeftArrow from '@assets/left-arrow.svg';
import { getTeamById } from '@apis/team/getTeamById';
import { useQuery } from '@tanstack/react-query';

type LayoutProps = {
  children: ReactNode;
};

const TeamContainer: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: team } = useQuery({
    queryKey: ['team'],
    queryFn: getTeamById
  });

  const teamTextByPath =
    team &&
    {
      '/team/create': '프로젝트를 위해 팀을 생성해 주세요',
      '/team/join': '팀 참가를 위해 코드를 입력해 주세요',
      '/team/share': '팀원의 참가를 위해 팀 코드를 공유해 주세요',
      '/team': `${team.result.name}님이 현재 진행하고 있는 팀 프로젝트에요!`
    }[location.pathname];

  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '600px',
          margin: '80px 0px 0px 80px'
        }}
      >
        <span>
          {location.pathname !== '/team' && (
            <div
              style={{ marginRight: '57px', cursor: 'pointer' }}
              onClick={() => navigate(-1)} // 이전 페이지로 이동
            >
              <LeftArrow />
            </div>
          )}
        </span>
        <span style={{ fontSize: '24px', lineHeight: '40px', fontWeight: 700 }}>
          {teamTextByPath}
        </span>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', width: '100%' }}>
        {children}
      </div>
    </>
  );
};

export default TeamContainer;
