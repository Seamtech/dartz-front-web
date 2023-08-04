import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const LoginPage = () => {
  return (
    <main className="main-content">
      <Container className="form-container">
        <h3>Login</h3>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="button" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </main>
  );
};

export default LoginPage;