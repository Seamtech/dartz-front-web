import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    bsLiveCode: '',
    password: '',
    mobileNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or data processing here
    console.log(formData);
    // Reset the form data
    setFormData({
      name: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      bsLiveCode: '',
      password: '',
      mobileNumber: ''
    });
  };

  return (
    <main className="main-content">
      <Container className="form-container">
        <h3>Sign Up</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicAddress1">
            <Form.Label>Address 1</Form.Label>
            <Form.Control
              type="text"
              name="address1"
              value={formData.address1}
              placeholder="Enter address line 1"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              type="text"
              name="address2"
              value={formData.address2}
              placeholder="Enter address line 2"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              placeholder="Enter city"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.state}
              placeholder="Enter state"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicZip">
            <Form.Label>ZIP Code</Form.Label>
            <Form.Control
              type="text"
              name="zip"
              value={formData.zip}
              placeholder="Enter ZIP code"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicBsLiveCode">
            <Form.Label>BS Live Code</Form.Label>
            <Form.Control
              type="text"
              name="bsLiveCode"
              value={formData.bsLiveCode}
              placeholder="Enter BS Live code"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicMobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              placeholder="Enter your mobile number"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="button" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </main>
  );
};

export default SignupPage;