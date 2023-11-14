import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <div className="search-container">
      <input id ="search-input" type="text" placeholder="Search..." />
      <button className="header-btn" id="header-search-btn">
        <FontAwesomeIcon icon={faSearch} size="2x" />
      </button>
    </div>
  );
};

export default Search;
