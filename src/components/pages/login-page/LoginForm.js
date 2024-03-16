import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import FormField from '../../global/forms/FormField'; // Adjust the import path
import FormButton from '../../global/forms/FormButton'; // Adjust the import path
import { loginUser } from '../../../redux/slices/userSlice'; // Make sure the path is correct

const LoginForm = () => {
  const dispatch = useDispatch();
  // Selectors for loading and error states
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <Container className="form-container">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(loginUser(values))
            .unwrap()
            .then(() => {
              // Handle successful login
              // Redirect or perform another action
            })
            .catch((error) => {
              console.error('Login failed:', error);
              // Optionally handle login failure, such as displaying an error message
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <FormField name="email" label="Email" type="email" placeholder="Enter email" />
            <FormField name="password" label="Password" type="password" placeholder="Password" />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <FormButton variant="primary" type="submit" disabled={isSubmitting || isLoading}>
              Login
            </FormButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
