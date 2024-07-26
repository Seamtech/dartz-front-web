import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import FormButton from '../../global/forms/FormButton';
import './ErrorPage.css';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Container className="error-page-container">
            <h1 className="error-heading">Oops! Something went wrong.</h1>
            <p className="error-message">We're sorry for the inconvenience. Please try again later or return to the home page.</p>
            <FormButton variant="primary" onClick={handleGoHome}>Go to Home</FormButton>
        </Container>
    );
};

export default ErrorPage;
