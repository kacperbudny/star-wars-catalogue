import React from "react";

const CharacterInfo = ({ character, setModalOpen, selectCharacter }) => {
  return (
    <div
      onClick={() => {
        setModalOpen();
        selectCharacter(character);
      }}
    >
      <h3>{character.name}</h3>
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>
      <p>
        <strong>Birth year:</strong> {character.birth_year}
      </p>
    </div>
  );
};

export default CharacterInfo;
