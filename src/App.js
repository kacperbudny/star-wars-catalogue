import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import CharactersGrid from "./components/CharactersGrid";
import SearchBar from "./components/SearchBar";
import CheckBox from "./components/CheckBox";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [films, setFilms] = useState([]);
  const [isLoadingFilms, setIsLoadingFilms] = useState(true);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilms, setSelectedFilms] = useState([]);
  const maxCharacters = useRef();

  useEffect(() => {
    const fetchFilms = async () => {
      const resultFilms = await axios(`https://swapi.dev/api/films`);
      setFilms(resultFilms.data.results);

      const filmNames = resultFilms.data.results.map(f => f.title);
      setSelectedFilms(filmNames)

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

  useEffect(() => {
    const filteredUrls = films.filter(f => selectedFilms.find(ch => ch === f.title)).map(f => f.url);
    const filtered = characters.filter(ch => ch.films.some(f => filteredUrls.some(fu => fu === f)));

    setFilteredCharacters(filtered);
    console.log(filtered)
  }, [characters, selectedFilms])

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

  const handleCheckboxChange = (title) => {
    if (selectedFilms.some((elem) => elem === title)) {
      setSelectedFilms(selectedFilms.filter((t) => t !== title));
    } else {
      setSelectedFilms([...selectedFilms, title]);
    }
  };

  return (
    <div className="App">
      {isLoadingFilms ? (
        <h2>Loading films...</h2>
      ) : (
        <>
          <SearchBar handleChange={setSearchQuery} />
          {films.map((f) => (
            <CheckBox
              film={f}
              key={f.title}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
          {isLoadingCharacters ? (
            <h2>Loading characters...</h2>
          ) : (
            <>
              <CharactersGrid characters={filteredCharacters} films={films} />
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
        </>
      )}
    </div>
  );
};

export default App;
