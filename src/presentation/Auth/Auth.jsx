import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const arr = ["/login"];

const Auth = ({ children }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (arr?.includes(pathname) && isLoggedIn) {
      navigate("/");
    }
  }, [pathname]);

  if (!isLoggedIn && pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Auth;
