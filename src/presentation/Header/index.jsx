import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/actions/auth";

const Header = () => {
  const cartItem = useSelector((state) => state.cart.cartItem);
  // const [cartItem, setCartItem] = useState(cartData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    dispatch(authAction(false));
  };
  const isLoggedIn = useSelector((state) => state.auth.isAuth);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link">
              about
            </NavLink>
            <NavLink to="/category" className="nav-link">
              Category
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        {isLoggedIn ? (
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to="/login">LogIn</Link>
        )}
        <div className="ms-3" onClick={() => navigate("/cart")}>
          Cart
          <Badge bg="primary">{cartItem?.length || 0}</Badge>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
