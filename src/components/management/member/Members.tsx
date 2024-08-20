import styled from 'styled-components';
import { TitleText } from '@components/management/team-code/TeamCode.tsx';
import { Member } from '@components/management/member/Member.tsx';
import { useEffect, useState } from 'react';
import { getMembers } from '@apis/management.ts';
import { MemberTypes } from '../../../types/member.ts';

export const Members = () => {
  const [members, setMembers] = useState<MemberTypes[]>([]);

  const fetchMembers = async () => {
    try {
      const response = await getMembers(1);
      setMembers(Array.isArray(response) ? response : []);
      // console.log(response);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
    // console.log(members);
  }, []);

  const refreshMembers = async () => {
    await fetchMembers();
  };

  return (
    <MembersContainer>
      <TitleText>Member</TitleText>
      <MemberContainer>
        {members.length > 0 ? (
          members.map((member) => (
            <Member
              key={member.memberId}
              name={member.name}
              refreshMembers={refreshMembers}
            />
          ))
        ) : (
          <p>이게 뜨면 잘못된것..</p>
        )}
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
  overflow-y: scroll;
  overflow-x: hidden;
`;
