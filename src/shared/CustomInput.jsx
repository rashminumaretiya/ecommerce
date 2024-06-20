import React from "react";
import Form from "react-bootstrap/Form";

const CustomInput = ({ label, error, ...props }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control {...props} />
      {error && <p className="text-danger">{error}</p>}
    </Form.Group>
  );
};

export default CustomInput;
