import React from "react";
import CharacterInfo from "./CharacterInfo";

const CharactersGrid = ({ characters, films }) => {
  return (
    <div>
      {characters.map((character) => (
        <CharacterInfo
          key={character.name}
          character={character}
          films={films}
        />
      ))}
    </div>
  );
};

export default CharactersGrid;
