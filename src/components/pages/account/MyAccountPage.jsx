import React from 'react';
import { Link } from 'react-router-dom';

// Import your future components here
// Example: import PersonalInfo from './components/PersonalInfo';

const MyAccountPage = () => {
  // This could be fetched from the redux store
  const userName = 'John Doe';

  return (
    <main className="my-account-main-content">
      <div className="my-account-page">
        <h1>Welcome, {userName}!</h1>
        <div className="account-sections">
          {/* Personal Information Section */}
          <section className="content-box">
            <h2>Personal Information</h2>
            <p>View and update your personal information like name, email, and contact details.</p>
            {/* Placeholder for PersonalInfo component */}
            {/* <PersonalInfo /> */}
          </section>

          {/* Security Settings Section */}
          <section className="content-box">
            <h2>Security Settings</h2>
            <p>Change your password, set up two-factor authentication, and manage other security settings.</p>
            {/* Placeholder for SecuritySettings component */}
            {/* <SecuritySettings /> */}
          </section>

          {/* Order History Section */}
          <section className="content-box">
            <h2>Order History</h2>
            <p>Review your past orders and their statuses.</p>
            {/* Placeholder for OrderHistory component */}
            {/* <OrderHistory /> */}
          </section>

          {/* Payment Methods Section */}
          <section className="content-box">
            <h2>Payment Methods</h2>
            <p>Manage your saved payment methods.</p>
            {/* Placeholder for PaymentMethods component */}
            {/* <PaymentMethods /> */}
          </section>

          {/* Addresses Section */}
          <section className="content-box">
            <h2>Addresses</h2>
            <p>Manage your billing and shipping addresses.</p>
            {/* Placeholder for Addresses component */}
            {/* <Addresses /> */}
          </section>

          {/* Account Activity Section */}
          <section className="content-box">
            <h2>Account Activity</h2>
            <p>View your login history and account activities.</p>
            {/* Placeholder for AccountActivity component */}
            {/* <AccountActivity /> */}
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
