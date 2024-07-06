import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import logo from "../../assets/img/logo.jpg";

function NavScrollExample({ onSearch }) {
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
            {/* <Button
              variant="outline-success"
              className="header-btn mx-2 clases"
            >
              Personajes
            </Button>
            <Button
              variant="outline-success"
              className="header-btn mx-2 clases"
            >
              Naves Espaciales
            </Button>
            <Button
              variant="outline-success"
              className="header-btn mx-2 clases"
            >
              vehículos
            </Button> */}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar Personajes"
              className="me-2 search-input"
              aria-label="Search"
              onChange={(e) => onSearch(e.target.value)}
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
