import React, { useState } from "react";
import FindPlayerForm from "./FindPlayerForm";
import { useNavigate } from "react-router-dom";
import ThreeColumnLayout from "../../../global/three-column-layout/ThreeColumnLayout";
import playerService from "../../../../services/player/playerService";

const FindPlayerPage = () => {
  const navigate = useNavigate();
  const [searchFailed, setSearchFailed] = useState(false);

  const handleSearch = async (searchCriteria) => {
    try {
      const result = await playerService.getPlayerDetails(searchCriteria);
      if (result && result.length > 0) {
        setSearchFailed(false);
        const player = result[0];
        navigate(`/players/playerProfile`, { state: { player } });
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
