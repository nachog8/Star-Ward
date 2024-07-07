import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import "./Starships.css";

function Starships({ searchTerm }) {
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/starships/");
        const data = await response.json();
        setStarships(data.results);
      } catch (error) {
        console.error("Error al obtener las naves", error);
      }
    };

    fetchStarships();
  }, []);

  const filteredStarships = starships.filter((starship) =>
    starship.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      {filteredStarships.length === 0 ? (
        <Alert variant="danger" className="mt-4 error">
          No se encontraron naves con ese nombre.
        </Alert>
      ) : (
        <>
          <Row>
            {filteredStarships.slice(0, 5).map((starship, index) => (
              <Col key={index} md={2} className="custom-card">
                <Card
                  style={{
                    width: "18rem",
                    maxWidth: "100%",
                    marginBottom: "20px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`https://starwars-visualguide.com/assets/img/starships/${
                      starship.url.match(/\/(\d+)\/$/)[1]
                    }.jpg`}
                    alt={`Imagen de ${starship.name}`}
                  />
                  <Card.Body>
                    <Card.Title className="nombre">{starship.name}</Card.Title>
                    <Card.Text>
                      Modelo: {starship.model}
                      <br />
                      Fabricante: {starship.manufacturer}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            {filteredStarships.slice(5, 10).map((starship, index) => (
              <Col key={index} md={2} className="custom-card">
                <Card
                  style={{
                    width: "18rem",
                    maxWidth: "100%",
                    marginBottom: "20px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`https://starwars-visualguide.com/assets/img/starships/${
                      starship.url.match(/\/(\d+)\/$/)[1]
                    }.jpg`}
                    alt={`Imagen de ${starship.name}`}
                  />
                  <Card.Body>
                    <Card.Title className="nombre">{starship.name}</Card.Title>
                    <Card.Text>
                      Modelo: {starship.model}
                      <br />
                      Fabricante: {starship.manufacturer}
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

export default Starships;
