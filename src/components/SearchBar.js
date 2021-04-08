import React, { useState } from "react";

const SearchBar = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search characters by name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
