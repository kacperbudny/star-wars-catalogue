import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import CharactersGrid from "./components/CharactersGrid";
import Modal from "react-modal";
import ModalContent from "./components/ModalContent";

Modal.setAppElement("#root");

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    maxWidth: "500px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState();
  const maxCharacters = useRef(82);

  useEffect(() => {
    const fetchData = async () => {
      const resultFilms = await axios(`https://swapi.dev/api/films`);
      setFilms(resultFilms.data.results);

      const resultCharacters = await axios(`https://swapi.dev/api/people`);
      setCharacters(resultCharacters.data.results);
      maxCharacters.current = resultCharacters.data.count;

      setIsLoading(false);
    };

    fetchData();
    
  }, []);

  const loadMoreCharacters = async () => {
    const result = await axios(
      `https://swapi.dev/api/people/?page=${Math.floor(
        characters.length / 10 + 1
      )}`
    );
    const firstElement = characters.length % 10;
    const lastElement = firstElement + 5;
    const additionalFiveCharacters = result.data.results.slice(
      firstElement,
      lastElement
    );
    const newCharacters = characters.concat(additionalFiveCharacters);
    setCharacters(newCharacters);
  };

  return (
    <div className="App">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <CharactersGrid
            characters={characters}
            setModalOpen={() => setIsModalOpen(true)}
            selectCharacter={setSelectedCharacter}
          />
          {characters.length >= maxCharacters.current ? (
            <></>
          ) : (
            <button type="button" onClick={() => loadMoreCharacters()}>
              Load more
            </button>
          )}
        </>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={modalStyle}
      >
        <ModalContent character={selectedCharacter} films={films}/>
      </Modal>
    </div>
  );
};

export default App;
