import { users, user_statistics } from '../../data/'; // Adjust the import path as needed

const fakeDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getLeaderboard = async (field) => {
  await fakeDelay(500); // Simulate delay

  // First, sort user_statistics based on the field
  const sortedStatistics = [...user_statistics]
    .sort((a, b) => b[field] - a[field])
    .slice(0, 25); // Assuming you want the top 25

  // Then, join with users to include first name and last name
  const joinedData = sortedStatistics.map((stat, index) => {
    // Find the corresponding user by user_id
    const user = users.find(user => user.id === stat.user_id);
    return {
      ...stat,
      rank: index + 1, // Assign rank based on the sorted position
      username: user?.username || 'Unknown', // Use 'Unknown' if no user found
      first_name: user?.first_name || 'Unknown', // Use 'Unknown' if no user found
      last_name: user?.last_name || 'Unknown',
    };
  });

  console.log(joinedData); // For debugging, to see the output
  return joinedData;
};

export const mockLeaderboardService = {
  getLeaderboard,
};

export default mockLeaderboardService;
