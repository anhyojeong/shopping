import React from "react";
import { useSelector } from "react-redux";

const RecentItems = () => {
  
  // 사용자가 봤던 아이템 가져옴
  const viewedItems = useSelector((state) => {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // 최근 본 상품을 역순으로 정렬
  const reversedViewedItems = viewedItems.slice().reverse();

  return (
    <div className="viewed-items-container">
        <p className="viewed-items-title">최근 본 상품</p>
      {reversedViewedItems.map((viewedItem, index) => (
        <li className="viewed-items" key={index}>{viewedItem}</li>
      ))}
    </div>
  );
};
export default RecentItems;
