import styled, { keyframes } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import firstSwiperImage from '@assets/login/onboarding-frame-1.png';
import secondSwiperImage from '@assets/login/onboarding-frame-2.png';
import thirdSwiperImage from '@assets/login/onboarding-frame-3.png';
import LogoImage from '@assets/login/project-logo.svg';
import KakaoLogo from '@assets/login/kakao-logo.svg';
import NaverLogo from '@assets/login/naver-logo.svg';
import 'swiper/css';
import 'swiper/css/autoplay';

// 페이드 인 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 배경 스타일
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;
  background-color: #f9fbff;
`;

// 전체 Wrapper 스타일
const Wrapper = styled.div`
  width: 1094px;
  height: 577px;
  display: flex;
  border-radius: 24px;
  box-shadow:
    7.6px 2.28px 16.72px 0px #0000001a,
    28.88px 9.12px 30.4px 0px #00000017,
    65.36px 20.52px 41.04px 0px #0000000d,
    117.04px 36.48px 48.64px 0px #00000003,
    182.4px 57px 53.2px 0px #00000000;
`;

// 이미지 슬라이더 Wrapper 스타일
const OnBoardingImagesWrapper = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 24px 0px 0px 24px;
  overflow: hidden;
`;

// 슬라이더 이미지 스타일
const SwiperImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  animation: ${fadeIn} 1s forwards;
`;

// 로그인 영역 스타일
const OnBoardingLogin = styled.div`
  width: 50%;
  height: 100%;
  background-color: white;
  border-radius: 0px 24px 24px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 텍스트 및 버튼 컨테이너 스타일
const OnBoardingTextDiv = styled.div`
  margin-top: 110px;
  text-align: center;

  & > p {
    margin-top: 18px;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    color: #000;
  }

  & > p:nth-of-type(2) {
    margin-top: 9px;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #5a5a5a;
  }
`;

// 공통 버튼 스타일
const Button = styled.button`
  border: 0;
  border-radius: 8px;
  width: 365px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: 49px;
  cursor: pointer;

  &:first-of-type {
    background-color: #fee500;
  }

  &:last-of-type {
    background-color: #03c75a;
    color: white;
    margin-top: 9px;
  }
`;

// 버튼 텍스트 스타일
const ButtonText = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
`;

const OnBoarding = () => {
  return (
    <Background>
      <Wrapper>
        <OnBoardingImagesWrapper>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
          >
            <SwiperSlide>
              <SwiperImage src={firstSwiperImage} alt="first-swiper-image" />
            </SwiperSlide>
            <SwiperSlide>
              <SwiperImage src={secondSwiperImage} alt="second-swiper-image" />
            </SwiperSlide>
            <SwiperSlide>
              <SwiperImage src={thirdSwiperImage} alt="third-swiper-image" />
            </SwiperSlide>
          </Swiper>
        </OnBoardingImagesWrapper>
        <OnBoardingLogin>
          <OnBoardingTextDiv>
            <LogoImage />
            <p>팀매니저에 오신 것을 환영해요!</p>
            <p>누구나 손쉬운 팀 관리, 함께 해볼까요?</p>
            <Button>
              <KakaoLogo />
              <ButtonText>카카오로 1초만에 시작하기</ButtonText>
            </Button>
            <Button>
              <NaverLogo />
              <ButtonText>네이버로 1초만에 시작하기</ButtonText>
            </Button>
          </OnBoardingTextDiv>
        </OnBoardingLogin>
      </Wrapper>
    </Background>
  );
};

export default OnBoarding;
