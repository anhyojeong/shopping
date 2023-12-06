import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const OrderList = ({ user }) => {
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
            collection(firestore, collectionName),
            where("orderNum", ">=", oneWeekAgo.toString())
          );

          const snapshot = await getDocs(q);

          const dataArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // 일별 구매내역으로 모으기
          const groupedData = dataArr.reduce((groups, item) => {
            // 문자열로 저장된 타임스탬프 숫자형으로 바꾸고 date 객체로 바꾸기
            const timestamp = new Date(Number(item.orderNum)); 

            // 날짜 포맷
            const formattedDate = timestamp.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            if (!groups[formattedDate]) {
              groups[formattedDate] = [];
              return(
                <div>
                    <h2>최근 구매 내역이 없습니다.</h2>
                </div>
              )
            }

            groups[formattedDate].push(item);
            
            return groups;
          }, {});

          setGroupedResults(groupedData);
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
    <div>
        <h2>최근 주문 내역</h2>
      {Object.entries(groupedResults).map(([date, orders]) => (
        <div key={date}>
          <h3>{date}</h3>
          <ul>
            {orders.map((order) => (
              <li key={order.id}>{order.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
