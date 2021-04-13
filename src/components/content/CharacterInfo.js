import React, { useState } from "react";
import AnimateHeight from "react-animate-height";

const CharacterInfo = ({ character, films }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className={"character-card"}
    >
      <h3>{character.name}</h3>
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>
      <p>
        <strong>Birth year:</strong> {character.birth_year}
      </p>
      <AnimateHeight duration={500} height={isOpen ? "auto" : 0}>
        <div className="collapse">
          <p>
            <strong>Mass:</strong> {character.mass} kg
          </p>
          <p>
            <strong>Height:</strong> {character.height} cm
          </p>
          <p className="films">
            <strong>Films:</strong>
          </p>
          <ul>
            {character.films.map((characterFilm) => (
              <li key={characterFilm}>
                {films.find((film) => film.url === characterFilm).title}
              </li>
            ))}
          </ul>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default CharacterInfo;
