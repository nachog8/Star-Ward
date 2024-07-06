import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

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
      <Row>
        {films.map((film, index) => (
          <Col key={index} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{film.title}</Card.Title>
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
    </Container>
  );
}

export default Films;
