import React from "react";

const ModalContent = ({ character, films }) => {
  return (
    <div>
      <h3>{character.name}</h3>
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>
      <p>
        <strong>Birth year:</strong> {character.birth_year}
      </p>
      <p>
        <strong>Mass:</strong> {character.mass} kg
      </p>
      <p>
        <strong>Height:</strong> {character.height} cm
      </p>
      <p>
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
  );
};

export default ModalContent;
