// FindPlayerPage.js
import React, { useState } from 'react';
import playerService from '../../../../services/playerService'; // Ensure correct import path
import FindPlayerForm from './FindPlayerForm'; // Adjust import path as necessary
import PlayerProfile from './PlayerProfile'; // Adjust import path as necessary

const FindPlayerPage = () => {
  const [player, setPlayer] = useState(null);
  const [searchFailed, setSearchFailed] = useState(false);

  const handleSearch = async (searchCriteria) => {
    try {
      const result = await playerService.findPlayer(searchCriteria.searchValue);
      if (result) {
        setPlayer(result);
        setSearchFailed(false); // Reset search failed state on successful find
      } else {
        setPlayer(null);
        setSearchFailed(true); // Indicate search failure if no player found
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchFailed(true);
    }
  };

  return (
    <main className="main-content">
      <h1>Player Lookup</h1>
      <section className="content-box">
        <FindPlayerForm onSearch={handleSearch} />
        {searchFailed ? (
          <div>No player found. Please try a different search.</div>
        ) : player ? (
          <PlayerProfile player={player} />
        ) : null}
      </section>
    </main>
  );
};

export default FindPlayerPage;
