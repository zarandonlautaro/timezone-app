import React from "react";
import "./SearchBar-module.css";

const SearchBar = (props) => {
  const { input, onChange, handleKeyDown } = props;

  const BarStyling = {
    background: "#FFFFFF",
    padding: "10px",
    borderRadius: "5px",
  };

  return (
    <input
      style={BarStyling}
      key='random1'
      value={input}
      placeholder='Find your timezone 🔍'
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e)}
    />
  );
};

export default SearchBar;
