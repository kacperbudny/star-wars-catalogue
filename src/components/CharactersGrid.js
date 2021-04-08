import React from "react";
import CharacterInfo from "./CharacterInfo";

const CharactersGrid = ({ characters, setModalOpen, selectCharacter }) => {
  return (
    <div>
      {characters.map((character) => (
        <CharacterInfo
          key={character.name}
          character={character}
          setModalOpen={setModalOpen}
          selectCharacter={selectCharacter}
        />
      ))}
    </div>
  );
};

export default CharactersGrid;
