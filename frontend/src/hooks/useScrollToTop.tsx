import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollToTop() {
  const { pathname } = useLocation();

  console.log(pathname)

  useLayoutEffect(() => {
    window.scrollTo(0, 1000);
  }, [pathname]);
}
