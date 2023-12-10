import React from "react";
import { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    handleSearch();
  }, [searchWord]); // 검색어 바뀔 때 마다

  const handleSearch = async () => {
    try {
      const itemsCollection = collection(firestore, "items");

      // 쿼리
      const q = query(
        itemsCollection,
        where("keyword", "array-contains", `${searchWord}`)
      );
      const snapshot = await getDocs(q);

      const results = [];
      snapshot.forEach((doc) => {
        results.push(doc.data()); // 가져온 문서의 데이터를 results 배열에 추가
      });
      console.log(results);
      setSearchResults(results); // 검색 결과 업데이트
    } catch (error) {
      console.error("Error searching items:", error);
    }
  };

  // 검색어 setState
  const handleSearchWordChange = (e) => {
    const inputText = e.target.value;
    setSearchWord(inputText);
  };

  return (
    <div className="search-container">
      <section id="search">
        <input
          id="search-input"
          type="text"
          placeholder="Search..."
          onChange={handleSearchWordChange}
        />
        <button className="header-btn" id="header-search-btn">
          <FontAwesomeIcon icon={faSearch} size="2x" />
        </button>
      </section>

      {searchResults ? (
        <section id="result">
          {searchResults.map((result, index) => (
            <div className="result-item" key={index}>
              <ul>
                <li className="result-item-brand">{result.brand}</li>
                <li className="result-item-name">{result.name}</li>
              </ul>
            </div>
          ))}
        </section>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;
