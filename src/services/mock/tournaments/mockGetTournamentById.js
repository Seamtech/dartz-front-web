// src/services/mock/tournaments/getTournamentById.js

import { tournaments } from '../../../data'; // Adjust the import path based on your project structure

/**
 * Simulates fetching a tournament by ID.
 * @param {number} tournamentId - The ID of the tournament to fetch.
 * @returns {Object|null} The tournament object if found, or null if not found.
 */
const getTournamentById = (tournamentId) => {
  const tournament = tournaments.find(t => t.id === parseInt(tournamentId));
  return tournament || null;
};

export default getTournamentById;
