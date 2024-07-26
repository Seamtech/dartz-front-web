import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormField, FormButton } from '../../../global/forms';

const TournamentEditForm = ({ initialValues, onSubmit }) => {
  const [editState, setEditState] = useState({
    tournamentName: false,
    description: false,
    maxPlayers: false,
  });

  const validationSchema = Yup.object({
    tournamentName: Yup.string().required("Tournament name is required"),
    description: Yup.string().required("Description is required"),
    maxPlayers: Yup.number().required("Max players is required"),
  });

  const toggleEdit = (field) => {
    setEditState((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors }) => (
        <Form id="editTournamentForm">
          <FormField
            label="ID"
            name="id"
            type="text"
            editable={false}
            error={errors.id}
          />
          <FormField
            label="Name"
            name="tournamentName"
            type="text"
            editable={editState.tournamentName}
            error={errors.tournamentName}
            button={
              <button
                type="button"
                className="small-button"
                onClick={(e) => {
                  e.preventDefault();
                  toggleEdit('tournamentName');
                }}
              >
                {editState.tournamentName ? 'Lock' : 'Edit'}
              </button>
            }
          />
          <FormField
            label="Description"
            name="description"
            type="text"
            editable={editState.description}
            error={errors.description}
            button={
              <button
                type="button"
                className="small-button"
                onClick={(e) => {
                  e.preventDefault();
                  toggleEdit('description');
                }}
              >
                {editState.description ? 'Lock' : 'Edit'}
              </button>
            }
          />
          <FormField
            label="Date"
            name="date"
            type="text"
            editable={false}
            error={errors.date}
          />
          <FormField
            label="Time"
            name="time"
            type="text"
            editable={false}
            error={errors.time}
          />
          <FormField
            label="Game"
            name="gameName"
            type="text"
            editable={false}
            error={errors.gameName}
          />
          <FormField
            label="Type"
            name="tournamentType"
            type="text"
            editable={false}
            error={errors.tournamentType}
          />
          <FormField
            label="Format"
            name="tournamentFormat"
            type="text"
            editable={false}
            error={errors.tournamentFormat}
          />
          <FormField
            label="Platform"
            name="platform"
            type="text"
            editable={false}
            error={errors.platform}
          />
          <FormField
            label="Max Players"
            name="maxPlayers"
            type="text"
            editable={editState.maxPlayers}
            error={errors.maxPlayers}
            button={
              <button
                type="button"
                className="small-button"
                onClick={(e) => {
                  e.preventDefault();
                  toggleEdit('maxPlayers');
                }}
              >
                {editState.maxPlayers ? 'Lock' : 'Edit'}
              </button>
            }
          />
          <FormField
            label="Entry Fee"
            name="entryFeeAmount"
            type="text"
            editable={false}
            error={errors.entryFeeAmount}
            renderCell={(row) => `${row.entryFeeAmount} ${row.entryFeeType}`}
          />
          <input type="hidden" name="status" value={initialValues.status} />
          <FormButton type="submit" disabled={isSubmitting}>
            Save Changes
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default TournamentEditForm;
