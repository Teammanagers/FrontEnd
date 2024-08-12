import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LeftArrow from '@assets/left-arrow.svg';

type LayoutProps = {
  children: ReactNode;
};

const TeamContainer: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 페이지에 따라 표시할 팀 텍스트 설정
  const teamTextByPath = {
    '/team/create': '프로젝트를 위해 팀을 생성해 주세요',
    '/team/join': '팀 참가를 위해 코드를 입력해 주세요',
    '/team': 'OOO님이 현재 진행하고 있는 팀 프로젝트에요!'
  }[location.pathname];

  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '500px',
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
      {children}
    </>
  );
};

export default TeamContainer;
