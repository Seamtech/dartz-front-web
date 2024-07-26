import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../../pages";
import ErrorBoundary from "../errors/ErrorBoundary";
import Loading from "../loading/Loading";
import ErrorPage from '../../pages/error/ErrorPage';


const LoginPage = lazy(() => import("../../pages").then(module => ({ default: module.LoginPage })));
const DashboardPage = lazy(() => import("../../pages").then(module => ({ default: module.DashboardPage })));
const SignupPage = lazy(() => import("../../pages").then(module => ({ default: module.SignupPage })));
const RulesPage = lazy(() => import("../../pages").then(module => ({ default: module.RulesPage })));
const LeaderboardsPage = lazy(() => import("../../pages").then(module => ({ default: module.LeaderboardsPage })));
const TournamentsPage = lazy(() => import("../../pages").then(module => ({ default: module.TournamentsPage })));
const TournamentDetailsPage = lazy(() => import("../../pages").then(module => ({ default: module.TournamentDetailsPage })));
const MyAccountPage = lazy(() => import("../../pages").then(module => ({ default: module.MyAccountPage })));
const ZLeaguePage = lazy(() => import("../../pages").then(module => ({ default: module.ZLeaguePage })));
const TravelLeaguesPage = lazy(() => import("../../pages").then(module => ({ default: module.TravelLeaguesPage })));
const ZChallengesPage = lazy(() => import("../../pages").then(module => ({ default: module.ZChallengesPage })));
const AdminLandingPage = lazy(() => import("../../pages").then(module => ({ default: module.AdminLandingPage })));
const CreateTournamentPage = lazy(() => import("../../pages").then(module => ({ default: module.CreateTournamentPage })));
const FindPlayerPage = lazy(() => import("../../pages").then(module => ({ default: module.FindPlayerPage })));
const PlayerProfilePage = lazy(() => import("../../pages").then(module => ({ default: module.PlayerProfilePage })));
const Logout = lazy(() => import("../../user/Logout"));

const AppRoutes = () => (
  <ErrorBoundary>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/players/find-player" element={<FindPlayerPage />} />
        <Route path="/players/playerProfile" element={<PlayerProfilePage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
        <Route path="/myaccount" element={<MyAccountPage />} />

        <Route path="/admin" element={<AdminLandingPage />} />
        <Route path="/admin/tournaments" element={<CreateTournamentPage />} />
        <Route
          path="/admin/tournaments/create-tournament"
          element={<CreateTournamentPage />}
        />

        <Route path="/league/z-league" element={<ZLeaguePage />} />
        <Route path="/league/travel-leagues" element={<TravelLeaguesPage />} />
        <Route path="/league/league-challenges" element={<ZChallengesPage />} />

        <Route path="/tournaments" element={<TournamentsPage />} />
        <Route
          path="/tournaments/:tournamentId"
          element={<TournamentDetailsPage />}
        />
      </Routes>
    </Suspense>
  </ErrorBoundary>
);

export default AppRoutes;
