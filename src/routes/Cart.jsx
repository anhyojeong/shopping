import React from "react";
import { useState, useEffect } from "react";
// 리덕스
import { useSelector, useDispatch } from "react-redux";
import { setCart, updateItemNum } from "../redux/cartActions";
// 파이어베이스
import { firestore } from "../firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
// hooks
import LoadDB from "../hooks/LoadDB";
// 아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
// css
import "../css/cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items); // Redux에서 물건들을 가져오기
  const [totalOrderAmount, setTotalOrderAmount] = useState(0); // 총 금액

  // firestore에서 물건들 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const selectedCategory = `${user.email}Cart`;
          const data = await LoadDB({ selectedCategory });
          // 리덕스 액션을 통해 물건들을 상태에 업데이트
          dispatch(setCart(data));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData(); // 함수 호출
  }, [user]); // useEffect를 user가 변경될 때만 실행되도록 변경(굳이,,,,할 필요없을 거 같기도 하고,,,ㅎ)

  // 총 금액 계산하기
  useEffect(() => {
    // 리덕스에서 가져온 물건들의 총 금액을 계산
    const totalAmount = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.totalAmount * cartItem.numOfOrderItems,
      0
    );
    setTotalOrderAmount(totalAmount);
  }, [cartItems]);

  // 주문 수량 변경
  const handleQuantityChange = async (item, newNumOfOrderItems) => {
    const updatedItem = {
      // 새로 업데이트 할 아이템 ( 수량 변경된 거 )
      ...item,
      numOfOrderItems: newNumOfOrderItems,
    };

    dispatch(updateItemNum(updatedItem)); // 디스패치

    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.name === updatedItem.name ? updatedItem : cartItem
    );

    // 변경된 수량 맞게 해당 상품 주문 금액 변경
    const updatedTotalAmount = updatedCartItems.reduce(
      (acc, cartItem) => acc + cartItem.totalAmount,
      0
    );

    // 전체 주문 금액 변경
    setTotalOrderAmount(updatedTotalAmount);

    try {
      const userCartRef = doc(firestore, `${user.email}Cart`, item.name); // 경로
      const cartSnapshot = await getDoc(userCartRef); // 가져오기
    
      if (cartSnapshot.exists()) { // 있으면
        const cartData = cartSnapshot.data(); 
    
        if (cartData) { // 새로 업데이트 하기
          const updatedItemInCart = {
            ...cartData,
            numOfOrderItems: updatedItem.numOfOrderItems
          };
    
          await updateDoc(userCartRef, updatedItemInCart);
          console.log("db 수정");
        } 
      } 
    } catch (error) {
      console.error("db 오류 : ", error);
    }
  };

  // #region 렌더링
  // 유저 가져오기 전까지 아무것도 렌더링하지 않음
  if (!user) {
    return null;
  }
  return (
    <div className="cart-order-container">
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
                <button
                  onClick={() =>
                    handleQuantityChange(cartItem, cartItem.numOfOrderItems - 1)
                  }
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{cartItem.numOfOrderItems}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(cartItem, cartItem.numOfOrderItems + 1)
                  }
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <span>
                {(
                  cartItem.numOfOrderItems * cartItem.totalAmount
                ).toLocaleString()}
                원
              </span>
            </div>
          ))}
        </>
      </section>
      <section className="order-container">
        <div className="order-amount-container">
          <span id="order-title">총 결제금액</span>
          <span>{totalOrderAmount.toLocaleString()}원</span>
        </div>
        <div className="order-type-container">
          <button id="keepShopping-btn">계속 둘러보기</button>
          <button id="goOrder-btn">구매하기</button>
        </div>
      </section>
    </div>
  );
  // #endregion
};

export default Cart;
