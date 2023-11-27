import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import useItemsImage from "../hooks/useItemsImage";
// 아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
// css
import "../css/itemInfo.css";

const ItemInfo = () => {
  // URL 매개변수에서 선택한 카테고리랑 아이템 이름 가져오기
  const { itemName, category } = useParams();
  // 리덕스에서 유저 정보 가져오기
  const user = useSelector((state) => state.auth.user);
  const [searchResults, setSearchResults] = useState([]); // 파이어스토어 쿼리 검색 결과 저장
  const [searchTerm, setSearchTerm] = useState(itemName); // 초기값을 useParams에서 가져온 itemName으로 설정
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [numOfOrderItems, setNumOfOrderItems] = useState(0); // 주문할 아이템 수
  const [totalAmount, setAmount] = useState(0);
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
  const addToCart = async () => {
    if (!isUser) {
      alert("로그인 이후 이용 가능합니다.");
      navigate("/sign");
      return;
    }
    if (numOfOrderItems < 1) {
      alert("상품의 수량은 1개 이상이어야 합니다.");
    } else {
      try {
        // 유저의 장바구니 문서 참조
        const cartDocRef = doc(
          firestore,
          `${user.displayName}Cart`,
          searchResults[0].name
        );

        // 해당 문서의 스냅샷 가져오기
        const cartDocSnapshot = await getDoc(cartDocRef);

        // 이미 장바구니에 해당 아이템이 존재하는 경우
        if (cartDocSnapshot.exists()) {
          alert("장바구니에 같은 상품이 이미 존재합니다.");
          // const currentAmount = cartDocSnapshot.data().amount || 0;
          // const currentTotalPrice = cartDocSnapshot.data().totalPrice || 0;

          // // 총 주문 수량 및 총 금액 업데이트
          // const updatedAmount = currentAmount + numOfOrderItems;
          // const updatedTotalPrice = currentTotalPrice + totalAmount;

          // // 해당 필드 업데이트
          // await updateDoc(cartDocRef, {
          //   amount: updatedAmount,
          //   totalPrice: updatedTotalPrice,
          // });
        } else {
          // 장바구니에 해당 아이템이 존재하지 않는 경우
          const cartData = {
            numOfOrderItems: numOfOrderItems,
            totalAmount: totalAmount,
          };

          // 새로운 문서 추가
          await setDoc(cartDocRef, cartData);
          alert("장바구니에 추가되었습니다.");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  // 바로구매 버튼
  const goBuyNow = () => {
    if (!isUser) {
      alert("로그인 이후 이용 가능합니다.");
      navigate("/sign");
    }
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
                <button>
                  <FontAwesomeIcon icon={faMinus} onClick={minusOrderItemNum} />
                </button>
                <span className="orderSheet-label">{numOfOrderItems}</span>
                <button>
                  <FontAwesomeIcon icon={faPlus} onClick={plusOrderItemNum} />
                </button>
              </div>
              <span className="orderSheet-label">
                총 금액 : {totalAmount.toLocaleString()}원
              </span>
            </div>
            <div className="item-btn-container">
              <button id="item-cart" onClick={addToCart}>
                장바구니
              </button>
              <button id="item-buy" onClick={goBuyNow}>
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
