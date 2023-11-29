import React from "react";
import { useLocation } from "react-router-dom";

const Order = () => {
  // 네비게이션 중 state 가져오기
  const location = useLocation();
  const { selectedItems, quantity } = location.state;

  console.log(selectedItems);
  return (
    <div className=" cart-order-container">
      <div> 주문 / 결제하기</div>
      <div>
        <ul>
          {selectedItems.map((item) => (
            <li key={item.id}>{item.name} {item.numOfOrderItems}</li>
          ))}
        </ul>
        <p>수량: {quantity}</p>
      </div>
      <div> 결제 하기 </div>
    </div>
  );
};

export default Order;