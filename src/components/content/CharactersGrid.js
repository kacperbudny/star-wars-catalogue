import React, { useState, useEffect } from "react";
import CharacterInfo from "./CharacterInfo";

const CharactersGrid = ({ characters, films, selectedFilms }) => {
  const [filteredCharacters, setFilteredCharacters] = useState(characters);

  useEffect(() => {
    const filtered = characters.filter((ch) =>
      ch.films.some((characterFilm) =>
        selectedFilms.some((film) => film.url === characterFilm)
      )
    );

    setFilteredCharacters(filtered);
  }, [selectedFilms, characters]);

  return (
    <div className="characters-grid">
      {filteredCharacters.length > 0 ? (
        <div>
          {filteredCharacters.map((character) => (
            <CharacterInfo
              key={character.name}
              character={character}
              films={films}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <p>Nothing found.</p>
        </div>
      )}
    </div>
  );
};

export default CharactersGrid;
