import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header, Footer } from './components/global';
import { LandingPage } from './components/pages/landing-page';
import { SignupPage } from './components/pages/signup-page';
import { LoginPage } from './components/pages/login-page';
import Logout  from './components/user/Logout';
import { DashboardPage } from './components/pages/dashboard-page';
import {FindPlayerPage, PlayerProfile} from './components/pages/players/find-player-page/';
//import { } from './components/pages/Tournaments/TournamentsPage/TournamentsPage';
//import TournamentDetailsPage from './components/pages/Tournaments/TournamentDetailsPage/TournamentDetailsPage'
//import LeaderBoardsPage from './components/pages/Leaderboards/LeaderboardsPage';
//import ZLeaguesPage from './components/pages/ZLeague/ZLeaguePage';



//import ChatPage from './components/pages/ChatPage';

//import PlayerDetailPage from './components/pages/Players/PlayerProfilePage/PlayerProfilePage';
//import RulesPage from './components/pages/RulesPage/RulesPage';
//import './App.css';
import './assets/styles/variables.css'
import './assets/styles/base.css'
import './assets/styles/utilities.css'
import './assets/styles/global.css'
import './assets/styles/forms.css'



const App = () => (
  <div className="main-content">
    <Router>
      <Header />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/logout" element={<Logout />} /> 
          <Route path="/dashboard" element={<DashboardPage />} /> 
          <Route path="/players/findplayer" element={<FindPlayerPage />} /> 
          <Route path="/players/:id" element={<PlayerProfile />} />
          {/* <Route path="/chat" element={<ChatPage />} /> */}
          {/* <Route path="/tournaments" element={<TournamentsPage />} /> */}
          {/* <Route path="/tournaments/:tournamentId" element={<TournamentDetailPage />} /> */}
          {/* <Route exact path="/players" element={<FindPlayerPage />} /> */}
          {/* <Route path="/players/:playerID" element={<PlayerDetailPage />} /> */}
          {/* <Route path="/zleagues" element={<ZLeaguesPage />} /> */}
          {/* <Route path="/leaderboards" element={<LeaderboardsPage />} /> */}
          {/* <Route path="/rules" element={<RulesPage />} /> */}

        </Routes>
      </div>
      <Footer />
    </Router>
  </div>
);
export default App;