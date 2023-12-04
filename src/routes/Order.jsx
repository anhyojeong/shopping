import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useAddBuy from "../hooks/useAddBuy";

const Order = () => {
  // 네비게이션 중 state 가져오기
  const location = useLocation();
  const user = useSelector((state) => state.auth.user); // 리덕스에서 유저 정보 가져오기
  const { selectedItems, quantity } = location.state;

  // 구매하기 버튼
  const { addBuy } = useAddBuy(
    user,
    selectedItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: quantity,
    }))
  );
console.log(selectedItems, quantity);
  return (
    <div className="cart-order-container">
      <div>주문 / 결제하기</div>
      <div>
        <>
          {selectedItems.map((item) => (
            <ul key={item.id}>
              <li>{item.name}</li>
              <li> {item.quantity}</li>
            </ul>
          ))}
        </>
        <p>금액: {quantity}</p>
      </div>
      <div>
        <button onClick={addBuy}>결제하기</button>
      </div>
    </div>
  );
};

export default Order;
