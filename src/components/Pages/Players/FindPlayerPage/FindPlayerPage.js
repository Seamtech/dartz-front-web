import React, { useState } from "react";
//import { users } from "../../data/users";
//import { user_statistics } from "../../data/user_statistics";
import { Link, useParams } from "react-router-dom";
const users = [];
const user_statistics = [];
const PlayersPage = () => {
  const [searchType, setSearchType] = useState("id");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    let result = users.filter(
      (profile) =>
        profile[searchType].toString().toLowerCase() ===
        searchValue.toLowerCase()
    );
    setSearchResult(result);
  };

  const getPlayerStatistics = (player) => {
    const statistics = user_statistics.find(
      (statistics) => statistics.user_id.toString() === player.id
    );
    return statistics ? (
      <table>
        <tbody>
          <th colSpan="2">
            <Link className="player-lookup-link" to={`/players/${player.id}`}>
              {player.first_name} {player.last_name}
            </Link>
          </th>
          <tr>
            <td>ID:</td>
            <td>{player.id}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{player.email}</td>
          </tr>
          <tr>
            <td>Mobile Number:</td>
            <td>{player.mobile_number}</td>
          </tr>
          <tr>
            <td>State:</td>
            <td>{player.state}</td>
          </tr>
          <tr>
            <td>Default Location:</td>
            <td>{player.default_location}</td>
          </tr>
          <tr>
            <td>Total Games Played:</td>
            <td>{statistics.total_games_played}</td>
          </tr>
          <tr>
            <td>Total Games Won:</td>
            <td>{statistics.total_games_won}</td>
          </tr>
          <tr>
            <td>Total Games Lost:</td>
            <td>{statistics.total_games_lost}</td>
          </tr>
          <tr>
            <td>PPD:</td>
            <td>{statistics.ppd}</td>
          </tr>
          <tr>
            <td>MPD:</td>
            <td>{statistics.mpd}</td>
          </tr>
          <tr>
            <td>Z Rating:</td>
            <td>{statistics.z_rating}</td>
          </tr>
          <tr>
            <td>Player Rating:</td>
            <td>{statistics.player_rating}</td>
          </tr>
        </tbody>
      </table>
    ) : null;
  };

  return (
    <main className="main-content">
      <h1 className="sovjet-page-heading">Player Lookup</h1>
      <section className="content-box">
        <h2 className="sovjet-content-heading">Search</h2>
        <div className="players-search">
          <select
            className="players-select-input"
            onChange={handleSearchTypeChange}
          >
            <option value="id">ID</option>
            <option value="first_name">Name</option>
            <option value="email">Email</option>
          </select>
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchValueChange}
            className="players-text-input"
          />
          <button onClick={handleSearch} className="players-button">
            Search
          </button>
        </div>
        <div className="players-list">
          {searchResult.map((player) => (
            <div key={player.id}>
              {getPlayerStatistics(player)}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PlayersPage;
