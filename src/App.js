import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import CharactersGrid from "./components/CharactersGrid";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);

      const resultCharacters = await axios(
        `https://swapi.dev/api/people/?search=${searchQuery}`
      );
      setCharacters(resultCharacters.data.results);
      maxCharacters.current = resultCharacters.data.count;

      setIsLoading(false);

      console.log(maxCharacters.current);
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

  return (
    <div className="App">
      <SearchBar handleChange={setSearchQuery} />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <CharactersGrid characters={characters} films={films} />
          {isLoadingMore ? (
            <h2>Loading more...</h2>
          ) : (
            <>
              {characters.length >= maxCharacters.current ? (
                <></>
              ) : (
                <button type="button" onClick={() => loadMoreCharacters()}>
                  Load more
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
