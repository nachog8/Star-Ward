import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import PaginationComponent from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";

function StarWarsCards({ searchTerm }) {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleShowModal = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCharacter(null);
  };

  return (
    <Container>
      {filteredCharacters.length === 0 ? (
        <Alert variant="danger" className="mt-4 error">
          No se encontraron personajes con ese nombre.
        </Alert>
      ) : (
        <>
          <Row>
            {displayedCharacters.slice(0, 5).map((character) => {
              const characterId = getCharacterId(character.url);
              return (
                <Col key={characterId} md={2} className="custom-card">
                  <Card
                    style={{
                      width: "18rem",
                      maxWidth: "100%",
                      marginBottom: "20px",
                    }}
                    onClick={() => handleShowModal(character)}
                  >
                    <Card.Img
                      variant="top"
                      src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
                      alt={`Imagen de ${character.name}`}
                    />
                    <Card.Body>
                      <Card.Title className="nombre">
                        {character.name}
                      </Card.Title>
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
                  <Card
                    style={{ width: "100%", marginBottom: "20px" }}
                    onClick={() => handleShowModal(character)}
                  >
                    <Card.Img
                      variant="top"
                      src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
                      alt={`Imagen de ${character.name}`}
                    />
                    <Card.Body>
                      <Card.Title className="nombre">
                        {character.name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      )}
      <Row>
        <Col className="d-flex justify-content-center">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Col>
      </Row>
      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        character={selectedCharacter}
      />
    </Container>
  );
}

export default StarWarsCards;
