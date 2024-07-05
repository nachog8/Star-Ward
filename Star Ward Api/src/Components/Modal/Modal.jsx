import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Modal.css";

const BASE_IMAGE_URL = "https://starwars-visualguide.com/assets/img/";
const SWAPI_BASE_URL = "https://swapi.dev/api/";

function CharacterModal({ show, handleClose, character }) {
  const [films, setFilms] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    const fetchData = async (urls, setData, getIdFunction) => {
      const ids = urls.map((url) => getIdFunction(url));
      const data = await Promise.all(
        ids.map(async (id) => {
          const response = await fetch(`${SWAPI_BASE_URL}${id}/`);
          return await response.json();
        })
      );
      setData(data);
    };

    const fetchVehicles = () => {
      fetchData(character.vehicles, setVehicles, getVehicleId);
    };

    const fetchStarships = () => {
      fetchData(character.starships, setStarships, getStarshipId);
    };

    const getVehicleId = (url) => {
      const id = url.match(/\/([0-9]*)\/$/)[1];
      return `vehicles/${id}`;
    };

    const getStarshipId = (url) => {
      const id = url.match(/\/([0-9]*)\/$/)[1];
      return id;
    };

    if (character) {
      fetchVehicles();
      fetchStarships();
      fetchData(
        character.films,
        setFilms,
        (url) => url.match(/\/([0-9]*)\/$/)[1]
      );
    }
  }, [character]);

  if (!character) return null;

  const getCharacterId = (url) => {
    const id = url.match(/\/([0-9]*)\/$/)[1];
    return id;
  };

  const characterId = getCharacterId(character.url);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{character.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={4}>
              <img
                src={`${BASE_IMAGE_URL}characters/${characterId}.jpg`}
                alt={`Imagen de ${character.name}`}
                style={{ width: "100%" }}
              />
            </Col>
            <Col md={8}>
              <p>
                <strong>Birth Year:</strong> {character.birth_year}
              </p>
              <p>
                <strong>Species:</strong> {character.species}
              </p>
              <p>
                <strong>Height:</strong> {character.height} cm
              </p>
              <p>
                <strong>Mass:</strong> {character.mass} kg
              </p>
              <p>
                <strong>Gender:</strong> {character.gender}
              </p>
              <p>
                <strong>Hair Color:</strong> {character.hair_color}
              </p>
              <p>
                <strong>Skin Color:</strong> {character.skin_color}
              </p>
              <p>
                <strong>Eye Color:</strong> {character.eye_color}
              </p>
              <p>
                <strong>Homeworld:</strong>{" "}
                <a
                  href={character.homeworld}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {character.homeworld}
                </a>
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="container-films">
              <h5>Related Films</h5>
              <ul>
                {films.map((film, index) => (
                  <li key={index}>
                    <a
                      href={film.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="imagenes-films"
                        src={`${BASE_IMAGE_URL}films/${film.episode_id}.jpg`}
                        alt={film.title}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5>Related Vehicles</h5>
              <ul>
                {vehicles.map((vehicle, index) => (
                  <li key={index}>
                    <img
                      src={`${BASE_IMAGE_URL}${vehicle.url}.jpg`}
                      alt={vehicle.name}
                    />
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5>Related Starships</h5>
              <ul>
                {starships.map((starship, index) => (
                  <li key={index}>
                    <img
                      src={`${BASE_IMAGE_URL}${starship.url}.jpg`}
                      alt={starship.name}
                    />
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CharacterModal;
