import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/authActions";
// 아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faUser } from "@fortawesome/free-solid-svg-icons";

// css
import "../css/header.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); //리덕스 스토어에서 사용자 정보를 가져옴

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
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
    <nav className="nav-container">
      <ul className="nav-item-container">
        {user ? (
          <>
            {/* <li>{user.displayName}</li> */}
            <li className ="nav-item"> 
              <button
              className="header-btn">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  size="2x"
                  onClick={handleWishListClick}
                />
              </button>
            </li>
            <li className ="nav-item">
              <button
              className="header-btn">
                <FontAwesomeIcon icon={faUser} size="2x" />
              </button>
            </li>
            <li className ="nav-item">
              <button 
              className="header-btn"onClick={handleLogoutClick}>
                <span>Log Out</span>
              </button>
            </li>
          </>
        ) : (
          <>
            <li className ="nav-item">
              <button 
              className="header-btn"onClick={handleLoginClick}>
                <span>Log In</span>
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
