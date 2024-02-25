// SignupForm.js
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import FormField from '../../Global/Forms/FormField'; // Update with the correct import path
import FormButton from '../../Global/Forms/FormButton'; // Update with the correct import path

// Validation schema
const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  address1: Yup.string().required('Required'),
  address2: Yup.string(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zip: Yup.string().required('Required'),
  bsLiveCode: Yup.string().required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
  mobileNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required('Required'),
});

const SignupForm = () => (
  <Container>
    <h3 className="text-center">Sign Up</h3>

    <Formik
      initialValues={{
        name: '',
        email: '',
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
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // Update the endpoint URL
        axios.post('YOUR_API_ENDPOINT', values)
          .then(response => {
            alert('Signup successful!');
            resetForm();
          })
          .catch(error => {
            console.error('Signup failed:', error);
            alert('Signup failed.');
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <FormField name="name" label="Name" type="text" placeholder="Enter your name" />
          <FormField name="email" label="Email" type="email" placeholder="Enter email" />
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

export default SignupForm;
