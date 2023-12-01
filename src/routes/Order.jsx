import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useAddFirestore from "../hooks/useAddFirestore";

const Order = () => {
  // 네비게이션 중 state 가져오기
  const location = useLocation();
  const user = useSelector((state) => state.auth.user); // 리덕스에서 유저 정보 가져오기
  const { selectedItems, quantity } = location.state;

  console.log(typeof(quantity));
  // 구매하기 버튼
  const { addCart: handleBuyBtn } = useAddFirestore(
    user,
    "Buy",
    selectedItems.map((item) => ({
      name: item.name,
    })),
    selectedItems.map((item) => ({
      numOfOrderItems: item.numOfOrderItems,
    })),
    quantity.toString()
  );

  return (
    <div className="cart-order-container">
      <div>주문 / 결제하기</div>
      <div>
        <>
          {selectedItems.map((item) => (
            <ul key={item.id}>
              <li>{item.name}</li>
              <li> {item.numOfOrderItems}</li>
            </ul>
          ))}
        </>
        <p>금액: {quantity}</p>
      </div>
      <div>
        <button onClick={handleBuyBtn}>결제하기</button>
      </div>
    </div>
  );
};

export default Order;
