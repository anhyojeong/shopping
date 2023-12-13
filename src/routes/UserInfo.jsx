import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import RecentItems from "../components/useInfo/RecentItems";
import OrderList from "../components/useInfo/OrderList";
import Category from "../components/context/Category";

import "../css/userInfo.css";

const UserInfo = () => {
  // 리덕스에서 유저 정보 가져오기
  const user = useSelector((state) => state.auth.user);

  const categories = ["최근 본 상품", "주문 내역"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // 카테고리 골랐을 때 state 변경
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // 사용자 정보가 있으면 화면에 표시
  return (
    <div className="user-info-container">
      <div className="user-info-left">
        <section className="user-name">
          {user && (
            <>
              <span>반가워요 {user.displayName}님!</span>
            </>
          )}
        </section>
        <section id="userinfo-category-container">
          <Category
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={handleCategorySelect}
          />
        </section>
      </div>

      <section className="userinfo-content-category">
        {selectedCategory === categories[0] ? (
          <RecentItems />
        ) : (
          <OrderList/>
        )}
      </section>
    </div>
  );
};

export default UserInfo;
