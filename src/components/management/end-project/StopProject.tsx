import styled from 'styled-components';
import People from '@assets/management/stop-project-img.svg';
import End from '@assets/management/end-icon.svg';
import { useState } from 'react';
import { StopProjectModal } from '@components/management/end-project/StopProjectModal.tsx';

export const StopProject = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <StopProjectContainer>
      <PeopleImg />
      <TitleText>프로젝트가 완료되기 전에 팀을 나가시나요?</TitleText>
      <ContentText>팀장의 종료 이전에 팀을 나가면 포트폴리오에</ContentText>
      <ContentText>프로젝트 기록이 남지 않습니다.</ContentText>
      <EndBtn onClick={openModal}>
        <EndIcon />
        <BtnText>팀 나가기</BtnText>
      </EndBtn>
      {showModal && <StopProjectModal closeModal={closeModal} />}
    </StopProjectContainer>
  );
};

const StopProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PeopleImg = styled(People)`
  margin-top: 91px;
`;

const TitleText = styled.h1`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  margin: 37px 0 10px 0;
`;

const ContentText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 18px;
  margin: 0;
`;

const EndBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 118px;
  height: 103px;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.colors.red};
  margin-top: 19px;
  cursor: pointer;
`;

const EndIcon = styled(End)`
  width: 37px;
  height: 37px;
  margin-top: 19px;
`;

const BtnText = styled(ContentText)`
  color: ${({ theme }) => theme.colors.red};
`;
