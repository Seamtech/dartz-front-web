import React, { useState } from "react";
import FindPlayerForm from "./FindPlayerForm";
import { Link, useNavigate } from "react-router-dom";
import ThreeColumnLayout from "../../../global/three-column-layout/ThreeColumnLayout";
import playerService from "../../../../services/player/playerService";
import DataTable from "../../../global/table/DataTable";

const FindPlayerPage = () => {
  const navigate = useNavigate();
  const [searchFailed, setSearchFailed] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchCriteria) => {
    try {
      let result;
      if (searchCriteria.type === "name") {
        result = await playerService.getPlayerBasicDetails(searchCriteria);
        setSearchResults(result);
      } else {
        result = await playerService.getPlayerDetails(searchCriteria);
        if (result && result.length > 0) {
          setSearchFailed(false);
          const player = result[0];
          navigate(`/players/playerProfile`, { state: { player } });
        } else {
          setSearchFailed(true);
        }
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchFailed(true);
    }
  };

  const columns = [
    {
      field: 'username',
      headerName: 'Username',
      renderCell: (row) => (
        <Link to={`/players/playerProfile?username=${row.username}`}>
          {row.username}
        </Link>
      ),
    },
    { field: 'email', headerName: 'Email' },
    { field: 'mobileNumber', headerName: 'Mobile Number' },
    { field: 'id', headerName: 'Player ID' },
    { field: 'firstName', headerName: 'First Name' },
    { field: 'lastName', headerName: 'Last Name' },
  ];

  return (
    <ThreeColumnLayout>
      <h2 className="sovjet-page-heading">Find a Player</h2>
      {searchFailed && (
        <div className="error-message">
          No player found. Please try a different search.
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Multiple players found:</h3>
          <DataTable
            columns={columns}
            data={searchResults}
            hideColumnsOnMobile={[]}
            layoutType="table"
          />
        </div>
      )}
      <FindPlayerForm onSearch={handleSearch} />
    </ThreeColumnLayout>
  );
};

export default FindPlayerPage;
