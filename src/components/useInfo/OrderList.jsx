import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const OrderList = () => {
  // 리덕스에서 유저 정보 가져오기
  const user = useSelector((state) => state.auth.user);
  const [groupedResults, setGroupedResults] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          // 현재 날짜를 기준으로 일주일 전의 타임스탬프 계산
          const curTimestamp = Date.now();
          const oneWeekAgo = curTimestamp - 7 * 24 * 60 * 60 * 1000;

          const collectionName = user.email + "Buy";

          const q = query(
            // 쿼리
            collection(firestore, collectionName),
            where("orderNum", ">=", oneWeekAgo.toString())
          );

          const snapshot = await getDocs(q); // 쿼리 결과

          // 받아온 결과에서 아이템 분리
          const dataArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // 일별 구매내역으로 모으기
          const groupedData = dataArr.reduce((groups, item) => {
            // 문자열로 저장된 타임스탬프 숫자형으로 바꾸고(필수!) date 객체로 바꾸기
            const timestamp = new Date(Number(item.orderNum));

            // 날짜 포맷
            const formattedDate = timestamp.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            if (!groups[formattedDate]) {
              groups[formattedDate] = [];
            }

            groups[formattedDate].push(item);

            return groups;
          }, {});

          setGroupedResults(groupedData);
          console.log(groupedResults);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="orderList-container">
      <h1 className="order-content-title">주문 내역</h1>
      {Object.entries(groupedResults).map(([date, orders]) => (
        <div className="order-items" key={date}>
          <h2 id="order-date">주문 일자 : {date}</h2>
          <div className="order-title-container">
            <span>주문 번호</span>
            <span>상품 정보</span>
            <span>배송 정보</span>
          </div>
          {orders.map((order) => (
            <ul className="order-item-container" key={order.id}>
              <li className="order-item-info">{order.id}</li>
              <ul>
                <li>{order.name}</li>
                <li>
                  {order.price.toLocaleString()}원 / 수량 {order.quantity}개
                </li>
              </ul>
              <li className="order-item-info">배송 완료</li>
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
