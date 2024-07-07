import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import PaginationComponent from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";

function StarWarsCards({ characters, searchTerm }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;

  const getCharacterId = (url) => {
    const id = url.match(/\/([0-9]*)\/$/)[1];
    return id;
  };

  const handleShowModal = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCharacter(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Reset to first page when searchTerm changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCharacters = filteredCharacters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      {filteredCharacters.length === 0 ? (
        <Alert variant="danger" className="mt-4 error">
          No se encontraron personajes con ese nombre.
        </Alert>
      ) : (
        <>
          <Row>
            {paginatedCharacters.slice(0, 5).map((character, index) => {
              const characterId = getCharacterId(character.url);
              return (
                <Col key={index} md={2} className="custom-card">
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
            {paginatedCharacters.slice(5, 10).map((character, index) => {
              const characterId = getCharacterId(character.url);
              return (
                <Col key={index} md={2} className="custom-card">
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
        </>
      )}
      <Row>
        <Col className="d-flex justify-content-center">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCharacters.length / itemsPerPage)}
            onPageChange={handlePageChange}
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
