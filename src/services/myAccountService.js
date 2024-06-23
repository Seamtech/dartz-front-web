import api from './api/apiService';

const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/updateProfile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);

    if (error.response && error.response.status === 409) {
      let field;
      const message = error.response.data.error.message;

      switch (message) {
        case 'Username already exists':
          field = 'username';
          break;
        case 'Email already exists':
          field = 'email';
          break;
        case 'Bullshooter code already exists':
          field = 'bsLiveCode';
          break;
        default:
          throw { message: 'Failed to update profile' };
      }

      throw { field, message };
    }

    throw { message: 'Failed to update profile' };
  }
};

const changePassword = async (passwordData) => {
  try {
    const response = await api.post('/change-password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);

    if (error.response && error.response.data && error.response.data.error) {
      const { message } = error.response.data.error;
      throw { message };
    }

    throw { message: 'Failed to change password' };
  }
};

export const myAccountService = {
  updateProfile,
  changePassword,
};

export default myAccountService;
