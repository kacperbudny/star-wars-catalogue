import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import CharactersGrid from "./components/CharactersGrid";
import SearchBar from "./components/SearchBar";
import CheckBox from "./components/CheckBox";
import Loader from "./components/Loader";

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
          <div className="sidebar">
            <div
              className={`hamburger ${isHamburgerOpen ? "hamburger-on" : ""}`}
              onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
            >
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
            <h1>Star Wars Characters Catalogue</h1>
            <div
              className={`filtering-section ${isHamburgerOpen ? "open" : ""}`}
            >
              <SearchBar handleChange={setSearchQuery} />
              <div className="filter-by-film">
                <p>Filter by film:</p>
                {films.map((f) => (
                  <CheckBox
                    film={f}
                    key={f.title}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="container">
            <main>
              {isLoadingCharacters ? (
                <div className="loader-container">
                  <Loader />
                </div>
              ) : (
                <>
                  <CharactersGrid
                    characters={characters}
                    films={films}
                    selectedFilms={selectedFilms}
                  />
                  {isLoadingMore ? (
                    <Loader />
                  ) : (
                    <>
                      {characters.length >= maxCharacters.current ? (
                        <></>
                      ) : (
                        <button
                          type="button"
                          onClick={() => loadMoreCharacters()}
                        >
                          Load more
                        </button>
                      )}
                    </>
                  )}
                </>
              )}
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
