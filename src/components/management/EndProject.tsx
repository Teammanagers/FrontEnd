import styled from 'styled-components';
import People from '@assets/management/people.svg';
import End from '@assets/management/end-icon.svg';
import { useState } from 'react';
import { EndProjectModal } from '@components/management/EndProjectModal.tsx';

export const EndProject = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <EndProjectContainer>
      <PeopleImg />
      <TitleText>프로젝트가 완료되었나요?</TitleText>
      <ContentText>
        프로젝트 종료시, 그동안 고생한 팀원들에게 코멘트를 남길 수 있어요.
      </ContentText>
      <ContentText>이 프로젝트는 내 포트폴리오에 저장돼요.</ContentText>
      <EndBtn onClick={openModal}>
        <EndIcon />
        <BtnText>프로젝트 종료</BtnText>
      </EndBtn>
      {showModal && <EndProjectModal closeModal={closeModal} />}
    </EndProjectContainer>
  );
};

const EndProjectContainer = styled.div`
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
