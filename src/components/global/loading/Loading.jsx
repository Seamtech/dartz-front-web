import React, { useState, useEffect } from 'react';
import './Loading.css'; // CSS for the spinner
import { useNavigate } from 'react-router-dom';

const Loading = ({ timeout = 5000, redirect = true, errorMessage = "Something went wrong. Please try again later." }) => {
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasTimedOut(true);
    }, timeout); // Set the timeout duration

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [timeout]);

  useEffect(() => {
    if (hasTimedOut && redirect) {
      // Redirect to the error page if redirect is true
      navigate('/error');
    }
  }, [hasTimedOut, navigate, redirect]);

  return (
    <div className="loading-container">
      {!hasTimedOut ? (
        <>
          <div className="spinner spinner1"></div>
        </>
      ) : (
        !redirect && <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
};

export default Loading;
