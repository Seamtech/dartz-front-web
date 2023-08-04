import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main className="main-content">
        <h1 className="sovjet-page-heading">Welcome to DartZ!</h1>
        <p>DartZ is the ultimate platform for dart tournaments, leagues, and leaderboards. Unleash your competitive spirit and join the DartZ community today.</p>
        <Link className="cta-button" to="/signup">Get Started</Link>
      <div className="content-box">
        <h2 className="sovjet-content-heading">Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3 className="sovjet-section-heading">Tournaments</h3>
            <p>Participate in global dart tournaments, compete against other players, and climb the leaderboard.</p>
          </div>
          <div className="feature-item">
            <h3 className="sovjet-section-heading">Z Leagues</h3>
            <p>Join Z Leagues, our exclusive dart league format, for regular competition and consistent rankings.</p>
          </div>
          <div className="feature-item">
            <h3 className="sovjet-section-heading">Leaderboards</h3>
            <p>Track your progress and compare your scores against the DartZ community in our comprehensive leaderboards.</p>
          </div>
        </div>
        </div>
    </main>
  );
};

export default LandingPage;