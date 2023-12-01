import React from "react";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import { Link } from "react-router-dom";

import * as contants from "../common/Constants";

/**
 * MENU BAR
 * @returns
 */
const MenuBar = () => {
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Navbar.Toggle
        aria-controls="navbarScroll"
        data-bs-target="#navbarScroll"
      />
      <Navbar.Collapse id="navbarScroll">
        <Nav>
          <Nav.Link eventKey="1" as={Link} to={"/" + contants.APP_NAME}>
            Home
          </Nav.Link>
          <Nav.Link
            eventKey="2"
            as={Link}
            to={"/" + contants.APP_NAME + "/about"}
          >
            About
          </Nav.Link>

          <NavDropdown title="People" id="basic-nav-dropdown">
            <NavDropdown.Item
              eventKey="3"
              as={Link}
              to={"/" + contants.APP_NAME + "/peopleAdd"}
            >
              Add Person
            </NavDropdown.Item>
            <NavDropdown.Item
              eventKey="4"
              as={Link}
              to={"/" + contants.APP_NAME + "/peopleSearch"}
            >
              Search Person
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link
            eventKey="5"
            as={Link}
            to={"/" + contants.APP_NAME + "/registration"}
          >
            Registration
          </Nav.Link>

          <Nav.Link
            eventKey="6"
            as={Link}
            to={"/" + contants.APP_NAME + "/solrDemo"}
          >
            Solr Demo
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MenuBar;
