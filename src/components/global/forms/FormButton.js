import React from 'react';
import { Button } from 'react-bootstrap';

const FormButton = ({ variant, type, children, ...props }) => {
  return (
    <Button variant={variant || 'primary'} type={type} className="form-button" {...props}>
      {children}
    </Button>
  );
};

export default FormButton;
