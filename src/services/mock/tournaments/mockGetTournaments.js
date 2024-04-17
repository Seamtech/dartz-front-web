import {tournaments} from '../../../data'; // Adjust the import path based on your project structure

/**
 * Simulates fetching tournaments based on type.
 * @param {string} type - The type of tournaments to fetch ("All", "SingleZ", "DoubleZ", "TripZ", "FourZ").
 * @returns {Array} An array of tournament objects filtered by the specified type, or all tournaments if type is "All".
 */
const getTournaments = (type = 'All') => {
  const tournamentList = [...tournaments];
  // If type is 'All', return all tournaments
  if (type === 'All') {
    return tournamentList;
  }

  // Otherwise, filter tournaments by the specified type
  return tournamentList.filter(tournament => tournament.type === type);
};

export default getTournaments;
