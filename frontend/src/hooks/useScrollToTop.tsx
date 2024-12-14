import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollToTop() {
  const { pathname } = useLocation();


  useLayoutEffect(() => {
    window.scrollTo(0, 800);
  }, [pathname]);
}
