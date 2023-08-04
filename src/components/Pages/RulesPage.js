import React from 'react';

const RulesPage = () => {
  return (
    <main className="main-content">
      <section className="rules-section">
        <h2 className="sovjet-content-heading">DartZ Rules</h2>
        <div className="rules-list">

          <h3 className="sovjet-section-heading">Registration and Tournament Start</h3>
          <ul>
            <li>Tournaments and Leagues have applicable Administration Fees to cover overhead costs.</li>
            <li>All tournament fees are subtracted from payouts except where stated otherwise.</li>
            <li>Signups close at the tournaments' officially stated registration closing time.</li>
            <li>Players' contact list will be available on the live brackets page of the website.</li>
            <li>Player payments will be processed as soon as the minimum player threshold is met.</li>
            <li>Payment rejection will result in your registration being canceled.</li>
            <li>All Tournaments will require a minimum of 8 teams to start. If 8 teams are not registered by registration closing, the tournament will be canceled.</li>
          </ul>

          <h3 className="sovjet-section-heading">Z-League Structure</h3>
          <ul>
            <li>Z-League is a round-robin style competition with players grouped into 6-person brackets based on their Z-rating.</li>
            <li>Each player plays every other player in their bracket once, totaling to 5 matches per player per season.</li>
            <li>Each match consists of 10 games: 5 games of 501 and 5 games of Cricket. The total score of these games determines the match winner.</li>
            <li>Players earn 1 point for each game won within a match. An additional 2 bonus points are awarded for winning a match, and 1 bonus point is given for completing all season matches.</li>
            <li>Players are required to start their first match within 10 days of the season start, or they risk disqualification.</li>
            <li>All matches must be completed by the 6-week deadline.</li>
            <li>The top two players from each bracket in each level/division qualify for the Z-Championship, a double elimination tournament.</li>
          </ul>

          <h3 className="sovjet-section-heading">Handicapping</h3>
          <ul>
            <li>DartZ uses a proprietary rating system for both Player ratings and Z ratings.</li>
            <li>Events may be handicapped or not handicapped. The handicap style, if applicable, will be stated in the tournament rules.</li>
            <li>DartZ will use either Spot Points or Spot Darts for handicapping.</li>
            <li>A player does not obtain a Z rating until they have played 100 tournament matches.</li>
            <li>Players without a Z rating will use a Player Rating until the minimum threshold has been met.</li>
            <li>Players who shoot > (INSERT THRESHOLD HERE) their Player Rating in a tournament will be disqualified and denied any payouts. We understand players have good nights, but you MUST report your known ability as accurately as possible.</li>
          </ul>

          <h3 className="sovjet-section-heading">Team Cap and Restrictions</h3>
          <ul>
            <li>Reating Cap Info...</li>
          </ul>

          <h3 className="sovjet-section-heading">Connectivity and Camera Issues</h3>
          <ul>
            <li>Players are expected to arrive early and ensure constant and trouble-free internet connectivity for remote play.</li>
            <li>Camera problems: Address camera issues before starting the match. If the camera is not working, unplug the board and try again.</li>
            <li>Internet Problems: If connectivity issues with the boards persist and cannot be resolved before the tournament starts, players may be removed from the tournament with a refund.</li>
          </ul>

          <h3 className="sovjet-section-heading">Disqualifications</h3>
          <ul>
            <li>If a player is unresponsive or unavailable for a scheduled match, they may be disqualified, awarding the opposing player a default win and corresponding points.</li>
            <li>Failure to complete all matches by the end of the season may lead to disqualification and will also result in the loss of the full participation bonus point.</li>
          </ul>

          <h3 className="sovjet-section-heading">Player Placement and Ratings</h3>
          <ul>
            <li>To ensure accurate placement, players need a minimum of 25 tournament games. The Z-rating, a measure of overall performance, is used for player placement.</li>
            <li>Z-ratings are updated after every match. Ties at the end of the season or in the championship tournament are decided based on the highest overall Z-rating.</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default RulesPage;