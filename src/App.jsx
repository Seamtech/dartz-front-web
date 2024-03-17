import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header, Footer, CustomBreadcrumb } from "./components/global";
import { LandingPage } from "./components/pages/landing-page";
import { SignupPage } from "./components/pages/signup-page";
import { LoginPage } from "./components/pages/login-page";
import Logout from "./components/user/Logout";
import { DashboardPage } from "./components/pages/dashboard-page";
import {
  FindPlayerPage,
  PlayerProfile,
} from "./components/pages/players/find-player-page";
import { RulesPage } from "./components/pages/rules-page";
import { LeaderboardsPage } from "./components/pages/leaderboards";
import { SocketProvider } from "./contexts/SocketContext";
import { TournamentsPage } from "./components/pages/tournaments/tournaments-page";
import { TournamentDetailsPage } from "./components/pages/tournaments/tournament-details-page";
import { Container } from "react-bootstrap";
import { MyAccountPage } from "./components/pages/account";
//import ZLeaguesPage from './components/pages/ZLeague/ZLeaguePage';

//import ChatPage from './components/pages/ChatPage';

//import PlayerDetailPage from './components/pages/Players/PlayerProfilePage/PlayerProfilePage';
//import './App.css';
import "./assets/styles/variables.css";
import "./assets/styles/base.css";
import "./assets/styles/utilities.css";
import "./assets/styles/global.css";
import "./assets/styles/forms.css";

const App = () => (
  <SocketProvider>
    <Router>
      <Header />
      <CustomBreadcrumb />
      <Container className="app-container">

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/players/find-player" element={<FindPlayerPage />} />
          <Route path="/players/playerProfile" element={<PlayerProfile />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/account" element={<MyAccountPage />} />
          <Route
            path="/tournaments/:tournamentId"
            element={<TournamentDetailsPage />}
          />
          {/* <Route path="/chat" element={<ChatPage />} /> */}
          {/* <Route exact path="/players" element={<FindPlayerPage />} /> */}
          {/* <Route path="/players/:playerID" element={<PlayerDetailPage />} /> */}
          {/* <Route path="/zleagues" element={<ZLeaguesPage />} /> */}
        </Routes>
      </Container>
      <Footer />
    </Router>
  </SocketProvider>
);
export default App;
