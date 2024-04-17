import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeftSideComponent from './LeftSideComponent';
import RightSideComponent from './RightSideComponent';
import './ThreeColumnLayout.css';

const ThreeColumnLayout = ({ children }) => {
  return (
    <main fluid className="three-column">
      <Row>
        <Col xs={12} md={3}>
          <LeftSideComponent />
        </Col>
        <Col xs={12} md={6}>
            <div className="main-content">
          {children}
          </div>
        </Col>
        <Col xs={12} md={3}>
          <RightSideComponent />
        </Col>
      </Row>
    </main>
  );
};

export default ThreeColumnLayout;
