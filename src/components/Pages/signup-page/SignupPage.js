import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SignupForm from "./SignupForm"; // Update with the correct path
import { Container } from "react-bootstrap";

const SignupPage = () => {
  const isLoggedIn = useSelector((state) => Boolean(state.user.token));

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />; // Redirect to dashboard
  }
  return (
    <Container className="main-content">
      <h3 className="sovjet-page-heading">Signup</h3>
      <section className="content-box">
        <SignupForm />
      </section>
    </Container>
  );
};

export default SignupPage;
