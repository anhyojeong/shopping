import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const RecentItems = () => {
  // 사용자가 봤던 아이템 가져옴
  const viewedItems = useSelector((state) => {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // useMemo를 사용하여 메모이제이션 적용
  const reversedViewedItems = useMemo(() => {
    // 최근 본 상품을 역순으로 정렬
    return viewedItems.slice().reverse();
  }, [viewedItems]); // viewedItems가 변경될 때만 다시 계산

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
