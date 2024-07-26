import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container, Alert } from 'react-bootstrap';
import { adminTournamentService, tournamentService } from '../../../../services';
import { ThreeColumnLayout, FormField, FormButton } from '../../../global';

const CreateTournamentPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [games, setGames] = useState([]);
  const [platform, setPlatform] = useState('All');

  const initialValues = {
    tournamentType: 'Single Elimination',
    platform: 'G3',
    entryFeeAmount: '',
    entryFeeType: 'USD',
    tournamentFormat: 'SingleZ',
    gameId: 1,
    tournamentName: '',
    tournamentDescription: '',
    scheduledStart: '',
    maxPlayers: 64,
  };

  const validationSchema = Yup.object().shape({
    tournamentType: Yup.string().required('Required'),
    platform: Yup.string().required('Required'),
    entryFeeAmount: Yup.number().required('Required'),
    entryFeeType: Yup.string().required('Required'),
    tournamentFormat: Yup.string().required('Required'),
    gameId: Yup.number().integer().required('Required'),
    tournamentName: Yup.string().required('Required').max(25, 'Max 25 characters'),
    tournamentDescription: Yup.string().required('Required').max(50, 'Max 50 characters'),
    scheduledStart: Yup.date().required('Required'),
    maxPlayers: Yup.number().required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      values.gameId = parseInt(values.gameId); // Ensure gameId is sent as an integer
      await adminTournamentService.createTournament(values);
      setSuccessMessage('Tournament created successfully!');
      resetForm();
    } catch (error) {
      setErrorMessage('Failed to create tournament. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await tournamentService.getGames(platform);
        setGames(gamesData);
      } catch (error) {
        console.error('Error fetching games:', error);
        setErrorMessage('Failed to load games. Please try again later.');
      }
    };

    fetchGames();
  }, [platform]);

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };

  return (
    <ThreeColumnLayout>
      <Container className='content-box'>
        <h2>Create Tournament</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form noValidate>
              <FormField name="tournamentType" label="Tournament Type" as="select">
                <option value="Single Elimination">Single Elimination</option>
                <option value="Double Elimination">Double Elimination</option>
                <option value="Swiss">Swiss</option>
                <option value="Round Robin">Round Robin</option>
              </FormField>
              <FormField name="platform" label="Platform" as="select" onChange={handlePlatformChange}>
                <option value="All">All</option>
                <option value="G3">G3</option>
                <option value="GranBoard">GranBoard</option>
              </FormField>
              <FormField name="entryFeeAmount" label="Entry Fee Amount" type="number" placeholder="Enter entry fee amount" />
              <FormField name="entryFeeType" label="Entry Fee Type" as="select">
                <option value="USD">USD</option>
                <option value="DartZ">DartZ</option>
              </FormField>
              <FormField name="tournamentFormat" label="Tournament Format" as="select">
                <option value="SingleZ">SingleZ</option>
                <option value="DoubleZ">DoubleZ</option>
                <option value="TripZ">TripZ</option>
                <option value="QuadZ">QuadZ</option>
              </FormField>
              <FormField name="gameId" label="Game" as="select">
                {games.map(game => (
                  <option key={game.id} value={game.id}>
                    {game.name}
                  </option>
                ))}
              </FormField>
              <FormField name="tournamentName" label="Tournament Name" type="text" maxLength="25" placeholder="Enter tournament name" />
              <FormField name="tournamentDescription" label="Tournament Description" type="text" maxLength="50" placeholder="Enter tournament description" />
              <FormField name="scheduledStart" label="Scheduled Start" type="datetime-local" placeholder="Enter scheduled start" />
              <FormField name="maxPlayers" label="Max Players" type="number" defaultValue={64} placeholder="Enter max players" />
              <FormButton variant="primary" type="submit" disabled={isSubmitting}>
                Create Tournament
              </FormButton>
            </Form>
          )}
        </Formik>
      </Container>
    </ThreeColumnLayout>
  );
};

export default CreateTournamentPage;
