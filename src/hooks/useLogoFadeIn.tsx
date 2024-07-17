import { useState, useEffect } from 'react';

const useLogoFadeIn = (duration: number) => {
  const [isLogoFadeInActivate, setIsLogoFadeInActivate] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLogoFadeInActivate(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return isLogoFadeInActivate;
};

export default useLogoFadeIn;
