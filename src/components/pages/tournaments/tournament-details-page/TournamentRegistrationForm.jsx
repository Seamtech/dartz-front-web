import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux'; // Assuming Redux for state management
import FormField from '../../../global/forms/FormField'; // Ensure this component can accept and apply className or style for consistent styling
import FormButton from '../../../global/forms/FormButton'; // Ditto
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const TournamentRegistrationForm = ({ tournamentType, onRegister }) => {
  const user = useSelector((state) => state.user);

  const playerFieldsCount = tournamentType === 'DoubleZ' ? 1 :
                            tournamentType === 'TripZ' ? 2 :
                            tournamentType === 'FourZ' ? 3 : 0;

  const initialValues = {
    teamName: '',
    teamMembers: Array(playerFieldsCount).fill(''),
    agreedToRules: false,
  };

  const RegistrationSchema = Yup.object().shape({
    teamName: tournamentType !== 'SingleZ' ? Yup.string().required('Team name is required') : Yup.string().notRequired(),
    teamMembers: Yup.array()
      .of(Yup.string().required('Player username is required'))
      .min(playerFieldsCount, `All team member usernames are required`),
    agreedToRules: Yup.boolean().oneOf([true], 'You must agree to the tournament rules to proceed'),
  });

  return (
    <Container className="form-container">
    <Formik
      initialValues={initialValues}
      validationSchema={RegistrationSchema}
      onSubmit={(values, actions) => {
        const submissionValues = {
          ...values,
          teamMembers: [user.username, ...values.teamMembers].filter(Boolean),
        };

        onRegister(submissionValues);
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          {tournamentType !== 'SingleZ' && (
            <>
              <FormField name="teamName" label="Team Name (Optional)" type="text" placeholder="Enter team name" className="form-control" />
              {Array.from({ length: playerFieldsCount }).map((_, index) => (
                <FormField
                  key={index}
                  name={`teamMembers.${index}`}
                  label={`Player ${index + 2} Username`} // +2 because player 1 is the logged-in user
                  type="text"
                  placeholder={`Enter Player ${index + 2} Username`}
                  className="form-control"
                />
              ))}
            </>
          )}
          {<span>I agree to the <Link to="/rules">tournament rules</Link>.</span>}
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
