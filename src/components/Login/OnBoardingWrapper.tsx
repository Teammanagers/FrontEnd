import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import firstSwiperImage from '@assets/login/onboarding-frame-1.png';
import secondSwiperImage from '@assets/login/onboarding-frame-2.png';
import thirdSwiperImage from '@assets/login/onboarding-frame-3.png';

interface OnBoardingProps {
  children: React.ReactNode;
}

const OnBoardingWrapper = ({ children }: OnBoardingProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleDotClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
      setActiveIndex(index);
    }
  };

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
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
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
          <NavigationDots>
            {[0, 1, 2].map((index) => (
              <Dot
                key={index}
                isActive={index === activeIndex}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </NavigationDots>
        </OnBoardingImagesWrapper>
        <OnBoardingLogin>{children}</OnBoardingLogin>
      </Wrapper>
    </Background>
  );
};

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
  position: relative;
`;

// 이미지 슬라이더 Wrapper 스타일
const OnBoardingImagesWrapper = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 24px 0px 0px 24px;
  overflow: hidden;
  position: relative;
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
`;

// 슬라이드 네비게이션 버튼 스타일
const NavigationDots = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 20px; /* 버튼이 이미지 하단에 오도록 설정 */
  width: 100%;
  z-index: 10; /* 이미지 위로 표시되도록 설정 */
`;

const Dot = styled.button<{ isActive: boolean }>`
  width: ${({ isActive }) => (isActive ? '18px' : '9px')};
  height: 12px;
  border-radius: ${({ isActive }) => (isActive ? '76px' : '100%')};
  margin: 0 5px;
  background-color: #ffffff;
  border: none;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export default OnBoardingWrapper;
