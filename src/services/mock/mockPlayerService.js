import { users, user_statistics } from '../../data/'; // Import mock data
const fakeDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getPlayerDetails = async ({ type, value }) => {
    await fakeDelay(500); // Simulate delay for async operation
  
    let foundUser = null;
    switch (type) {
      case 'id':
        foundUser = users.find(user => user.id.toString() === value);
        break;
      case 'username':
        console.log('username', value)
        foundUser = users.find(user => user.username.toLowerCase() === value.toLowerCase());
        break;
      case 'name':
        const [firstName, lastName] = value.split(' ');
        foundUser = users.find(user =>
          user.first_name.toLowerCase() === firstName.toLowerCase() &&
          user.last_name.toLowerCase() === lastName.toLowerCase()
        );
        break;
      default:
        return null; // Invalid search type
    }
  
    if (!foundUser) {
      return null; // Return null if no user found
    }
  
    // Find corresponding statistics
    const statistics = user_statistics.find(stat => stat.user_id === foundUser.id);
  
    // Return both profile and statistics
    return {
      profile: foundUser,
      statistics: statistics || {} // Return an empty object if no statistics found
    };
  };

export const mockPlayerService = {
  getPlayerDetails,
};

export default mockPlayerService;
