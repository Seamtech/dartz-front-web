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
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setErrorMessage(''); // Clear previous errors
          try {
            await dispatch(signupUser(values)).unwrap();
            alert('Signup successful!');
            resetForm();
            navigate('/login'); // Navigate to the login page after successful signup
          } catch (error) {
            console.error('Signup failed:', error);
            setErrorMessage(error || 'Signup failed. Please try again.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <FormField name="firstName" label="First Name" type="text" placeholder="Enter your first name" />
            <FormField name="lastName" label="Last Name" type="text" placeholder="Enter your last name" />
            <FormField name="email" label="Email" type="email" placeholder="Enter email" />
            <FormField name="username" label="Username" type="text" placeholder="Enter username" />
            <FormField name="address1" label="Address 1" type="text" placeholder="Enter address line 1" />
            <FormField name="address2" label="Address 2" type="text" placeholder="Enter address line 2 (optional)" />
            <FormField name="city" label="City" type="text" placeholder="Enter city" />
            <FormField name="state" label="State" type="text" placeholder="Enter state" />
            <FormField name="zip" label="ZIP Code" type="text" placeholder="Enter ZIP code" />
            <FormField name="bsLiveCode" label="BS Live Code" type="text" placeholder="Enter BS Live code" />
            <FormField name="password" label="Password" type="password" placeholder="Password" />
            <FormField name="mobileNumber" label="Mobile Number" type="text" placeholder="Enter your mobile number" />
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
