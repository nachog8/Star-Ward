import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import logo from "../../assets/img/logo.jpg";

function NavScrollExample({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCharacters, setActiveCharacters] = useState(true);
  const [activeStarships, setActiveStarships] = useState(false);
  const [activeFilms, setActiveFilms] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleLinkClick = (linkName) => {
    if (linkName === "Characters") {
      setActiveCharacters(true);
      setActiveStarships(false);
      setActiveFilms(false);
    } else if (linkName === "Starships") {
      setActiveCharacters(false);
      setActiveStarships(true);
      setActiveFilms(false);
    } else if (linkName === "Films") {
      setActiveCharacters(false);
      setActiveStarships(false);
      setActiveFilms(true);
    }
  };

  return (
    <Navbar expand="lg">
      <Container fluid className="navbar-container">
        <Navbar.Brand href="#">
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
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              href="#"
              className={`header-link ${activeCharacters ? "active" : ""}`}
              onClick={() => handleLinkClick("Characters")}
            >
              Characters
            </Nav.Link>
            <Nav.Link
              href="#"
              className={`header-link ${activeStarships ? "active" : ""}`}
              onClick={() => handleLinkClick("Starships")}
            >
              Starships
            </Nav.Link>
            <Nav.Link
              href="#"
              className={`header-link ${activeFilms ? "active" : ""}`}
              onClick={() => handleLinkClick("Films")}
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

export default NavScrollExample;
