import SearchResultSection from '@components/team/SearchResultSection';
import TeamContainer from '@components/team/TeamContainer';
import { useGetTeamByCode } from '@hooks/team/useGetTeamByCode';
import { useValidatePassword } from '@hooks/team/useValidatePassword';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import styled from 'styled-components';

export const JoinTeamPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [codeInput, setCodeInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [teamCode, setTeamCode] = useState<string>('');
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);

  const validation = useValidatePassword();

  const { data, isLoading, isError } = useGetTeamByCode(
    teamCode,
    triggerFetch && !!teamCode
  );

  const handleChangeCode = (e) => {
    setCodeInput(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleClickJoinTeamButton = () => {
    setIsModalOpen(true);
  };

  const handleClickFindTeamButton = () => {
    setTeamCode(codeInput);
    setTriggerFetch(true);
  };

  const validatePassword = () => {
    if (data) {
      validation.mutate({
        teamId: data.result.team.teamId,
        teamCode: data.result.team.teamCode,
        password: passwordInput
      });
    }
  };

  console.log(validation, 'ㅎㅇ');
  return (
    <TeamContainer>
      {isModalOpen && (
        <Dialog.Root
          open={isModalOpen}
          onOpenChange={(open) => {
            open ? setIsModalOpen(true) : setIsModalOpen(false);
          }}
        >
          <Dialog.Portal>
            <DialogOverlay />
            <DialogContent>
              <DialogTitle>비밀번호</DialogTitle>
              <DialogDescription>
                <PasswordInput
                  onChange={handleChangePassword}
                  placeholder="참가를 위한 비밀번호를 입력해 주세요."
                />
                {validation.data && !validation.data.isSuccess && (
                  <span
                    style={{
                      marginTop: '12px',
                      fontWeight: 400,
                      fontSize: '12px',
                      color: '#FF0000'
                    }}
                  >
                    {validation.data.message}
                  </span>
                )}
                <JoinTeamButton
                  active={!!passwordInput}
                  onClick={validatePassword}
                >
                  팀 참가하기
                </JoinTeamButton>
              </DialogDescription>
            </DialogContent>
          </Dialog.Portal>
        </Dialog.Root>
      )}
      <MainContent>
        <Label>Team code</Label>
        <Input
          onChange={handleChangeCode}
          placeholder="참가하려는 팀 코드를 입력해주세요."
        />
        <FindTeamButton
          onClick={handleClickFindTeamButton}
          disabled={!codeInput || isLoading}
          active={!!codeInput && !isLoading}
        >
          팀 찾기
        </FindTeamButton>
      </MainContent>
      {triggerFetch && (
        <TeamResult>
          <Label>탐색 결과</Label>
          {isError || !data?.isSuccess ? (
            <CenteredContainer>
              <ErrorMessage>해당 코드와 일치하는 팀이 없습니다.</ErrorMessage>
              <InfoMessage>코드를 다시 한번 확인해 주세요.</InfoMessage>
            </CenteredContainer>
          ) : (
            <>
              <SearchResultSection data={data} />
              <JoinTeamButton active onClick={handleClickJoinTeamButton}>
                팀 참여하기
              </JoinTeamButton>
              <InfoText>찾는 팀이 아닌가요?</InfoText>
              <InfoSubText>
                팀 코드를 확인하여 잘못된 부분을 수정해 주세요.
              </InfoSubText>
            </>
          )}
        </TeamResult>
      )}
    </TeamContainer>
  );
};

const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DialogContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 538px;
  padding: 24px 41px;
  background-color: white;
  border-radius: 8px;
`;

const DialogTitle = styled(Dialog.Title)`
  font-weight: 700;
  font-size: 15px;
  color: #1d1d1d;
  margin: 0;
`;

const DialogDescription = styled(Dialog.Description)`
  display: grid;
`;

const PasswordInput = styled.input`
  margin-top: 4px;
  padding: 13px 18px;
  line-height: 23px;
  border: 1px solid #cccccc;
  border-radius: 6px;
`;

const JoinTeamButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#5c9eff' : '#cccccc')};
  height: 48px;
  border-radius: 4px;
  margin-top: 24px;
  border: none;
  font-weight: 700;
  font-size: 15px;
  color: white;
  cursor: ${({ active }) => (active ? 'pointer' : 'auto')};
`;

const MainContent = styled.div`
  display: grid;
  margin: 95px auto 0;
  width: 536px;
  height: 147px;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 15px;
  color: #1d1d1d;
`;

const Input = styled.input`
  border-radius: 6px;
  border: 1px solid #cccccc;
  padding: 13px 18px;
  font-weight: 500;
  font-size: 15px;
  margin-top: 4px;
  line-height: 23px;
`;

const FindTeamButton = styled.button<{ active: boolean }>`
  margin-top: 23px;
  height: 48px;
  border: none;
  color: white;
  background-color: ${({ active }) => (active ? '#5c9eff' : '#cccccc')};
  font-weight: 700;
  font-size: 15px;
  border-radius: 4px;
  cursor: ${({ active }) => (active ? 'pointer' : 'auto')};
`;

const TeamResult = styled.div`
  display: grid;
  margin: 50px auto 0;
  width: 536px;
  height: 147px;
`;

const InfoText = styled.p`
  margin: 19px 0 0;
  font-weight: 500;
  font-size: 16px;
  color: #1d1d1d;
`;

const InfoSubText = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 12px;
`;

const CenteredContainer = styled.div`
  display: grid;
  place-content: center;
`;

const ErrorMessage = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 15px;
  color: #ff0000;
  line-height: 23px;
  text-align: center;
`;

const InfoMessage = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 15px;
  color: #1d1d1d;
  line-height: 23px;
  text-align: center;
`;
