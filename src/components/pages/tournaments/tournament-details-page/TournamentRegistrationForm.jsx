import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import FormField from '../../../global/forms/FormField';
import FormButton from '../../../global/forms/FormButton';
import { Link } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import authTournamentService from '../../../../services/tournaments/authTournamentService';
import playerService from '../../../../services/player/playerService';

const TournamentRegistrationForm = ({ tournamentFormat, tournamentId, teams }) => {
  const user = useSelector((state) => state.user);
  const [playerFieldsCount, setPlayerFieldsCount] = useState(0);
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    const count = tournamentFormat === 'DoubleZ' ? 1 :
      tournamentFormat === 'TripZ' ? 2 :
        tournamentFormat === 'FourZ' ? 3 : 0;
    setPlayerFieldsCount(count);
  }, [tournamentFormat]);

  const initialValues = {
    teamMembers: Array(playerFieldsCount).fill(''),
    agreedToRules: false,
  };

  const RegistrationSchema = Yup.object().shape({
    teamMembers: Yup.array()
      .of(Yup.string().required('Player username or profile ID is required'))
      .min(playerFieldsCount, `All team member usernames or profile IDs are required`),
    agreedToRules: Yup.boolean().oneOf([true], 'You must agree to the tournament rules to proceed'),
  });

  const userTeam = teams?.find(team => team.players.some(player => player.profileId === user.profileId));
  const userPlayer = userTeam?.players.find(player => player.profileId === user.profileId);

  const handleRegister = async (values, actions) => {
    try {
      const lookups = values.teamMembers.map(member => ({
        type: isNaN(member) ? 'username' : 'id',
        value: member,
      }));

      const { results, errors } = await playerService.batchPlayerLookup(lookups);

      if (errors.length) {
        setGeneralError(`Failed to find some players: ${errors.map(err => err.message).join(', ')}`);
        actions.setSubmitting(false);
        return;
      }

      const playerIds = results.map(player => ({ profileId: player.id }));

      const teamData = {
        tournamentId: Number(tournamentId),
        team: {
          name: user.user.username,
          players: [{ profileId: Number(user.profileId) }, ...playerIds].filter(Boolean),
        },
      };

      await authTournamentService.registerTeam(teamData);
      actions.setSubmitting(false);
    } catch (error) {
      console.error("Registration failed:", error);
      setGeneralError(error.response?.data?.error?.message || "Registration failed. Please try again.");
      actions.setSubmitting(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await authTournamentService.updatePlayerStatus(Number(tournamentId), Number(userTeam.id), Number(user.profileId), 'Checked In');
    } catch (error) {
      console.error("Check-in failed:", error);
      setGeneralError(error.response?.data?.error?.message || "Check-in failed. Please try again.");
    }
  };

  const handleCheckOut = async () => {
    try {
      await authTournamentService.updatePlayerStatus(Number(tournamentId), Number(userTeam.id), Number(user.profileId), 'Registered');
    } catch (error) {
      console.error("Check-out failed:", error);
      setGeneralError(error.response?.data?.error?.message || "Check-out failed. Please try again.");
    }
  };

  if (userPlayer?.status === 'Registered') {
    return (
      <Container className="form-container">
        <section>You are registered for this tournament</section>
        <FormButton onClick={handleCheckIn} className="form-button">
          Check In
        </FormButton>
        {generalError && <Alert variant="danger">{generalError}</Alert>}
      </Container>
    );
  }

  if (userPlayer?.status === 'Checked In') {
    return (
      <Container className="form-container">
        <section>You are checked in for this tournament</section>
        <FormButton onClick={handleCheckOut} className="form-button">
          Check Out
        </FormButton>
        {generalError && <Alert variant="danger">{generalError}</Alert>}
      </Container>
    );
  }

  return (
    <Container className="form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting, errors }) => (
          <Form noValidate>
            {generalError && <Alert variant="danger">{generalError}</Alert>}
            {tournamentFormat !== 'SingleZ' && (
              <>
                {Array.from({ length: playerFieldsCount }).map((_, index) => (
                  <FormField
                    key={index}
                    name={`teamMembers.${index}`}
                    label={`Player ${index + 2} Username or Profile ID`}
                    type="text"
                    placeholder={`Enter Player ${index + 2} Username or Profile ID`}
                    className="form-control"
                  />
                ))}
              </>
            )}
            <section>I agree to the <Link to="/rules">tournament rules</Link>.</section>
            <FormField name="agreedToRules" type="checkbox" className="checkbox-container" />
            <FormButton type="submit" disabled={isSubmitting} className="form-button">
              Register
            </FormButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default TournamentRegistrationForm;
