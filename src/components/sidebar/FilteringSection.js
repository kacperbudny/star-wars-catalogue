import React from "react";
import SearchBar from "./SearchBar";
import CheckBox from "./CheckBox";

const FilteringSection = ({
  isHamburgerOpen,
  setSearchQuery,
  films,
  handleCheckboxChange,
}) => {
  return (
    <div className={`filtering-section ${isHamburgerOpen ? "open" : ""}`}>
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
  );
};

export default FilteringSection;
