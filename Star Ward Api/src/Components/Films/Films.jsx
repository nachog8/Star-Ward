import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import "./Films.css";

function Films({ searchTerm }) {
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

  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      {filteredFilms.length === 0 ? (
        <Alert variant="danger" className="mt-4 error">
          No se encontraron películas con ese nombre.
        </Alert>
      ) : (
        <>
          <Row>
            {filteredFilms.slice(0, 3).map((film, index) => (
              <Col key={index} md={4} className="custom-card">
                <Card
                  style={{
                    width: "18rem",
                    maxWidth: "100%",
                    marginBottom: "20px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`https://starwars-visualguide.com/assets/img/films/${film.episode_id}.jpg`}
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
            {filteredFilms.slice(3, 6).map((film, index) => (
              <Col key={index} md={4} className="custom-card">
                <Card
                  style={{
                    width: "18rem",
                    maxWidth: "100%",
                    marginBottom: "20px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`https://starwars-visualguide.com/assets/img/films/${film.episode_id}.jpg`}
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
