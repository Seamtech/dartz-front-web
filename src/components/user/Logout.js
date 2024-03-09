import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/userSlice'; // Adjust the import path as necessary
import { persistor } from '../../redux/store'; // Adjust the import path as necessary
import authService from '../../services/authService'; // Adjust the import path as necessary

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await authService.logout(); // Call the backend API to logout
        dispatch(logout()); // Clear user state
        await persistor.purge(); // Optionally clear persisted state
        navigate('/login'); // Redirect to login page
      } catch (error) {
        console.error('Logout failed', error);
        // Handle any errors (e.g., show a message or log out locally regardless of backend success)
        navigate('/login'); // Redirect might still be desired to ensure local logout
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  // Optionally, return a simple message or spinner while the logout process completes
  return <div>Logging out...</div>;
};

export default Logout;
