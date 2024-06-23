import React, { useState } from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const FormField = ({ label, editable = true, error, button, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group className="form-section-container">
      <div className="form-field-container">
        <Form.Label htmlFor={props.id || props.name} className="form-label">
          {label}
          {button && <span className="form-button-container">{button}</span>}
        </Form.Label>
      </div>
      {meta.touched && (meta.error || error) ? (
        <div className="errorMessage">
          {meta.error || error}
        </div>
      ) : null}
      <div className="password-wrapper">
        <Form.Control
          {...field}
          {...props}
          type={showPassword ? 'text' : props.type}
          className={editable ? 'editable' : ''}
          isInvalid={meta.touched && !!meta.error}
          disabled={!editable}
        />
        {props.type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle-btn"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
      </div>
    </Form.Group>
  );
};

export default FormField;
