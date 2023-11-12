import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch  } from "react-redux";
import { login, logout } from '../redux/authActions';

import { Link } from "react-router-dom";
import "../css/header.css"

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user); //리덕스 스토어에서 사용자 정보를 가져옴
  
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
          dispatch(login(JSON.parse(storedUser)));
        }
      }, [dispatch]);

    const handleLoginClick = () => {
      navigate("/sign");
    };

    const handleLogoutClick = () => {
        dispatch(logout());
      };

    const handleWishListClick = () => {
      // 장바구니
    };

  return (
    <div className="container">
    <Link to="/">Home</Link>
    <nav className="container">
      <ul id = 'nav-Container'>
        <li>
            <input type="text"></input>
        </li>
        {user ? (
          <>
            <li>{user.displayName}</li>
            <li>
              <button onClick={handleWishListClick}>장바구니</button>
            </li>
            <li>
                <button onClick={handleLogoutClick}>로그아웃</button>
              </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={handleLoginClick}>로그인</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  </div>
  );
};

export default Header;
