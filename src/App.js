import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import Loader from "./components/Loader";
import Sidebar from "./components/sidebar/Sidebar";
import MainContent from "./components/content/MainContent";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);
  const [isLoadingFilms, setIsLoadingFilms] = useState(true);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilms, setSelectedFilms] = useState();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const maxCharacters = useRef();

  useEffect(() => {
    const fetchFilms = async () => {
      const resultFilms = await axios(`https://swapi.dev/api/films`);
      setFilms(resultFilms.data.results);
      setSelectedFilms(resultFilms.data.results);

      setIsLoadingFilms(false);
    };

    fetchFilms();
  }, []);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoadingCharacters(true);

      const resultCharacters = await axios(
        `https://swapi.dev/api/people/?search=${searchQuery}`
      );

      setCharacters(resultCharacters.data.results);

      maxCharacters.current = resultCharacters.data.count;

      setIsLoadingCharacters(false);
    };

    fetchCharacters();
  }, [searchQuery]);

  const loadMoreCharacters = async () => {
    setIsLoadingMore(true);

    const result = await axios(
      `https://swapi.dev/api/people/?search=${searchQuery}&page=${Math.floor(
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

    setIsLoadingMore(false);
  };

  const handleCheckboxChange = (film) => {
    if (selectedFilms.some((elem) => elem === film)) {
      setSelectedFilms(selectedFilms.filter((t) => t !== film));
    } else {
      setSelectedFilms([...selectedFilms, film]);
    }
  };

  return (
    <div className="App">
      {isLoadingFilms ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <Sidebar
            isHamburgerOpen={isHamburgerOpen}
            setIsHamburgerOpen={setIsHamburgerOpen}
            setSearchQuery={setSearchQuery}
            films={films}
            handleCheckboxChange={handleCheckboxChange}
          />
          <MainContent
            isLoadingCharacters={isLoadingCharacters}
            characters={characters}
            films={films}
            selectedFilms={selectedFilms}
            isLoadingMore={isLoadingMore}
            maxCharacters={maxCharacters}
            loadMoreCharacters={loadMoreCharacters}
          />
        </>
      )}
    </div>
  );
};

export default App;
