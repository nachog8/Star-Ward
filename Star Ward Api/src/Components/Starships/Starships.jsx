import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Starships.css";

function Starships() {
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/starships/`);
        const data = await response.json();
        setStarships(data.results);
      } catch (error) {
        console.error("Error al obtener las naves espaciales", error);
      }
    };

    fetchStarships();
  }, []);

  return (
    <Container>
      {starships.length === 0 ? (
        <Alert variant="danger" className="mt-4 error">
          No se encontraron naves espaciales.
        </Alert>
      ) : (
        <Row>
          {starships.map((starship, index) => (
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
                    starship.url.match(/\/([0-9]*)\/$/)[1]
                  }.jpg`}
                  alt={`Imagen de ${starship.name}`}
                />
                <Card.Body>
                  <Card.Title className="nombre">{starship.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Starships;
