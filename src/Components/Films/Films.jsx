import React, { useEffect, useState } from "react";
import { Container, Card, Alert } from "react-bootstrap";
import "./Films.css";

const BASE_IMAGE_URL = "https://starwars-visualguide.com/assets/img/films/";

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
        <div className="films-grid">
          {filteredFilms.map((film, index) => (
            <Card key={index} className="custom-card">
              <Card.Img
                variant="top"
                src={`${BASE_IMAGE_URL}${film.episode_id}.jpg`}
                alt={`Imagen de ${film.title}`}
                className="film-img"
              />
              <Card.Body>
                <Card.Title className="nombre">{film.title}</Card.Title>
                <Card.Text>
                  <strong>Director:</strong> {film.director}
                  <br />
                  <strong>Productor:</strong> {film.producer}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}

export default Films;
