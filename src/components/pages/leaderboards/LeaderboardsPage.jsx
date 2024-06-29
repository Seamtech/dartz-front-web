import React, { useState, useEffect } from 'react';
import { LeaderboardsSelector, LeaderboardsDisplay } from './';
import { leaderboardService } from '../../../services/leaderboards/leaderboardService'; // Adjust the import path as needed
import './LeaderboardsPage.css';

const leaderboardTypes = [
  { Name: 'Wins', field: 'total_games_won', endpointField: 'totalGamesWon' },
  { Name: 'PPD', field: 'ppd', endpointField: 'ppd' },
  { Name: 'MPR', field: 'mpr', endpointField: 'mpr' },
  { Name: 'Tournaments Won', field: 'tournaments_won', endpointField: 'tournamentsWon' },
  { Name: 'Tournaments Played', field: 'tournaments_played', endpointField: 'tournamentsPlayed' },
  { Name: 'Z Championships', field: 'z_championships', endpointField: 'zChampionships' },
  { Name: 'Z Rating', field: 'z_rating', endpointField: 'zRating' },
  { Name: 'Total Games Played', field: 'total_games_played', endpointField: 'totalGamesPlayed' },
  { Name: 'Total Games Lost', field: 'total_games_lost', endpointField: 'totalGamesLost' },
  { Name: 'Player Rating', field: 'player_rating', endpointField: 'playerRating' },
  { Name: 'Tournament Winnings', field: 'tournament_winnings', endpointField: 'tournamentWinnings' },
  { Name: 'Z Winnings', field: 'z_winnings', endpointField: 'zWinnings' },
  { Name: 'Total Winnings', field: 'total_winnings', endpointField: 'totalWinnings' },
  { Name: 'Z Seasons Played', field: 'z_seasons_played', endpointField: 'zSeasonsPlayed' }
];

const LeaderBoardsPage = () => {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState(leaderboardTypes[0]);
  const [leaderboardData, setLeaderboardData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchLeaderboardData = async (field) => {
    setLoading(true);
    try {
      const data = await leaderboardService.getLeaderboard(field);
      setLeaderboardData((prevData) => ({
        ...prevData,
        [field]: data,
      }));
    } catch (error) {
      console.error('Failed to fetch leaderboard data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!leaderboardData[selectedLeaderboard.field]) {
      fetchLeaderboardData(selectedLeaderboard.endpointField);
    }
  }, [selectedLeaderboard]);

  return (
    <main className="main-content">
      <h2 className="sovjet-page-heading">Leaderboards</h2>
      <div className="content-box">
        <h2 className="sovjet-content-heading">Select Type</h2>
        <LeaderboardsSelector
          leaderboardTypes={leaderboardTypes}
          selectedLeaderboard={selectedLeaderboard}
          onSelect={setSelectedLeaderboard}
        />
        <hr />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <LeaderboardsDisplay
            selectedLeaderboard={selectedLeaderboard}
            leaderboardData={leaderboardData[selectedLeaderboard.field] || []}
            leaderboardTypes={leaderboardTypes}
          />
        )}
      </div>
    </main>
  );
};

export default LeaderBoardsPage;
