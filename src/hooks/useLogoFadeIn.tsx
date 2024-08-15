import { useState, useEffect } from 'react';

const useLogoFadeIn = (delay: number) => {
  const [isLogoFadeInActivate, setIsLogoFadeInActivate] = useState(false);

  useEffect(() => {
    const hasLogoFadedIn = sessionStorage.getItem('hasLogoFadedIn');

    if (!hasLogoFadedIn) {
      setIsLogoFadeInActivate(true);
      const timer = setTimeout(() => {
        setIsLogoFadeInActivate(false);
        sessionStorage.setItem('hasLogoFadedIn', 'true');
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setIsLogoFadeInActivate(false);
    }
  }, [delay]);

  return isLogoFadeInActivate;
};

export default useLogoFadeIn;
