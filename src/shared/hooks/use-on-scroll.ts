import { useState, useEffect } from 'react';

export const useOnScroll = () => {
  const [scrollYValue, setScrollYValue] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const onScroll = () => {
    const { scrollY } = window;
    setScrollYValue(scrollY);
    setIsDarkMode(scrollY <= 767);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { scrollYValue, isDarkMode };
};
