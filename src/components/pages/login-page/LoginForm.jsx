import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormField from '../../global/forms/FormField'; // Adjust the import path
import FormButton from '../../global/forms/FormButton'; // Adjust the import path
import { loginUser } from '../../../redux/slices/userSlice'; // Make sure the path is correct

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Selectors for loading and error states
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  const LoginSchema = Yup.object().shape({
    emailOrUsername: Yup.string().required('Email or Username is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <Container className="form-container">
      <Formik
        initialValues={{ emailOrUsername: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            await dispatch(loginUser(values)).unwrap();
            // Navigate to dashboard on successful login
            navigate('/dashboard');
          } catch (error) {
            console.error('Login failed:', error);
            // Display general login failure message
            setFieldError('emailOrUsername', 'Invalid email/username or password');
            setFieldError('password', 'Invalid email/username or password');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, isSubmitting, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <div style={{ color: 'red', marginBottom: '.85rem' }}>Login Failed</div>}
            <FormField
              name="emailOrUsername"
              label="Email or Username"
              type="text"
              placeholder="Enter email or username"
              error={errors.emailOrUsername}
              touched={touched.emailOrUsername}
            />
            {errors.emailOrUsername && touched.emailOrUsername && (
              <div style={{ color: 'red' }}>{errors.emailOrUsername}</div>
            )}
            <FormField
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              error={errors.password}
              touched={touched.password}
            />
            {errors.password && touched.password && (
              <div style={{ color: 'red' }}>{errors.password}</div>
            )}
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
