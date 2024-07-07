import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import logo from "../../assets/img/logo.jpg";

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const getPlaceholder = () => {
    if (location.pathname === "/films") {
      return "Buscar Películas";
    }
    if (location.pathname === "/starships") {
      return "Buscar Naves";
    }
    return "Buscar Personajes";
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
              exact // Asegura que el enlace solo esté activo en la ruta exacta
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
          <Form className="d-flex align-items-center">
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Form.Control
                type="search"
                placeholder={getPlaceholder()}
                className="me-2 search-input"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ paddingLeft: "30px" }} // Ajusta según el tamaño de tu SVG
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
                style={{
                  position: "absolute",
                  left: "10px",
                  pointerEvents: "none",
                  color: "white",
                }}
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
            {/* <Button variant="outline-success" className="header-btn">
              Buscar
            </Button> */}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
