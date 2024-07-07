import React, { useEffect, useState } from "react";
import { Container, Card, Alert } from "react-bootstrap";
import "./Starships.css";
import noImg from "../../assets/img/noImg.jpg";

const BASE_IMAGE_URL = "https://starwars-visualguide.com/assets/img/starships/";

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

  // Definimos los índices de las naves que deben mostrar la imagen por defecto
  const defaultImageStarshipIndexes = [0, 1, 9];

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
        <div className="starship-grid">
          {filteredStarships.map((starship, index) => (
            <Card key={index} className="starship-card">
              <Card.Img
                variant="top"
                src={
                  defaultImageStarshipIndexes.includes(index)
                    ? noImg
                    : `${BASE_IMAGE_URL}${
                        starship.url.match(/\/(\d+)\/$/)[1]
                      }.jpg`
                }
                alt={`Imagen de ${starship.name}`}
              />
              <Card.Body>
                <Card.Title className="nombre">{starship.name}</Card.Title>
                <Card.Text>
                  <strong>Modelo:</strong> {starship.model}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}

export default Starships;
