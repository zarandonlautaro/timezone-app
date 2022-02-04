import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
    const { value, onChange, handleKeyDown, children } = props;

    return (
        <>
            <input
                className={styles.searchBar}
                key="random1"
                value={value}
                placeholder="🔍 Add your timezone"
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            {children}
        </>
    );
};

export default SearchBar;
