import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userService } from '../../../services'; // Adjust the import path as necessary

const MyAccountPage = () => {
  const userId = useSelector((state) => state.user.id); // Adjust according to your state structure
  const [userInfo, setUserInfo] = useState(null);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const userData = userService.getUserById(userId);
    if (userData) {
      setUserInfo(userData);
    }
  }, [userId]);

  const toggleEditable = () => {
    setEditable(!editable);
  };

  return (
    <main className="main-content">
      <div className="my-account-page">
        <h1 className="sovjet-page-heading">Welcome, {userInfo ? userInfo.first_name : 'User'}!</h1>
        <button onClick={toggleEditable}>{editable ? 'Save' : 'Edit'}</button>
        <div className="account-sections">
          {/* Personal Information Section */}
          <section className="content-box">
            <h2 className="sovjet-section-heading">Personal Information</h2>
            {editable ? (
              <form>
                {/* Replace input values with state and add onChange handlers as needed */}
                <input type="text" defaultValue={userInfo?.first_name} />
                <input type="text" defaultValue={userInfo?.last_name} />
                <input type="email" defaultValue={userInfo?.email} />
                <input type="tel" defaultValue={userInfo?.mobile_number} />
                {/* Add more fields as necessary */}
              </form>
            ) : (
              <p>
                Name: {userInfo?.first_name} {userInfo?.last_name}<br />
                Email: {userInfo?.email}<br />
                Mobile: {userInfo?.mobile_number}
                {/* Display more user details as needed */}
              </p>
            )}
          </section>
        </div>
        <div className="account-navigation">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </main>
  );
};

export default MyAccountPage;
