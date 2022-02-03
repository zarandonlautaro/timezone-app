import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
    const { input, onChange, handleKeyDown } = props;

    return (
        <input
            className={styles.searchBar}
            key="random1"
            value={input}
            placeholder="🔍 Please can you add your own timezone?"
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
        />
    );
};

export default SearchBar;
