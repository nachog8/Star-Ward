import React, { useEffect, useState } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Modal.css";

const BASE_IMAGE_URL = "https://starwars-visualguide.com/assets/img/";
const SWAPI_BASE_URL = "https://swapi.dev/api/";

function CharacterModal({ show, handleClose, character }) {
  const [films, setFilms] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);
  const [homeworld, setHomeworld] = useState("");
  const [species, setSpecies] = useState("Human");

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

    const fetchHomeworld = async () => {
      if (character.homeworld) {
        const response = await fetch(character.homeworld);
        const data = await response.json();
        setHomeworld(data.name);
      }
    };

    const fetchSpecies = async () => {
      if (character.species && character.species.length > 0) {
        const response = await fetch(character.species[0]);
        const data = await response.json();
        setSpecies(data.name);
      }
    };

    const getVehicleId = (url) => {
      const id = url.match(/\/([0-9]*)\/$/)[1];
      return `vehicles/${id}`;
    };

    const getStarshipId = (url) => {
      const id = url.match(/\/([0-9]*)\/$/)[1];
      return `starships/${id}`;
    };

    const getFilmId = (url) => {
      const id = url.match(/\/([0-9]*)\/$/)[1];
      return `films/${id}`;
    };

    if (character) {
      fetchVehicles();
      fetchStarships();
      fetchHomeworld();
      fetchSpecies();
      fetchData(character.films, setFilms, getFilmId);
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
      <Modal.Header closeButton className="container-modal">
        <Modal.Title className="titulos-principales">
          {character.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="container-modal">
        <Container>
          <Row>
            <Col md={4}>
              <img
                src={`${BASE_IMAGE_URL}characters/${characterId}.jpg`}
                alt={`Imagen de ${character.name}`}
                className="character-image"
              />
            </Col>
            <Col md={8} className="character-details">
              <p>
                <strong>Birth Year:</strong> {character.birth_year}
              </p>
              <p>
                <strong>Species:</strong> {species}
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
                <strong>Homeworld:</strong> {homeworld}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="container-films">
              <h5 className="titulos-principales">Related Films</h5>
              {films.length > 0 ? (
                <ul>
                  {films.map((film, index) => (
                    <li key={index}>
                      <img
                        className="imagenes"
                        src={`${BASE_IMAGE_URL}films/${film.episode_id}.jpg`}
                        alt={film.title}
                      />
                      <p className="title">{film.title}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="respuesta-auto">No films found.</p>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5 className="titulos-principales">Related vehicles</h5>
              {vehicles.length > 0 ? (
                <ul>
                  {vehicles.map((vehicle, index) => (
                    <li key={index}>
                      <img
                        className="imagenes"
                        src={`${BASE_IMAGE_URL}vehicles/${
                          vehicle.url.match(/\/([0-9]*)\/$/)[1]
                        }.jpg`}
                        alt={vehicle.name}
                      />
                      <p className="title">{vehicle.name}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="respuesta-auto">No vehicles found.</p>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5 className="titulos-principales">Related Starships</h5>
              {starships.length > 0 ? (
                <ul>
                  {starships.map((starship, index) => (
                    <li key={index}>
                      <img
                        className="imagenes"
                        src={`${BASE_IMAGE_URL}starships/${
                          starship.url.match(/\/([0-9]*)\/$/)[1]
                        }.jpg`}
                        alt={starship.name}
                      />
                      <p className="title">{starship.name}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="respuesta-auto">No starships found.</p>
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default CharacterModal;
