import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { roleBasedAccessService, tournamentService } from "../../../../services";
import { DataTable } from "../../../global";
import TournamentRegistrationForm from "./TournamentRegistrationForm"; // Make sure the import path is correct
import { Container } from "react-bootstrap";
import TournamentRegisteredPlayersList from "./TournamentRegisteredPlayersList"; // Make sure the import path is correct
import "./TournamentDetailsPage.css";
import ThreeColumnLayout from "../../../global/three-column-layout/ThreeColumnLayout";
const TournamentDetailsPage = () => {
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    // Assuming getTournamentById is an async function; adjust accordingly if it's not
    const fetchTournament = async () => {
      const fetchedTournament = await tournamentService.getTournamentById(tournamentId);
      setTournament(fetchedTournament);
    };

    fetchTournament();
  }, [tournamentId]);

  const tournamentFields = tournament
    ? Object.keys(tournament).map((key) => ({
        field: key,
        headerName: key.replace("_", " ").charAt(0).toUpperCase() + key.replace("_", " ").slice(1),
      }))
    : [];

  if (!tournament) {
    return <div>Loading tournament details...</div>; // or any other loading state representation
  }

  return (
    <ThreeColumnLayout>
              <h1 className="sovjet-page-heading">Tournament</h1>
      <section className="content-box">
        <h2 className="sovjet-content-heading">{tournament.name}</h2>
        <hr />
        <DataTable
          columns={tournamentFields}
          data={[tournament]}
          hideColumnsOnMobile={[]}
          layoutType="card"
        />
        {roleBasedAccessService.isLoggedIn() ? (
          <TournamentRegistrationForm
            tournamentType={tournament.type}
            onRegister={(formData) => {
              console.log("Form Data:", formData);
              // Handle registration logic here, possibly submitting to an API
            }}
          />
        ) : (
          <div>
            <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link> to register.
          </div>
        )}
        <TournamentRegisteredPlayersList tournamentId={tournamentId}
        tournamentType={tournament.type} />
      </section>
      {/* Additional content boxes for registered teams and chat, etc. */}
      </ThreeColumnLayout>
  );
};

export default TournamentDetailsPage;
