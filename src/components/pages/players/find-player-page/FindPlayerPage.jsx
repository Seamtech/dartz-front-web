import React, { useState } from "react";
import playerService from "../../../../services/playerService"; // Ensure correct import path
import FindPlayerForm from "./FindPlayerForm"; // Adjust import path as necessary
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ThreeColumnLayout from "../../../global/three-column-layout/ThreeColumnLayout"; // Import your custom three-column layout component

const FindPlayerPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchFailed, setSearchFailed] = useState(false);

  const handleSearch = async (searchCriteria) => {
    try {
      const result = await playerService.getPlayerDetails(searchCriteria);
      if (result && result.profile.id) {
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
    <ThreeColumnLayout>
      <h2 className="sovjet-page-heading">Find a Player</h2>
      {searchFailed && (
        <div className="error-message">
          No player found. Please try a different search.
        </div>
      )}
      <FindPlayerForm onSearch={handleSearch} />
    </ThreeColumnLayout>
  );
};

export default FindPlayerPage;
