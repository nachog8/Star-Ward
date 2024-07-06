import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import logo from "../../assets/img/logo.jpg";

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Navbar expand="lg">
      <Container fluid className="navbar-container">
        <Navbar.Brand as={NavLink} to="/">
          <img
            src={logo}
            width="100"
            height="50"
            className="d-inline-block align-top"
            alt="Logo Star Wars"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link
              as={NavLink}
              to="/characters"
              className="header-link"
              activeClassName="active"
            >
              Characters
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/starships"
              className="header-link"
              activeClassName="active"
            >
              Starships
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/films"
              className="header-link"
              activeClassName="active"
            >
              Films
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar Personajes"
              className="me-2 search-input"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button variant="outline-success" className="header-btn">
              Buscar
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
