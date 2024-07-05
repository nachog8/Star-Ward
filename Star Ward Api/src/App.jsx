import React, { useState } from "react";
import "./App.css";
import StarWarsCards from "./Components/Card/Card";
import Header from "./Components/Header/Header";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <Header onSearch={setSearchTerm} />
      <StarWarsCards searchTerm={searchTerm} />
    </div>
  );
}

export default App;
