// FindPlayerPage.js
import React, { useState } from "react";
import playerService from "../../../../services/playerService"; // Ensure correct import path
import FindPlayerForm from "./FindPlayerForm"; // Adjust import path as necessary
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Container } from 'react-bootstrap';
const FindPlayerPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchFailed, setSearchFailed] = useState(false);

  const handleSearch = async (searchCriteria) => {
    try {
      const result = await playerService.getPlayerDetails(searchCriteria);
      if (result && result.profile.id) {
        // Assuming the search result includes an ID
        setSearchFailed(false);
        // Navigate using query parameters
        navigate(`/players/playerProfile?id=${result.profile.id}`);
      } else if (result && result.profile.username) {
        // a search can also provide a username
        setSearchFailed(false);
        navigate(`/players/playerProfile?username=${result.profile.username}`);
      } else {
        setSearchFailed(true);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchFailed(true);
    }
  };

  return (
    <main className="main-content">
      <Container className="form-container">
        <h3 className="sovjet-content-heading">Player Lookup</h3>
        <section className="content-box">
          <FindPlayerForm onSearch={handleSearch} />
          {searchFailed ? (
            <div>No player found. Please try a different search.</div>
          ) : null}
        </section>
      </Container>
    </main>
  );
};

export default FindPlayerPage;
