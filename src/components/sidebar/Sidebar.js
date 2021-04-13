import React from "react";
import FilteringSection from "./FilteringSection";
import HamburgerIcon from "./HamburgerIcon";

const Sidebar = ({
  isHamburgerOpen,
  setIsHamburgerOpen,
  setSearchQuery,
  films,
  handleCheckboxChange,
}) => {
  return (
    <div className="sidebar">
      <HamburgerIcon
        isHamburgerOpen={isHamburgerOpen}
        setIsHamburgerOpen={setIsHamburgerOpen}
      />
      <h1>Star Wars Characters Catalogue</h1>
      <FilteringSection
        isHamburgerOpen={isHamburgerOpen}
        setSearchQuery={setSearchQuery}
        films={films}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

export default Sidebar;
