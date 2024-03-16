// TournamentsPage.js
import React, { useRef, useEffect, useState } from "react";
//import {TournamentItem} from './TournamentItem';
import TournamentsList from "./TournamentsList";
import { tournaments } from "../../../../data/tournaments";
import { Container } from "react-bootstrap";

const TournamentsPage = () => {
  const [selectedType, setSelectedType] = useState("All");
  const singles = tournaments.filter((tournament) => tournament.type === "SingleZ"
  );
  const doubles = tournaments.filter((tournament) => tournament.type === "DoubleZ"
  );
  const trips = tournaments.filter((tournament) => tournament.type === "TripZ");
  const fours = tournaments.filter((tournament) => tournament.type === "FourZ");

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <Container className="main-content">
      <h1 className="sovjet-page-heading">Upcoming Tournaments</h1>
      <section className="content-box">
        <h2 className="sovjet-content-heading">Select Type</h2>
        <select value={selectedType} onChange={handleTypeChange}>
        <option value="All">All</option>
          <option value="SingleZ">SingleZ</option>
          <option value="DoubleZ">DoubleZ</option>
          <option value="TripZ">TripZ</option>
          <option value="FourZ">FourZ</option>
        </select>
      </section>
      <section className="content-box">
        <h2 className="sovjet-section-heading">{selectedType}</h2>
        {selectedType === "All" && (
          <TournamentsList tournaments={tournaments} />
        )}
        {selectedType === "SingleZ" && (
          <TournamentsList tournaments={singles} />
        )}
        {selectedType === "DoubleZ" && (
          <TournamentsList tournaments={doubles} />
        )}
        {selectedType === "TripZ" && <TournamentsList tournaments={trips} />}
        {selectedType === "FourZ" && <TournamentsList tournaments={fours} />}
      </section>
    </Container>
  );
};

export default TournamentsPage;
