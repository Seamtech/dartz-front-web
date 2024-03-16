import React from 'react';
import { Container } from 'react-bootstrap';
const RulesPage = () => {
  return (
    <Container as="main" className="main-content">
              <h1 className="sovjet-page-heading">DartZ Rules</h1>
      <section className="content-box">
          <h3 className="sovjet-section-heading">Registration and Tournament Start</h3>
          <hr  />
            <li>Tournaments and Leagues have applicable Administration Fees to cover overhead costs.</li>
            <li>All tournament fees are subtracted from payouts except where stated otherwise.</li>
            <li>Registration for a tournament opens 7 days from it's scheduled start time.</li>
            <li>Check-In starts 2 hours before a tournament. A players payment, if applicable, is processed at check-in.</li>
            <li>For Team events, all players must check-in. Payments are processed once the entire team has checked in.</li>
            <li>Signups close at the tournaments' officially stated registration closing time. Subject to change via postponement or cancellation at director.</li>
            <li>Player payments are processed as soon as the entire team has checked in.</li>
            <li>Payment rejection will result in your check in to cancel. The team will not be charged until the player is either replaced or their payment issue fixed.</li>
            <li>It is beneficial for a team to check-in as soon as possible to ensure time to fix any potential issues. Tournaments will not be held up to accomodate issues with check in.</li>
            <li>All Tournaments will require a minimum of 8 teams to start. If 8 teams are not registered by registration closing, the tournament will be canceled.</li>
    </section>
    <section className="content-box">
          <h3 className="sovjet-section-heading">Z-League Structure</h3>
            <hr />
            <li>Z-League is a round-robin style competition with players grouped into 6-person brackets based on their Z-rating.</li>
            <li>Each player plays every other player in their bracket once, totaling to 5 matches per player per season.</li>
            <li>Each match consists of 10 games: 5 games of 501 and 5 games of Cricket. The total score of these games determines the match winner.</li>
            <li>Players earn 1 point for each game won within a match. An additional 2 bonus points are awarded for winning a match, and 1 bonus point is given for completing all season matches.</li>
            <li>Players are required to start their first match within 10 days of the season start, or they risk disqualification.</li>
            <li>All matches must be completed by the 6-week deadline.</li>
            <li>The top two players from each bracket in each level/division qualify for the Z-Championship, a double elimination tournament.</li>
    </section>
    <section className="content-box">
          <h3 className="sovjet-section-heading">Handicapping</h3>
            <li>DartZ uses a proprietary rating system for both Player ratings and Z ratings.</li>
            <li>Events may be handicapped or not handicapped. The handicap style, if applicable, will be stated in the tournament rules.</li>
            <li>DartZ will use either Spot Points or Spot Darts for handicapping.</li>
            <li>A player does not obtain a Z rating until they have played 100 tournament matches.</li>
            <li>Players without a Z rating will use a Player Rating until the minimum threshold has been met.</li>
            <li>Players who shoot (INSERT THRESHOLD HERE) their Player Rating in a tournament will be disqualified and denied any payouts. We understand players have good nights, but you MUST report your known ability as accurately as possible.</li>
    </section>
    <section className="content-box">
          <h3 className="sovjet-section-heading">Team Cap and Restrictions</h3>
            <li>Reating Cap Info...</li>
</section>
<section className="content-box">
          <h3 className="sovjet-section-heading">Connectivity and Camera Issues</h3>
            <li>Players are expected to arrive early and ensure constant and trouble-free internet connectivity for remote play.</li>
            <li>Camera problems: Address camera issues before starting the match. If the camera is not working, unplug the board and try again.</li>
            <li>Internet Problems: If connectivity issues with the boards persist and cannot be resolved before the tournament starts, players may be removed from the tournament with a refund.</li>
</section>
<section className="content-box">
          <h3 className="sovjet-section-heading">Disqualifications</h3>
            <li>If a player is unresponsive or unavailable for a scheduled match, they may be disqualified, awarding the opposing player a default win and corresponding points.</li>
            <li>Failure to complete all matches by the end of the season may lead to disqualification and will also result in the loss of the full participation bonus point.</li>
            </section>
<section className="content-box">
          <h3 className="sovjet-section-heading">Player Placement and Ratings</h3>
            <li>To ensure accurate placement, players need a minimum of 25 tournament games. The Z-rating, a measure of overall performance, is used for player placement.</li>
            <li>Z-ratings are updated after every match. Ties at the end of the season or in the championship tournament are decided based on the highest overall Z-rating.</li>
      </section>
      </Container>
  );
};

export default RulesPage;