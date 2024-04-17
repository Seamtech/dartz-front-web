import { users } from "../../../data";
const getUserById = async (userId) => {

  
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find the user by ID
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  // Return only a subset of user information to match the live service interface

  return {
    success: true,
    message: "User information retrieved successfully",
    data: userData,
  };
};

export default getUserById;
