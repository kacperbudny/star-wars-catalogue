import React from "react";
import Loader from "../Loader";
import CharactersGrid from "./CharactersGrid";

const MainContent = ({
  isLoadingCharacters,
  characters,
  films,
  selectedFilms,
  isLoadingMore,
  maxCharacters,
  loadMoreCharacters,
}) => {
  return (
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
                  <button type="button" onClick={() => loadMoreCharacters()}>
                    Load more
                  </button>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MainContent;
