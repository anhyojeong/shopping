import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useAddBuy from "../hooks/useAddBuy";
import Shipping from "../components/order/Shipping";
import "../css/order.css";

const Order = () => {
  // 네비게이션 중 state 가져오기
  const location = useLocation();
  const user = useSelector((state) => state.auth.user); // 리덕스에서 유저 정보 가져오기
  const { willBuyItems, quantity } = location.state;
  const [totalAllPrice, setTotalAllPrice] = useState(0);

  console.log(willBuyItems);
  console.log("quantity" + quantity);

  useEffect(() => {
    const totalPrice = willBuyItems.reduce(
      (acc, willBuyItem) =>
        acc +
        willBuyItem.price *
          (quantity === undefined ? willBuyItem.quantity : quantity),
      0
    );
    setTotalAllPrice(totalPrice);
  }, [totalAllPrice]);

  // 결제하기 버튼
  const { addBuy } = useAddBuy(
    user,
    willBuyItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: quantity === undefined ? item.quantity : quantity,
    }))
  );

  window.scrollTo(0, 0); // 스크롤 상단으로 이동

  return (
    <div className="cart-order-container">
      <h1 id="order-title">주문 / 결제하기</h1>
      <div className="order-container">
        <div className="order-list-container">
          <h2>주문 상품 정보</h2>
          <section className="order-item-list">
            {willBuyItems.map((item) => (
              <ul id="order-item" key={item.id}>
                <h3>{item.name}</h3>
                <li>
                  {" "}
                  수량 :{" "}
                  {quantity === undefined ? item.quantity : quantity}
                </li>
                <li id="item-price"> {item.price.toLocaleString()}원</li>
                <li className="total-price">
                  {" "}
                  금액 :{" "}
                  {(
                    item.price *
                    (quantity === undefined ? item.quantity : quantity)
                  ).toLocaleString()}
                  원
                </li>
              </ul>
            ))}
          </section>
        </div>
        <div className="order-detail-container">
          <Shipping />
          <section className="buy-container">
            <h2>결제금액</h2>
            <div className="total-container">
              <span>총 결제 금액</span>
              <span className="total-price" id ="order-total-price">{totalAllPrice.toLocaleString()}원</span>
            </div>
            <button onClick={addBuy}>결제하기</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Order;
