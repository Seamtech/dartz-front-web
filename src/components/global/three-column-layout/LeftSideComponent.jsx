import React from 'react';
import { useSelector } from 'react-redux';

const LeftSideComponent = () => {
  const isLoggedIn = useSelector(state => Boolean(state.user.token));
  
  return (
    <div className="main-content-box left-side-content">
      {/* Example content based on user state */}
      {isLoggedIn ? (
        <div>
          <h4>Your Tournaments</h4>
          {/* Logic to display user's tournaments */}
        </div>
      ) : (
        <div>
          <h4>Welcome to DartZ!</h4>
          <p>Please log in to view your tournaments.</p>
        </div>
      )}
    </div>
  );
};

export default LeftSideComponent;
