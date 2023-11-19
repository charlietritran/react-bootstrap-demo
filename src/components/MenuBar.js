import React from "react";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Navbar.Toggle
        aria-controls="navbarScroll"
        data-bs-target="#navbarScroll"
      />
      <Navbar.Collapse id="navbarScroll">
        <Nav>
          <Nav.Link eventKey="1" as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link eventKey="2" as={Link} to="/about">
            About
          </Nav.Link>

          <NavDropdown title="People" id="basic-nav-dropdown">
            <NavDropdown.Item eventKey="3" as={Link} to="/peopleAdd">
              Add Person
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4" as={Link} to="/peopleSearch">
              Search Person
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link eventKey="5" as={Link} to="/registration">
            Registration
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MenuBar;
