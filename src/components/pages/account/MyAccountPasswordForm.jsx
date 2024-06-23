import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormField from '../../global/forms/FormField';
import FormButton from '../../global/forms/FormButton';
import myAccountService from '../../../services/myAccountService';

const MyAccountPasswordForm = ({ onClose, onSuccess }) => {
  const [generalError, setGeneralError] = useState('');

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required('Required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setGeneralError('');

    if (values.newPassword === values.currentPassword) {
      setGeneralError('New password cannot be the same as the current password.');
      setSubmitting(false);
      return;
    }

    try {
      await myAccountService.changePassword(values);
      onSuccess('Password changed successfully');
      onClose();
    } catch (error) {
      console.error('Error changing password:', error);
      if (error.message === 'Current password is incorrect.') {
        setErrors({ currentPassword: error.message });
      } else {
        setGeneralError(error.message || 'Failed to change password. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting, errors }) => (
        <Form>
          {generalError && <div className="alert alert-danger">{generalError}</div>}
          <FormField label="Current Password" name="currentPassword" type="password" error={errors.currentPassword} />
          <FormField label="New Password" name="newPassword" type="password" error={errors.newPassword} />
          <FormField label="Confirm Password" name="confirmPassword" type="password" error={errors.confirmPassword} />
          <FormButton type="submit" disabled={isSubmitting}>
            Change Password
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default MyAccountPasswordForm;
