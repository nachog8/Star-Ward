import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Films.css";

function Films() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/films/");
        const data = await response.json();
        setFilms(data.results);
      } catch (error) {
        console.error("Error al obtener las películas", error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <Container>
      {films.length === 0 ? (
        <Alert variant="danger" className="mt-4 error">
          No se encontraron películas.
        </Alert>
      ) : (
        <>
          <Row>
            {films.slice(0, 3).map((film, index) => (
              <Col key={index} md={4} className="custom-film">
                <Card
                  style={{
                    width: "18rem",
                    maxWidth: "100%",
                    marginBottom: "20px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    className="film-img"
                    src={`https://starwars-visualguide.com/assets/img/films/${
                      film.url.match(/\/([0-9]*)\/$/)[1]
                    }.jpg`}
                    alt={`Imagen de ${film.title}`}
                  />
                  <Card.Body>
                    <Card.Title className="nombre">{film.title}</Card.Title>
                    <Card.Text>
                      Director: {film.director}
                      <br />
                      Productor: {film.producer}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            {films.slice(3, 6).map((film, index) => (
              <Col key={index} md={4} className="custom-film">
                <Card
                  style={{
                    width: "18rem",
                    maxWidth: "100%",
                    marginBottom: "20px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    className="film-img"
                    src={`https://starwars-visualguide.com/assets/img/films/${
                      film.url.match(/\/([0-9]*)\/$/)[1]
                    }.jpg`}
                    alt={`Imagen de ${film.title}`}
                  />
                  <Card.Body>
                    <Card.Title className="nombre">{film.title}</Card.Title>
                    <Card.Text>
                      Director: {film.director}
                      <br />
                      Productor: {film.producer}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}

export default Films;
