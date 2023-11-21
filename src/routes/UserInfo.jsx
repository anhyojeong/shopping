import React from "react";
import { useSelector } from "react-redux";
import RecentItems from "../components/useInfoComponent/RecentItems"
import "../css/userInfo.css";

const UserInfo = () => {
 // 리덕스에서 유저 정보 가져오기
 const user = useSelector((state) => state.auth.user);

 // 사용자 정보가 있으면 화면에 표시
 return (
   <div className="user-info-container">
     {user && (
       <>
         <span>반가워요 {user.displayName}님!</span>
         <RecentItems />
       </>
     )}
   </div>
 );
};

export default UserInfo;