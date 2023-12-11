import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState(""); // 검색어
  const [searchResults, setSearchResults] = useState([]); // 검색어 결과
  const [isFocus, setIsFocus] = useState(false); // 검색 입력창 포커스
  const searchContainerRef = useRef(null); // 검색 컨테이너 ref

  // 검색
  useEffect(() => {
    handleSearch();
  }, [searchWord]); // 검색어 바뀔 때 마다

  // 이벤트 리스너 등록
  useEffect(() => {
    // 컴포넌트 첨으로 화면에 마운트 될 때 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트될 때 없애기
    // 언마운트될 때, 이벤트 리스너 정리해놓으면 메모리 누수 방지 + 성능 최적화
    return () => {
      console.log("사라짐");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 파이어베이스에서 상품 검색하기
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

  // 포커스
  const handleFocusSearchContainer = () => {
    setIsFocus(true);
  };

  // 블러
  const handleBlurSearchContainer = () => {
    setIsFocus(false);
  };

  // 검색창 밖에 누를 때
  const handleClickOutside = (e) => {
    console.log(e.target);
    console.log("ref", searchContainerRef.current);
    if (
      // 검색 컨테이너 ref 있는지
      searchContainerRef.current &&
      // 클릭 이벤트 발생한 요소가 검색 컨테이너 안에 있는 게 아닌지
      !searchContainerRef.current.contains(e.target)
    ) {
      setIsFocus(false); // 검색 컨테이너 ref 있고 클릭 이벤트 발생한게 검색 컨테이너 밖이면 focus 취소
    }
  };

  const handleGoItemInfo = (itemName) => {
    navigate(`/itemInfo/${itemName}`);
  };

  return (
    <div
      className="search-container"
      onFocus={handleFocusSearchContainer}
      onBlur={handleBlurSearchContainer}
      ref={searchContainerRef}
    >
      <section id={`search${isFocus ? "-focused" : ""}`}>
        <input
          id="search-keyword"
          type="text"
          placeholder="Search..."
          onChange={handleSearchWordChange}
        />
        <button className="header-btn" id="header-search-btn">
          <FontAwesomeIcon icon={faSearch} size="2x" />
        </button>
      </section>
      {
        <section id="result">
          {isFocus &&
            searchResults.length > 0 &&
            searchResults.map((result, index) => (
              <div
                className="result-item"
                key={index}
                onClick={() => {
                  handleGoItemInfo(result.name);
                }}
              >
                <ul>
                  <li className="result-item-brand">{result.brand}</li>
                  <li className="result-item-name">{result.name}</li>
                </ul>
              </div>
            ))}
        </section>
      }
    </div>
  );
};

export default Search;
