import OnBoardingWrapper from '@components/Login/OnBoardingWrapper';
import Signup from '@components/SignUp/Signup';
import Login from '@components/Login/Login';

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
