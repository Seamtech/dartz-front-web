import React from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const FormField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
      {/* Display error message here if there is an error and the field was touched */}
      {meta.touched && meta.error ? (
        <div className="error-message" style={{ color: 'red', marginBottom: '0.5rem' }}>{meta.error}</div>
      ) : null}
      {/* Apply isInvalid prop directly within Form.Control to display validation state */}
      <Form.Control {...field} {...props} isInvalid={meta.touched && !!meta.error} />


    </Form.Group>
  );
};

export default FormField;
