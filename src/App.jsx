import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header, Footer, CustomBreadcrumb } from "./components/global";
import AppRoutes from "./components/global/routes/AppRoutes";
import { SocketProvider } from "./contexts/SocketContext";
import { Container } from "react-bootstrap";
//import './App.css';
import "./assets/styles/forms.css"
import "./assets/styles/variables.css";
import "./assets/styles/base.css";
import "./assets/styles/utilities.css";
import "./assets/styles/global.css";
import "./assets/styles/forms.css";

const App = () => (
  <SocketProvider url={import.meta.env.VITE_SOCKET_URL}>
    <Router>
      <Header />
      <CustomBreadcrumb />
      <Container className="app-container">
        <AppRoutes />
      </Container>
      <Footer />
    </Router>
  </SocketProvider>
);
export default App;
