import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuth = (params) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      // Perform actions based on the provided params
      if (params && params.action && params.value) {
        switch (params.action) {
          case 'redirect':
            navigate(params.value, { replace: true });
            break;
          case 'fetchUserInfo':
            // Assume fetchUserInfo is a function that fetches user info
            //fetchUserInfo();
            break;
          // Add more cases for different actions as needed
          default:
            console.warn('Unsupported action:', params.action);
        }
      }
    }
  }, [isLoggedIn, navigate, params]);

  // The hook could return isLoggedIn or any other info you might need
  return isLoggedIn;
};
export default useAuth;