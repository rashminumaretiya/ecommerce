import React from "react";
import Button from "react-bootstrap/Button";

const CustomButton = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default CustomButton;
