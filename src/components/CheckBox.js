import React, { useState } from "react";

const CheckBox = ({ film, handleCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(true);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    handleCheckboxChange(film.title);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          value={film.title}
          checked={isChecked}
          onChange={toggleCheckbox}
        />
        {film.title}
      </label>
    </div>
  );
};

export default CheckBox;
