import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadDB from "../hooks/LoadDB";
import "../css/cart.css";

const Cart = () => {
  const user = useSelector((state) => state.auth.user);
  const [cartItems, setCartItems] = useState([]);

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

  if (!user) {
    return null; // 아무것도 렌더링하지 않음
  }

  return (
    <section className="container">
      <div className="cart-title-container">
        <span>상품 정보</span>
        <span>수량</span>
        <span>주문 금액</span>
      </div>
      <>
        {cartItems.map((cartItem, index) => (
          <div className="cart-order-info" key={index}>
            <span>{cartItem.name}</span>
            <span>{cartItem.numOfOrderItems}</span>
            <span>{cartItem.totalAmount.toLocaleString()}원</span>
          </div>
        ))}
      </>
    </section>
  );
};

export default Cart;
