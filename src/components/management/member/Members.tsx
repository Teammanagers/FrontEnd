import styled from 'styled-components';
import { TitleText } from '@components/management/team-code/TeamCode.tsx';
import { Member } from '@components/management/member/Member.tsx';

export const Members = () => {
  return (
    <MembersContainer>
      <TitleText>Member</TitleText>
      <MemberContainer>
        <Member />
        <Member />
        <Member />
        <Member />
      </MemberContainer>
    </MembersContainer>
  );
};

const MembersContainer = styled.div`
  width: 1012px;
  height: 184px;
  display: flex;
  flex-direction: column;
  margin-top: 22px;
`;

const MemberContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 10px;
`;
