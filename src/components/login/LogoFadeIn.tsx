import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Image = styled.img`
  opacity: 1;
  animation: ${fadeOut} 2s forwards;
`;

const LogoFadeIn = () => {
  return <Image src="/team-manager-logo.svg" alt="team-manager-logo" />;
};

export default LogoFadeIn;
