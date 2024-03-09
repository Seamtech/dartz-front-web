import { users, user_statistics } from '../../data/'; // Ensure correct import path
console.log('Player Service is running');
const fakeDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const findPlayer = async ({ type, value }) => {
  await fakeDelay(500);

  let player;
  if (type === 'id') {
    player = users.find(user => user.id === value);
  } else if (type === 'name') {
    player = users.find(user => `${user.first_name} ${user.last_name}`.toLowerCase() === value.toLowerCase());
  } else if (type === 'email') {
    player = users.find(user => user.email.toLowerCase() === value.toLowerCase());
  }

  if (player) {
    // Optionally, merge user statistics if needed
    const statistics = user_statistics.find(stat => stat.user_id.toString() === player.id);
    return { ...player, ...statistics };
  } else {
    return null;
  }
};

const mockPlayerService = {
  findPlayer,
};
export default mockPlayerService;
