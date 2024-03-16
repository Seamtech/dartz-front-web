// src/services/mock/tournaments/registerForTournament.js

/**
 * Simulates registering for a tournament.
 * @param {string} tournamentId - The ID of the tournament.
 * @param {Object} registrationData - The registration details.
 * @returns {Promise<Object>} A promise that resolves to the registration confirmation.
 */
const registerForTournament = async (tournamentId, registrationData) => {
  console.log(`Mock registering for tournament ${tournamentId} with data:`, registrationData);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate successful registration response
  return {
    success: true,
    message: `Successfully registered for tournament ${tournamentId}`,
    data: registrationData, // Echo back the registration data for confirmation
  };
};

export default registerForTournament;
