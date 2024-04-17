import React from 'react';
import { useSelector } from 'react-redux';

const RightSideComponent = () => {
  const isLoggedIn = useSelector(state => Boolean(state.user.token));
  
  return (
    <div className=" content-box right-side-content">
      {/* Example content based on user state */}
      {isLoggedIn ? (
        <div>
          <h4>Live Matches</h4>
          {/* Logic to display live matches */}
        </div>
      ) : (
        <div>
          <h4>Featured Matches</h4>
          {/* Logic to display featured matches for non-logged-in users */}
        </div>
      )}
    </div>
  );
};

export default RightSideComponent;
