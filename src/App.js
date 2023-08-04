import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/Pages/LandingPage';
import TournamentsPage from './components/Pages/TournamentsPage';
import LeaderboardsPage from './components/Pages/LeaderboardsPage';
import ZLeaguesPage from './components/Pages/ZLeague/ZLeaguePage';
import SignupPage from './components/Pages/SignupPage';
import LoginPage from './components/Pages/LoginPage';
import TournamentDetailPage from './components/Pages/TournamentDetailPage'
import ChatPage from './components/Pages/ChatPage';
import FindPlayerPage from './components/Pages/FindPlayerPage';
import PlayerDetailPage from './components/Pages/PlayerDetailPage';
import RulesPage from './components/Pages/RulesPage';
import './App.css';
// import other page components



const App = () => (
  <div className="app-container">
    <Router>
      <Header />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/tournaments/:tournamentId" element={<TournamentDetailPage />} />
          <Route exact path="/players" element={<FindPlayerPage />} />
        <Route path="/players/:playerID" element={<PlayerDetailPage />} />
          <Route path="/zleagues" element={<ZLeaguesPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  </div>
);

export default App;