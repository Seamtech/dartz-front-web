import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container, Alert } from 'react-bootstrap';
import FormField from '../../global/forms/FormField';
import FormButton from '../../global/forms/FormButton';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../../redux/slices/userSlice'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    username: Yup.string().required('Required'),
    address1: Yup.string().required('Required'),
    address2: Yup.string(),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zip: Yup.string().required('Required'),
    bsLiveCode: Yup.string().required('Required'),
    password: Yup.string().min(8, 'Too Short!').required('Required'),
    mobileNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required('Required'),
  });

  return (
    <Container className="form-container">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          zip: '',
          bsLiveCode: '',
          password: '',
          mobileNumber: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          setErrorMessage(''); // Clear previous errors
          try {
            await dispatch(signupUser(values)).unwrap();
            alert('Signup successful!');
            resetForm();
            navigate('/login'); // Navigate to the login page after successful signup
          } catch (error) {
            console.error('Signup failed:', error);

            // Handle field-specific errors
            if (error.field) {
              setErrors({ [error.field]: error.message });
            } else {
              setErrorMessage(error.message || 'Signup failed. Please try again.');
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <FormField name="firstName" label="First Name" type="text" placeholder="Enter your first name" error={errors.firstName} />
            <FormField name="lastName" label="Last Name" type="text" placeholder="Enter your last name" error={errors.lastName} />
            <FormField name="email" label="Email" type="email" placeholder="Enter email" error={errors.email} />
            <FormField name="username" label="Username" type="text" placeholder="Enter username" error={errors.username} />
            <FormField name="address1" label="Address 1" type="text" placeholder="Enter address line 1" error={errors.address1} />
            <FormField name="address2" label="Address 2" type="text" placeholder="Enter address line 2 (optional)" error={errors.address2} />
            <FormField name="city" label="City" type="text" placeholder="Enter city" error={errors.city} />
            <FormField name="state" label="State" type="text" placeholder="Enter state" error={errors.state} />
            <FormField name="zip" label="ZIP Code" type="text" placeholder="Enter ZIP code" error={errors.zip} />
            <FormField name="bsLiveCode" label="BS Live Code" type="text" placeholder="Enter BS Live code" error={errors.bsLiveCode} />
            <FormField name="password" label="Password" type="password" placeholder="Password" error={errors.password} />
            <FormField name="mobileNumber" label="Mobile Number" type="text" placeholder="Enter your mobile number" error={errors.mobileNumber} />
            <FormButton variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </FormButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignupForm;
