import { useLocation } from 'react-router-dom';

export const useActivePath = () => {
  const location = useLocation();

  return location.pathname;
};
