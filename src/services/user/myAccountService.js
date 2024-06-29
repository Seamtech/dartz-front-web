import api from '../api/authApiService';

const updateProfile = async (profileData) => {
  try {
    const response = await api.patch('/edit-profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);

    if (error.response && error.response.status === 409) {
      let field;
      const message = error.response.data.error.message;
      console.log('message', message);
      switch (message) {
        case 'Username already exists.':
          field = 'username';
          break;
        case 'Email already exists.':
          field = 'email';
          break;
        case 'Bullshooter code already exists.':
          field = 'bsLiveCode';
          break;
        default:
          throw { message: 'Failed to update profile.' };
      }

      throw { field, message };
    }

    if (error.response && error.response.status === 404) {
      throw { message: 'Profile not found' };
    }

    if (error.response && error.response.status === 401) {
      throw { message: 'Unauthorized' };
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

const getMyProfile = async () => {
  try {
    const response = await api.get('/my-account');
    console.log('My Account Service Response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw { message: 'Failed to fetch profile' };
  }
};

export const myAccountService = {
  updateProfile,
  changePassword,
  getMyProfile,
};

export default myAccountService;
