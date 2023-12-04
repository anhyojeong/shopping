import React from "react";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useAddBuy from "../hooks/useAddBuy";

const Order = () => {
  // 네비게이션 중 state 가져오기
  const location = useLocation();
  const user = useSelector((state) => state.auth.user); // 리덕스에서 유저 정보 가져오기
  const { willBuyItems,quantity } = location.state;
  const [totalAllPrice, setTotalAllPrice]=useState(0);

  console.log(willBuyItems);
  console.log("quantity"+quantity);

  useEffect(()=>{
    const totalPrice = willBuyItems.reduce(
      (acc,willBuyItem) => acc + willBuyItem.price *(quantity===undefined? willBuyItem.quantity : quantity), 0
    )
      setTotalAllPrice(totalPrice);
  },[totalAllPrice]);


  // 결제하기 버튼
  const { addBuy } = useAddBuy(
    user,
    willBuyItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: quantity,
    }))
  );


  return (
    <div className="cart-order-container">
      <div>주문 / 결제하기</div>
      <div>
        <>
          {willBuyItems.map((item) => (
            <ul key={item.id}>
              <li>{item.name}</li>
              <li> {quantity===undefined? item.quantity : quantity}</li>
              <li> {item.price}</li>
              <li> {item.price * (quantity===undefined? item.quantity : quantity)}</li>
            </ul>
          ))}
        </>
        <p>금액:{totalAllPrice}</p>
      </div>
      <div>
        <button onClick={addBuy}>결제하기</button>
      </div>
    </div>
  );
};

export default Order;
