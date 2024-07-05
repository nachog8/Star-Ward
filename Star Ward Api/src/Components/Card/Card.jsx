import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PaginationComponent from "../Pagination/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";

function StarWarsCards({ searchTerm }) {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?page=${currentPage}`
        );
        const data = await response.json();
        setCharacters(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (error) {
        console.error("Error al obtener los personajes ", error);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  const getCharacterId = (url) => {
    const id = url.match(/\/([0-9]*)\/$/)[1];
    return id;
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Limitar a 10 personajes para mostrar en 2 filas de 5 columnas
  const displayedCharacters = filteredCharacters.slice(0, 10);

  return (
    <Container>
      {/* Dividir en 2 filas manualmente podría requerir lógica adicional si siempre quieres 2 filas,
          aquí se asume que siempre hay 10 o más personajes después de filtrar. */}
      <Row>
        {displayedCharacters.slice(0, 5).map((character) => {
          const characterId = getCharacterId(character.url);
          return (
            <Col key={characterId} md={2}>
              <Card
                style={{
                  width: "18rem",
                  maxWidth: "100%",
                  marginBottom: "20px",
                }}
              >
                <Card.Img
                  variant="top"
                  src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
                  alt={`Imagen de ${character.name}`}
                />
                <Card.Body>
                  <Card.Title>{character.name}</Card.Title>
                  {/* <Card.Text>
                    Height: {character.height} <br />
                    Mass: {character.mass} <br />
                    Hair Color: {character.hair_color}
                  </Card.Text> */}
                  <Button
                    className="card-btn"
                    variant="primary"
                    href={`https://swapi.dev/api/people/${characterId}/`}
                  >
                    Más Información
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row>
        {displayedCharacters.slice(5, 10).map((character) => {
          const characterId = getCharacterId(character.url);
          return (
            <Col key={characterId} md={2}>
              <Card style={{ width: "100%", marginBottom: "20px" }}>
                <Card.Img
                  variant="top"
                  src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
                  alt={`Imagen de ${character.name}`}
                />
                <Card.Body>
                  <Card.Title>{character.name}</Card.Title>
                  {/* <Card.Text>
                    Height: {character.height} <br />
                    Mass: {character.mass} <br />
                    Hair Color: {character.hair_color}
                  </Card.Text> */}
                  <Button
                    className="card-btn"
                    variant="primary"
                    href={`https://swapi.dev/api/people/${characterId}/`}
                  >
                    Más Información
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default StarWarsCards;
