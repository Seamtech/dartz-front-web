import {users} from '../../data/';
// Simulate a fake delay and response for development/testing purposes
const fakeDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



const signup = async (userData) => {
  await fakeDelay(500); // Simulate network delay
  const exists = users.some(user => user.email === userData.email);
  if (exists) {
    throw new Error("User already exists");
  }
  // Simulate user creation and return a mock response
  return { message: "User created successfully", user: { ...userData, token: "fakeSignupToken456" } };
};

const login = async ({ email, password }) => {
  //console.log(users);
  console.log('Auth Service is running')
  await fakeDelay(500); // Simulate network delay
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  // Return a mock response similar to what you'd expect from your real service
  console.log('success')
  return { user: {id: user.id, email: user.email, name: user.name }, token: 'fakeTOKEN123123' };
};

const logout = async () => {
  await fakeDelay(500); // Simulate network delay
  // Simulate a logout process
  return { message: "User logged out successfully" };
};

const mockAuthService = {
  signup,
  login,
  logout
};

export default mockAuthService;
