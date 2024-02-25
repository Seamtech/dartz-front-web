import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header, Footer } from './components/Global';
import { LandingPage } from './components/Pages/LandingPage';
import { SignupPage } from './components/Pages/SignupPage';
//import { } from './components/Pages/Tournaments/TournamentsPage/TournamentsPage';
//import TournamentDetailsPage from './components/Pages/Tournaments/TournamentDetailsPage/TournamentDetailsPage'
//import LeaderBoardsPage from './components/Pages/Leaderboards/LeaderboardsPage';
//import ZLeaguesPage from './components/Pages/ZLeague/ZLeaguePage';

//import LoginPage from './components/Pages/LoginPage/LoginPage';

//import ChatPage from './components/Pages/ChatPage';
//import FindPlayerPage from './components/Pages/Players/FindPlayerPage/FindPlayerPage';
//import PlayerDetailPage from './components/Pages/Players/PlayerProfilePage/PlayerProfilePage';
//import RulesPage from './components/Pages/RulesPage/RulesPage';
//import './App.css';
import './components/Styles/variables.css'
import './components/Styles/base.css'
import './components/Styles/utilities.css'
import './components/Styles/global.css'
import './components/Styles/forms.css'



const App = () => (
  <div className="app-container">
    <Router>
      <Header />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/chat" element={<ChatPage />} /> */}
          {/* <Route path="/tournaments" element={<TournamentsPage />} /> */}
          {/* <Route path="/tournaments/:tournamentId" element={<TournamentDetailPage />} /> */}
          {/* <Route exact path="/players" element={<FindPlayerPage />} /> */}
          {/* <Route path="/players/:playerID" element={<PlayerDetailPage />} /> */}
          {/* <Route path="/zleagues" element={<ZLeaguesPage />} /> */}
          {/* <Route path="/leaderboards" element={<LeaderboardsPage />} /> */}
          {/* <Route path="/rules" element={<RulesPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </div>
      <Footer />
    </Router>
  </div>
);

export default App;