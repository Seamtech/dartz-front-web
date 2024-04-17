import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ThreeColumnLayout from "../../global/three-column-layout/ThreeColumnLayout";

const LandingPage = () => {
  return (
    <ThreeColumnLayout>
      {/* Main Middle Column (Unchanged) */}
      <h1 className="sovjet-page-heading">Welcome to DartZ!</h1>
      <Link className="link" to="/signup">
        Get Started
      </Link>
      <section className="content-box">
        {/* Main content remains the same */}
      </section>
    </ThreeColumnLayout>
  );
};

export default LandingPage;
