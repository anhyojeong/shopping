import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 리덕스
import { useSelector, useDispatch } from "react-redux";
import { setCart, updateItemNum } from "../redux/cartActions";
// 파이어베이스
import { firestore } from "../firebase";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";
// hooks
import LoadDB from "../hooks/LoadDB";
// 아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
// css
import "../css/cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items); // Redux에서 물건들을 가져오기
  const [totalOrderPrice, setTotalOrderPrice] = useState(0); // 총 금액

  // firestore에서 유저 장바구니에 있는 물건들 가져오기
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
  }, [user]); // useEffect를 user가 변경될 때만 실행되도록 변경

  // 총 금액 계산하기
  useEffect(() => {
    // 리덕스에서 가져온 물건들의 총 금액을 계산
    const totalPrice = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0
    );
    setTotalOrderPrice(totalPrice);
  }, [cartItems]);

  // 주문 수량 변경
  const handleQuantityChange = async (item, newQuantity) => {
    // 장바구니 내에 수량 최소 1개
    newQuantity = Math.max(1, newQuantity);

    const updatedItem = {
      // 새로 업데이트 할 아이템 ( 수량 변경된 거 )
      ...item,
      quantity: newQuantity,
    };

    dispatch(updateItemNum(updatedItem)); // 디스패치

    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.name === updatedItem.name ? updatedItem : cartItem
    );

    // 변경된 수량 맞게 해당 상품 주문 금액 변경
    const updatedPrice = updatedCartItems.reduce(
      (acc, cartItem) => acc + cartItem.price,
      0
    );

    // 전체 주문 금액 변경
    setTotalOrderPrice(updatedPrice);

    try {
      const userCartRef = doc(firestore, `${user.email}Cart`, item.name); // 경로
      const cartSnapshot = await getDoc(userCartRef); // 가져오기

      if (cartSnapshot.exists()) {
        // 있으면
        const cartData = cartSnapshot.data();

        if (cartData) {
          // 새로 업데이트 하기
          const updatedItemInCart = {
            ...cartData,
            quantity: updatedItem.quantity,
          };

          await updateDoc(userCartRef, updatedItemInCart);
          console.log("db 수정");
        }
      }
    } catch (error) {
      console.error("db 오류 : ", error);
    }
  };

  // 파이어베이스 스토어에서 장바구니 비우기
  const deleteAllDocuments = async (collectionPath) => {
    try {
      const collectionRef = collection(firestore, collectionPath); // 파이어스토어에서 참조할 컬렉션 경로
      const snapshot = await getDocs(collectionRef); // 컬렉션 안에 문서들 가져오기

      const deletePromises = [];

      snapshot.forEach((document) => { // 컬렉션의 문서마다 문서 경로 참조 생성
        const docRef = doc(collectionRef, document.id);
        deletePromises.push(deleteDoc(docRef)); // 넣어서
      });

      await Promise.all(deletePromises); // 삭제 실행 다 될 때까지 기다리기~

      console.log("장바구니 비우기 성공");
    } catch (error) {
      console.error("장바구니 비우기 실패 : ", error);
    }
  };

  // 주문하기 버튼 클릭
  const handleOrderBtn = () => {
    // 파이어베이스 스토어에서 장바구니 비우기
    const collectionPath = `${user.email}Cart`;
    deleteAllDocuments(collectionPath);

    // 구매 페이지로 이동
    navigate(`/order/${user.email}`, { state: { willBuyItems: cartItems } });
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
                    handleQuantityChange(cartItem, cartItem.quantity - 1)
                  }
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{cartItem.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(cartItem, cartItem.quantity + 1)
                  }
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <span>
                {(cartItem.quantity * cartItem.price).toLocaleString()}원
              </span>
            </div>
          ))}
        </>
      </section>
      <section className="cart-summary">
        <div className="cart-price-container">
          <span id="cart-title">총 결제금액</span>
          <span>{totalOrderPrice.toLocaleString()}원</span>
        </div>
        <div className="cart-type-container">
          <button id="keepShopping-btn" onClick={() => navigate("/")}>
            계속 둘러보기
          </button>
          <button id="goOrder-btn" onClick={handleOrderBtn}>
            구매하기
          </button>
        </div>
      </section>
    </div>
  );
  // #endregion
};

export default Cart;
