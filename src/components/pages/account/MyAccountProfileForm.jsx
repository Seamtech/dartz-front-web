import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormField from '../../global/forms/FormField';
import FormButton from '../../global/forms/FormButton';
import { myAccountService } from '../../../services/user/myAccountService';

const MyAccountProfileForm = ({ userInfo, onClose, onSuccess }) => {
  const userId = useSelector((state) => state.user.userId); // Ensure the path to userId is correct
  const [generalError, setGeneralError] = useState('');
  const [editState, setEditState] = useState({
    username: false,
    email: false,
    mobileNumber: false,
    address1: false,
    address2: false,
    city: false,
    state: false,
    zip: false,
    bsLiveCode: false,
  });

  const initialValues = {
    username: userInfo.username || '',
    email: userInfo.email || '',
    mobileNumber: userInfo.mobileNumber || '',
    address1: userInfo.address1 || '',
    address2: userInfo.address2 || '',
    city: userInfo.city || '',
    state: userInfo.state || '',
    zip: userInfo.zip || '',
    bsLiveCode: userInfo.bsLiveCode || '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().nullable(),
    email: Yup.string().email('Invalid email address').nullable(),
    mobileNumber: Yup.string().nullable(),
    address1: Yup.string().nullable(),
    address2: Yup.string().nullable(),
    city: Yup.string().nullable(),
    state: Yup.string().nullable(),
    zip: Yup.string().nullable(),
    bsLiveCode: Yup.string().nullable(),
  });

  const getChangedData = (initialValues, values) => {
    const changedData = {};
    Object.keys(values).forEach(key => {
      if (initialValues[key] !== values[key]) {
        changedData[key] = values[key];
      }
    });
    return changedData;
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setGeneralError('');
    const changedData = getChangedData(initialValues, values);

    if (Object.keys(changedData).length === 0) {
      setGeneralError('No changes detected.');
      setSubmitting(false);
      return;
    }

    try {
      await myAccountService.updateProfile({ ...changedData, userId: Number(userId) });
      onSuccess('Profile updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.field) {
        setErrors({ [error.field]: error.message });
      } else {
        setGeneralError('Failed to update profile. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const toggleEdit = (field) => {
    setEditState((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting, errors }) => (
        <Form>
          {generalError && <div className="alert alert-danger">{generalError}</div>}
          {Object.keys(initialValues).map((field) => (
            <FormField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              type="text"
              editable={editState[field]}
              error={errors[field]}
              button={
                <button
                  type="button"
                  className="small-button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleEdit(field);
                  }}
                >
                  {editState[field] ? 'Lock' : 'Edit'}
                </button>
              }
            />
          ))}
          <FormButton type="submit" disabled={isSubmitting}>
            Save Changes
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default MyAccountProfileForm;
