import React, { useState } from "react";
import CustomInput from "../../shared/CustomInput";
import CustomButton from "../../shared/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import validation from "../../utils/javascript";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/actions/auth";

const Login = () => {
  const [formVal, setFormVal] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormVal((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setError((error) => ({
      ...validation({ name, value, error }),
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let filterArr = {};
    for (let list in formVal) {
      filterArr = {
        ...filterArr,
        ...validation({ name: list, value: formVal[list], error }),
      };
      setError(filterArr);
    }
    if (Object.keys(filterArr).length === 0) {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      navigate("/");
      dispatch(authAction(true));
    }
  };
  return (
    <div className="login-form">
      <div className="container">
        <div className="row justify-content-center my-5">
          <Col lg={4}>
            <div className="card shadow">
              <div className="card-title text-center border-bottom">
                <h2 className="p-3">Login</h2>
              </div>
              <div className="card-body">
                <form>
                  <CustomInput
                    type="text"
                    label="Username/Email"
                    name="email"
                    onChange={handleChange}
                    error={error?.email}
                  />
                  <CustomInput
                    type="password"
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    error={error?.password}
                  />
                  <div className="d-grid">
                    <CustomButton type="submit" onClick={handleLogin}>
                      Login
                    </CustomButton>
                  </div>
                </form>
                <div className="text-center pt-3">
                  <Link to="/signIn">Sign In</Link>
                </div>
              </div>
            </div>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Login;
