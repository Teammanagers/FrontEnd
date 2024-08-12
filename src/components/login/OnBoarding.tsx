import OnBoardingWrapper from '@components/login/OnBoardingWrapper';
import Signup from '@components/signup/Signup';
import Login from '@components/login/Login';

interface OnBoardingProps {
  type: 'signin' | 'signup';
}

const OnBoarding = ({ type }: OnBoardingProps) => {
  return (
    <OnBoardingWrapper>
      {type === 'signin' ? <Login /> : <Signup />}
    </OnBoardingWrapper>
  );
};

export default OnBoarding;
