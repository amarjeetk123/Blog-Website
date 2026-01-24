import { useLocation } from "react-router-dom";

export const useCurrentURL = () => {
  const location = useLocation();

  return {
    fullUrl: location.pathname + location.search,
    pathname: location.pathname,
    query: location.search,
    hash: location.hash,
  };
};