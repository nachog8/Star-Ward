import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import StarWarsCards from "./Components/Card/Card";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Starships from "./Components/Starships/Starships";
import Films from "./Components/Films/Films";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      let allCharacters = [];
      let url = "https://swapi.dev/api/people/";

      while (url) {
        const response = await fetch(url);
        const data = await response.json();
        allCharacters = [...allCharacters, ...data.results];
        url = data.next;
      }

      setCharacters(allCharacters);
    };

    fetchAllCharacters();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header onSearch={setSearchTerm} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <StarWarsCards characters={characters} searchTerm={searchTerm} />
            }
          />
          <Route
            path="/characters"
            element={
              <StarWarsCards characters={characters} searchTerm={searchTerm} />
            }
          />
          <Route
            path="/starships"
            element={<Starships searchTerm={searchTerm} />}
          />
          <Route path="/films" element={<Films searchTerm={searchTerm} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
