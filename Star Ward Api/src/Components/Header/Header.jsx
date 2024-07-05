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
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={logo}
            width="100" // Ajusta el ancho como sea necesario
            height="50" // Ajusta la altura como sea necesario
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
          ></Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar Personajes"
              className="me-2 search-input"
              aria-label="Search"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Button variant="outline-success" className="card-btn">
              Buscar
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
