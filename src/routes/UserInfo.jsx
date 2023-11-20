import React from "react";
import { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import "../css/userInfo.css";

const UserInfo = () => {
  // 리덕스에서 유저 정보 가져오기
  const user = useSelector((state) => state.auth.user);
  console.log(user.displayName);

   if (!user || !user.displayName) {
    return (
      <div>
        <p>로그인먼 저 해주세요! </p>
        {/* 버튼 추가해서 로그인으로 링크 걸기*/}
      </div>
    );
  }

  // 사용자 정보가 있으면 화면에 표시
  return (
    <div className="user-info-container">
        <span>반가워요 {user.displayName}님!</span>
    </div>
  );
};

export default UserInfo;
