import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to the top of the page on every route change, unless the URL
// carries a #hash (in which case Navigation.jsx handles scrolling to that section).
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
