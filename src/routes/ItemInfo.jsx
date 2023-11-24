import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import "../css/itemInfo.css";

const ItemInfo = () => {
  // URL 매개변수에서 선택한 카테고리랑 아이템 이름 가져오기
  const { itemName, category } = useParams();

  const [searchResults, setSearchResults] = useState([]); // 파이어스토어 쿼리 검색 결과 저장
  const [searchTerm, setSearchTerm] = useState(itemName); // 초기값을 useParams에서 가져온 itemName으로 설정
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const isUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // firebase에서 특정 필드 검색하는 쿼리
        const q = query(
          collection(firestore, category),
          where("name", "==", searchTerm)
        );
        const snapshot = await getDocs(q);

        // 가져온 데이터 처리
        const dataArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 검색 결과 state에 저장
        setSearchResults(dataArr);
        setLoading(false); // 데이터 로딩이 완료되면 로딩 상태 업데이트
        console.log("Search Results:", dataArr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm]); //searchTerm변경될 때마다

  // 장바구니 버튼
  const getItemAtCart = () => {
    if (!isUser) {
      alert("로그인 이후 이용 가능합니다.");
      navigate("/sign");
    }
  };

  // 바로구매 버튼
  const goBuy = () => {
    if (!isUser) {
      alert("로그인 이후 이용 가능합니다.");
      navigate("/sign");
    }
  };

  return (
    <div className="item-container">
      <div className="item-img-container">
        <img src={searchResults.image} alt={searchResults.name} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="item-info-container">
          {searchResults.map((result) => (
            <ul key={result.id}>
              <li>{result.brand}</li>
              <li>{result.name}</li>
              <li>{result.price}</li>
            </ul>
          ))}
        </div>
      )}
      <div className="item-btn-container">
        <button onClick={getItemAtCart}>장바구니</button>
        <button onClick={goBuy}>바로구매</button>
      </div>
    </div>
  );
};

export default ItemInfo;
