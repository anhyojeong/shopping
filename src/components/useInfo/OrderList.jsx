import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const OrderList = ({ user }) => {
  const [searchResults, setSearchResults] = useState([]);
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

          setSearchResults((arr) => [...arr, ...dataArr]); // setState 비동기 때문에 함수로 state 갱신

          console.log(dataArr);
          console.log(searchResults);
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
      주문 내역
      {searchResults.map((searchResult) => (
        <li>{searchResult.name}</li>
      ))}
    </div>
  );
};

export default OrderList;
