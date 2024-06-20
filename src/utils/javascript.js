const validation = ({ name, value, error }) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let errors = { ...error };
  switch (name) {
    case "email":
      if (!value) {
        errors[name] = `Please enter an ${name}`;
      } else if (!regex.test(value)) {
        errors[name] = `Please enter a valid ${name}`;
      } else {
        delete errors[name];
      }
      break;
    case "cpassword":
      if (!value) {
        errors[name] = `Please enter ${name}`;
      } else if (name.password !== value) {
        errors[name] = `Password are not match`;
      } else {
        delete errors[name];
      }
      break;
    default:
      if (!value) {
        errors[name] = `Please enter a ${name}`;
      } else {
        delete errors[name];
      }
  }
  return errors;
};

export default validation;
