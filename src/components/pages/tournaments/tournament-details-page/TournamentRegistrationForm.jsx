import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import FormField from '../../../global/forms/FormField';
import FormButton from '../../../global/forms/FormButton';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const TournamentRegistrationForm = ({ tournamentType, onRegister, onUpdatePlayerStatus, tournamentId, teams }) => {
  const user = useSelector((state) => state.user);

  const playerFieldsCount = tournamentType === 'DoubleZ' ? 1 :
                            tournamentType === 'TripZ' ? 2 :
                            tournamentType === 'FourZ' ? 3 : 0;

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

  const userTeam = teams.find(team => team.players.some(player => player.profileId === user.profileId));
  const userPlayer = userTeam?.players.find(player => player.profileId === user.profileId);

  const handleCheckIn = async () => {
    try {
      await onUpdatePlayerStatus(Number(tournamentId), Number(userTeam.id), Number(user.profileId), 'Checked In');
    } catch (error) {
      console.error("Check-in failed:", error);
    }
  };

  const handleCheckOut = async () => {
    try {
      await onUpdatePlayerStatus(Number(tournamentId), Number(userTeam.id), Number(user.profileId), 'Registered');
    } catch (error) {
      console.error("Check-out failed:", error);
    }
  };

  if (userPlayer?.status === 'Registered') {
    return (
      <Container className="form-container">
        <span>You are registered for this tournament</span>
        <FormButton onClick={handleCheckIn} className="form-button">
          Check In
        </FormButton>
      </Container>
    );
  }

  if (userPlayer?.status === 'Checked In') {
    return (
      <Container className="form-container">
        <FormButton onClick={handleCheckOut} className="form-button">
          Check Out
        </FormButton>
      </Container>
    );
  }

  return (
    <Container className="form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationSchema}
        onSubmit={async (values, actions) => {
          const submissionValues = {
            tournamentId: Number(tournamentId),
            team: {
              name: user.username,
              players: [{ profileId: Number(user.profileId) }, ...values.teamMembers.map(member => ({ profileId: Number(member) }))].filter(Boolean),
            },
          };

          try {
            await onRegister(submissionValues);
            actions.setSubmitting(false);
          } catch (error) {
            console.error("Registration failed:", error);
            actions.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            {tournamentType !== 'SingleZ' && (
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
            <span>I agree to the <Link to="/rules">tournament rules</Link>.</span>
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
