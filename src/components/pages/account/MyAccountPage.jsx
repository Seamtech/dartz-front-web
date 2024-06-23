import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import DataTable from '../../global/table/DataTable';
import ThreeColumnLayout from '../../global/three-column-layout/ThreeColumnLayout';
import playerService from '../../../services/playerService';
import GlobalModal from '../../global/modal/GlobalModal';
import MyAccountProfileForm from './MyAccountProfileForm';
import MyAccountPasswordForm from './MyAccountPasswordForm';
import FormButton from '../../global/forms/FormButton';

const MyAccountPage = () => {
  const userId = useSelector((state) => state.user.userId); // Adjust according to your state structure
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchUserDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const details = await playerService.getPlayerDetails({ type: 'id', value: userId });
      if (details && details.length > 0) {
        const user = details[0];
        setUserInfo({
          userId: user.id,
          username: user.username,
          ...user.userProfile,
          email: user.email,
          ...user.userStatistics,
        });
      }
    } catch (err) {
      setError('An error occurred while fetching user details');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId, fetchUserDetails]);

  const profileColumns = [
    { field: 'username', headerName: 'Username' },
    { field: 'firstName', headerName: 'First Name' },
    { field: 'lastName', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'mobileNumber', headerName: 'Mobile Number' },
    { field: 'address1', headerName: 'Address 1' },
    { field: 'address2', headerName: 'Address 2' },
    { field: 'city', headerName: 'City' },
    { field: 'state', headerName: 'State' },
    { field: 'bsLiveCode', headerName: 'Bullshooter Code' },
  ];

  const statsColumns = [
    { field: 'totalGamesPlayed', headerName: 'Total Games Played' },
    { field: 'totalGamesWon', headerName: 'Total Games Won' },
    { field: 'totalGamesLost', headerName: 'Total Games Lost' },
    { field: 'ppd', headerName: 'PPD' },
    { field: 'mpd', headerName: 'MPD' },
    { field: 'zRating', headerName: 'Z Rating' },
    { field: 'playerRating', headerName: 'Player Rating' },
  ];

  const handleShowModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSuccessMessage('');
  };

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    fetchUserDetails(); // Refresh user info on success
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'profile':
        return <MyAccountProfileForm userInfo={userInfo} onClose={handleCloseModal} onSuccess={handleSuccess} />;
      case 'password':
        return <MyAccountPasswordForm onClose={handleCloseModal} onSuccess={handleSuccess} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <Container className="main-content"><div>Loading...</div></Container>;
  }

  if (error) {
    return <Container className="main-content"><div>{error}</div></Container>;
  }

  return (
    <ThreeColumnLayout>
      <main className="main-content">
        <h1 className="sovjet-page-heading">My Account</h1>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <section className="content-box">
          <h1 className="sovjet-content-heading">Profile Information</h1>
          <DataTable
            columns={profileColumns}
            data={userInfo ? [userInfo] : []}
            hideColumnsOnMobile={[]}
            layoutType="card"
          />
          <FormButton onClick={() => handleShowModal('profile')}>
            Edit Profile
          </FormButton>
          <FormButton variant="secondary" onClick={() => handleShowModal('password')}>
            Change Password
          </FormButton>
        </section>
        <section className="content-box">
          <h1 className="sovjet-content-heading">Statistics</h1>
          <DataTable
            columns={statsColumns}
            data={userInfo ? [userInfo] : []}
            hideColumnsOnMobile={[]}
            layoutType="card"
          />
        </section>
      </main>
      <GlobalModal
        title={modalType === 'profile' ? 'Edit Profile' : 'Change Password'}
        show={showModal}
        onClose={handleCloseModal}
        footerButtons={[
          {
            text: 'Close',
            onClick: handleCloseModal,
          },
        ]}
      >
        {renderModalContent()}
      </GlobalModal>
    </ThreeColumnLayout>
  );
};

export default MyAccountPage;
