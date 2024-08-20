import React, { useState } from 'react';
import styled from 'styled-components';
import TeamContainer from '@components/team/TeamContainer';
import { useCreatePassword } from '@hooks/team/useCreatePassword';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useEmptyTeamIdRedirect } from '@hooks/team/\buseEmptyTeamIdRedirect';

export const ShareTeamPage: React.FC = () => {
  const { teamCode, teamId } = useEmptyTeamIdRedirect();
  const [password, setPassword] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState<string | null>(null);
  const createPasswordMutation = useCreatePassword(teamId);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;

    if (/^[a-zA-Z0-9]*$/.test(newPassword) && newPassword.length <= 6) {
      setPassword(newPassword);
      setIsPasswordError(null);
    } else {
      setIsPasswordError(
        '비밀번호는 영어와 숫자 조합으로 최대 6자까지 입력 가능합니다.'
      );
    }
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (password && !isPasswordError) {
      createPasswordMutation.mutate({ teamId, password });
    }
  };

  return (
    <TeamContainer>
      <CodeContainer>
        <Label>Team code</Label>
        <div style={{ display: 'flex' }}>
          <Code>{teamCode}</Code>
          <CopyToClipboard text={teamCode} onCopy={handleCopy}>
            <CopyButton>팀 코드 복사</CopyButton>
          </CopyToClipboard>
        </div>
        {isCopied && <CopiedMessage>코드가 복사되었습니다!</CopiedMessage>}
      </CodeContainer>
      <PasswordContainer>
        <Label>비밀번호</Label>
        <PasswordInput
          type="text"
          placeholder="참가를 위한 비밀번호를 설정해 주세요"
          value={password}
          onChange={handlePasswordChange}
        />
        {isPasswordError && <ErrorText>{isPasswordError}</ErrorText>}
      </PasswordContainer>
      <NextButton
        disabled={!password || !!isPasswordError}
        onClick={handleSubmit}
      >
        워크 스페이스로 이동
      </NextButton>
    </TeamContainer>
  );
};

const Label = styled.label`
  font-size: 15px;
  font-weight: 700;
  color: #1d1d1d;
  margin-bottom: 4px;
`;

const CodeContainer = styled.div`
  width: 647px;
  height: 76px;
  margin-top: 95px;
  margin-left: 372px;
  margin-bottom: 20px;
`;

const Code = styled.span`
  width: 536px;
  flex: 1;
  padding: 13px 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 16px;
  color: #007bff;
  word-break: break-all;
  font-weight: 700;
  font-size: 15px;
`;

const CopyButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 9px 18px;
  cursor: pointer;
  font-weight: 700;
  font-size: 12px;
  width: 95px;
  height: 36px;
  margin: auto auto auto 16px;
`;

const CopiedMessage = styled.span`
  color: #5c9eff;
  font-size: 12px;
`;

const PasswordContainer = styled.div`
  width: 498px;
  height: 76px;
  margin-top: 24px;
  margin-left: 372px;
  margin-bottom: 20px;
`;

const PasswordInput = styled.input`
  width: 498px;
  padding: 13px 18px;
  height: 22.5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #1d1d1d;
  word-break: break-all;
  font-weight: 500;
  font-size: 15px;
`;

const NextButton = styled.button`
  margin-left: 372px;
  margin-top: 48px;
  width: 536px;
  height: 48px;
  background-color: #5c9eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;

  &:disabled {
    background-color: #d6d6d6;
  }
`;

const ErrorText = styled.span`
  color: #ff0000; /* 빨간색으로 에러 강조 */
  font-size: 12px;
  margin-top: 8px;
  display: block;
`;
