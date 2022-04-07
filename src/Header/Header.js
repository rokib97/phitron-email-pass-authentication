import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Header.css";
import img from "./images/download.png";

const Header = () => {
  return (
    <div className="mb-5">
      <Navbar className="navbar" bg="primary" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="text-white">
            <img src={img} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink to="/">
                <Button className="rounded-pill border-0 bg-white text-black active-link">
                  Log In
                </Button>
              </NavLink>
              <NavLink to="/registration">
                <Button className="rounded-pill border-0 bg-info text-white active-link">
                  Registration
                </Button>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
