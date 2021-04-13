import React from "react";

const HamburgerIcon = ({ isHamburgerOpen, setIsHamburgerOpen }) => {
  return (
    <div
      className={`hamburger ${isHamburgerOpen ? "hamburger-on" : ""}`}
      onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
    >
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
};

export default HamburgerIcon;
