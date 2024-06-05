import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("auction")) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollTop;
