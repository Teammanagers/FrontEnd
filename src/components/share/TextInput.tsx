import React from 'react';
import styled from 'styled-components';
import SendButton from '@assets/share/send-button.svg';

interface TextInputWithProps {
  placeholder: string;
  value: string;
  width?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

export const TextInput: React.FC<TextInputWithProps> = ({
  placeholder,
  value,
  width = '419.52px',
  onChange,
  onSubmit
}) => {
  return (
    <Container>
      <FeedbackTextarea
        placeholder={placeholder}
        value={value}
        width={width}
        onChange={onChange}
      />
      <SendButtonContainer onClick={onSubmit}>
        <SendButton />
      </SendButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 486.4px;
  height: 76px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FeedbackTextarea = styled.textarea<{ width: string }>`
  box-sizing: border-box;
  width: ${({ width }) => width};
  height: 76px;
  padding: 9.12px 12.16px;
  font-size: 14px;
  border: 0.76px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4.56px;
  background-color: white;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const SendButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
`;
