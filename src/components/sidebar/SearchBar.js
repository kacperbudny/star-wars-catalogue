import React, { useState } from "react";

const SearchBar = ({ handleChange }) => {
  const [text, setText] = useState("");

  return (
    <div>
      <form>
        <input
          type="text"
          className="search-bar"
          placeholder="Search characters by name"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleChange(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
