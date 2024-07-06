import React, { useState } from "react";
import "./App.css";
import StarWarsCards from "./Components/Card/Card";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <Header onSearch={setSearchTerm} />
      <StarWarsCards searchTerm={searchTerm} />
      <Footer />
    </div>
  );
}

export default App;
