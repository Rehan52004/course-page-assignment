import React, { useEffect } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const Header = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const user = firebase.current;

  function logout() {
    const outUser = firebase.logoutUser();
    console.log(outUser);
  }

  return (
    <Navbar key="md" expand="md" className="bg-body-tertiary mb-3">
      <Container fluid="md" className="py-2">
        <Navbar.Brand href="#">Appwrite</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
              Appwrite
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <NavLink
                className="nav-link font-2x"
                to="/"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                  };
                }}
              >
                Home
              </NavLink>
              <NavLink
                className="nav-link font-2x"
                to="/student-dashboard"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                  };
                }}
              >
                Dashboard
              </NavLink>
            </Nav>
            <Nav className="d-flex">
              {user ? (
                <Button variant="danger" onClick={logout} className="w-100">
                  Logout
                </Button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button variant="outline-success mb-lg-0 mb-2 w-100">
                      Login
                    </Button>
                  </Link>
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button variant="success" className="ms-lg-2 ms-0 w-100">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
