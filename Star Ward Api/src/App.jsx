import React, { useState, useEffect } from "react";
import "./App.css";
import StarWarsCards from "./Components/Card/Card";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

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
    <div className="App">
      <Header onSearch={setSearchTerm} />
      <StarWarsCards characters={characters} searchTerm={searchTerm} />
      <Footer />
    </div>
  );
}

export default App;
