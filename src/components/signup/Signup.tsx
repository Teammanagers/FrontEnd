import styled from 'styled-components';
import Arrow from '@assets/left-arrow.svg';
import LogoImage from '@assets/login/project-logo.svg';
import Check from '@assets/login/check.svg';
import RightArrow from '@assets/login/right-arrow.svg';
import { ButtonHTMLAttributes, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubmitTerm } from '@hooks/useSubmitTerm';

const Signup = () => {
  const navigate = useNavigate();
  const [isTermsOfUseChecked, setIsTermsOfUseChecked] =
    useState<boolean>(false);
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] =
    useState<boolean>(false);

  const submitTerm = useSubmitTerm();

  const navigateToLogin = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const navigateToComplete = () => {
    if (isTermsOfUseChecked && isPrivacyPolicyChecked) {
      submitTerm.mutate({
        termsOfUse: isTermsOfUseChecked,
        privacyPolicy: isPrivacyPolicyChecked
      });
    }
  };

  const isButtonEnabled = isTermsOfUseChecked && isPrivacyPolicyChecked;

  const handleCheckboxClick = (
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <ArrowContainer>
        <LeftArrow onClick={navigateToLogin} />
      </ArrowContainer>
      <LogoWrapper>
        <LogoImage />
      </LogoWrapper>
      <TitleText>팀매니저를 이용하려면 약관에 동의가 필요해요</TitleText>
      <FormWrapper>
        <CheckboxSection
          checked={isTermsOfUseChecked}
          onCheckboxClick={() => handleCheckboxClick(setIsTermsOfUseChecked)}
          linkUrl="https://teammanagers.notion.site/7e7dceb62a6a438eb323a285f446a1c7?pvs=4"
          label1="필수"
          label2="이용약관 동의하기"
        />
        <Separator />
        <CheckboxSection
          checked={isPrivacyPolicyChecked}
          onCheckboxClick={() => handleCheckboxClick(setIsPrivacyPolicyChecked)}
          linkUrl="https://teammanagers.notion.site/b1b95614dbf745fc9add464a20025c44?pvs=4"
          label1="필수"
          label2="개인정보처리방침 동의하기"
        />
        <SignupButton
          disabled={!isButtonEnabled}
          backgroundColor={isButtonEnabled ? '#5c9eff' : '#cccccc'}
          onClick={navigateToComplete}
        >
          동의 후 가입하기
        </SignupButton>
      </FormWrapper>
    </>
  );
};

export default Signup;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const LeftArrow = styled(Arrow)<ButtonHTMLAttributes<HTMLButtonElement>>`
  margin-top: 48px;
  margin-left: 55px;
  cursor: pointer;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const TitleText = styled.span`
  font-weight: 500;
  font-size: 21px;
  line-height: 29px;
  color: #1d1d1d;
  margin-top: 18px;
  text-align: center;
`;

const FormWrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: 48px;
`;

const CheckboxSection = ({
  checked,
  onCheckboxClick,
  linkUrl,
  label1,
  label2
}: {
  checked: boolean;
  onCheckboxClick: () => void;
  linkUrl: string;
  label1: string;
  label2: string;
}) => (
  <CheckboxContainer>
    <Checkbox checked={checked} onClick={onCheckboxClick}>
      {checked && <CheckMark />}
    </Checkbox>
    <Label primary>{label1}</Label>
    <Label>{label2}</Label>
    <Link onClick={() => window.open(linkUrl, '_blank')}>전문보기</Link>
    <RightArrow />
  </CheckboxContainer>
);

const CheckboxContainer = styled.div`
  width: 437px;
  height: 27px;
  display: flex;
  align-items: center;
  margin-top: 25px;
  font-size: 16px;
  color: #1d1d1d;
`;

const Checkbox = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 76px;
  background-color: ${({ checked }) => (checked ? '#5C9EFF' : '#ccc')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CheckMark = styled(Check)`
  width: 24px;
  height: 24px;
  position: absolute;
`;

const Label = styled.span<{ primary?: boolean }>`
  margin-left: ${({ primary }) => (primary ? '19px' : '10px')};
  font-size: ${({ primary }) => (primary ? '18px' : '18px')};
  line-height: 27px;
  font-weight: 500;
  color: ${({ primary }) => (primary ? '#ff0000' : '#1d1d1d')};
  border-bottom: ${({ primary }) => (primary ? '1px solid #ff0000' : 'none')};
`;

const Link = styled.span`
  margin-left: auto;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
`;

const Separator = styled.div`
  width: 437px;
  height: 2px;
  background-color: #f0f0f0;
  margin-top: 25px;
`;

const SignupButton = styled.button<{ backgroundColor: string }>`
  cursor: pointer;
  width: 350px;
  height: 48px;
  margin-top: 48px;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  line-height: 23px;
  color: white;
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-weight: 700;
  &:disabled {
    cursor: not-allowed;
  }
`;
