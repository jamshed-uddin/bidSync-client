import { useLocation } from "react-router-dom";

const useURLParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

export default useURLParams;
