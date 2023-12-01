import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import useItemsImage from "../hooks/useItemsImage";
import useAddFirestore from "../hooks/useAddFirestore";

// 아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
// css
import "../css/itemInfo.css";

const ItemInfo = () => {
  // URL 매개변수에서 선택한 카테고리랑 아이템 이름 가져오기
  const { itemName, category } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // 리덕스에서 유저 정보 가져오기
  const [searchResults, setSearchResults] = useState([]); // 파이어스토어 쿼리 검색 결과 저장
  const [searchTerm, setSearchTerm] = useState(itemName); // 초기값을 useParams에서 가져온 itemName으로 설정
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [numOfOrderItems, setNumOfOrderItems] = useState(0); // 주문할 아이템 수
  const [totalAmount, setAmount] = useState(0);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm]); //searchTerm변경될 때마다

  // 이미지 URL 가져오기
  const imageUrl = useItemsImage(category, searchResults[0]?.name);

  // 구매 수량 빼기
  const minusOrderItemNum = () => {
    if (numOfOrderItems > 0) {
      // 0개 이상
      setNumOfOrderItems(numOfOrderItems - 1);
      setAmount((numOfOrderItems - 1) * searchResults[0]?.price);
    }
  };

  // 구매 수량 더하기
  const plusOrderItemNum = () => {
    setNumOfOrderItems(numOfOrderItems + 1);
    setAmount((numOfOrderItems + 1) * searchResults[0]?.price);
  };

  // 장바구니 버튼
  const { addCart } = useAddFirestore(
    user,
    "Cart",
    searchResults,
    numOfOrderItems,
    searchResults[0]?.price
  );

  // 바로구매 버튼
  const handleBuyNowClick = () => {
    navigate(`/order/${user.email}`, {
      state: { selectedItems: searchResults, quantity: numOfOrderItems },
    });
  };

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="item-img-container">
            {imageUrl ? (
              <img
                id="item-image"
                src={imageUrl}
                alt={`${category} - ${searchResults[0]?.name}`}
              />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
          <div className="item-container">
            <div className="item-info-container">
              {searchResults.map((result) => (
                <ul key={result.id}>
                  <li className="item-brand" id="brand">
                    {result.brand}
                  </li>
                  <li className="item-name" id="name">
                    {result.name}
                  </li>
                  <li className="item-price" id="price">
                    {" "}
                    {result.price.toLocaleString()}원
                  </li>
                </ul>
              ))}
            </div>
            <div className="item-orderSheet-container">
              <div className="orderSheet-item-count-area">
                <button onClick={minusOrderItemNum}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="orderSheet-label">{numOfOrderItems}</span>
                <button onClick={plusOrderItemNum}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <span className="orderSheet-label">
                총 금액 : {totalAmount.toLocaleString()}원
              </span>
            </div>
            <div className="item-btn-container">
              <button id="item-cart" onClick={addCart}>
                장바구니
              </button>
              <button id="item-buy" onClick={handleBuyNowClick}>
                바로구매
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemInfo;
