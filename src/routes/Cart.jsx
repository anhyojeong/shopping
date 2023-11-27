import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadDB from "../hooks/LoadDB";
// 아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
// css
import "../css/cart.css";

const Cart = () => {
  const user = useSelector((state) => state.auth.user);
  const [cartItems, setCartItems] = useState([]); // 장바구니 아이템 가져오기
  const [totalOrderAmount, setTotalOrderAmount] = useState(0); // 총 금액

  // 선택한 카테고리에 맞게 firestore에서 물건들 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const selectedCategory = `${user.email}Cart`;
          console.log(selectedCategory);
          const data = await LoadDB({ selectedCategory });
          setCartItems(data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData(); // 함수 호출
  }, [user]); // useEffect를 user가 변경될 때만 실행되도록 변경

  // 총 금액, 총 수량
  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.totalAmount,
      0
    );
    setTotalOrderAmount(totalAmount);
  }, [cartItems]);

  // 유저 가져오기 전까지 아무것도 렌더링하지 않음
  if (!user) {
    return null;
  }

  return (
    <div className="acontainer">
      <section className="cart-container">
        <div className="cart-title-container">
          <span>상품 정보</span>
          <span>수량</span>
          <span>주문금액</span>
        </div>
        <>
          {cartItems.map((cartItem, index) => (
            <div className="cart-item-container" key={index}>
              <span>{cartItem.name}</span>
              <div>
                <button>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{cartItem.numOfOrderItems}</span>
                <button>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <span>{cartItem.totalAmount.toLocaleString()}원</span>
            </div>
          ))}
        </>
      </section>
      <section className="order-container"> 
        <div className="order-amount-container">
          <span id ="order-title">총 결제금액</span>
          <span>{totalOrderAmount.toLocaleString()}원</span>
        </div>
        <div className="order-type-container">
            <button id="keepShopping-btn">계속 둘러보기</button>
            <button id="goOrder-btn">구매하기</button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
