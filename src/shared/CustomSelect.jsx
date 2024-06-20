import React from "react";
import Form from "react-bootstrap/Form";

const CustomSelect = ({ children, label, error, ...props }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select {...props}>{children}</Form.Select>
      {error && <p className="text-danger">{error}</p>}
    </Form.Group>
  );
};

export default CustomSelect;
