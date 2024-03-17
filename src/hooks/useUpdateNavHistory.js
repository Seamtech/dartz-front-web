import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pushToHistory } from '../redux/slices/navigationSlice';

const useUpdateNavHistory = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useSelector(state => state.breadcrumb.history);

  useEffect(() => {
    // Check if the current path is already in the history to avoid duplicates
    if (!history.includes(location.pathname)) {
      dispatch(pushToHistory(location.pathname));
    }
  }, [location, dispatch, history]);
};

export default useUpdateNavHistory;
