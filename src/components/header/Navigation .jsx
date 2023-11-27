import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../redux/authActions";
// 아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faUser } from "@fortawesome/free-solid-svg-icons";
// css
import "../../css/header.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      dispatch(login(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  // #region 로그인, 로그아웃
  const handleLoginClick = () => {
    navigate("/sign");
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  // #endregion

  // 장바구니
  const handleCartClick = () => {
    if (!user) {
      alert("로그인 이후 이용 가능합니다.");
      navigate("/sign");
      return;
    }
    navigate(`/cart/${user.email}`);
  };

  // userInfo
  const handleUserInfoClick = () => {
    if (!user) {
      alert("로그인 이후 이용 가능합니다.");
      navigate("/sign");
      return;
    }

      navigate(`/userInfo/${user.email}`);
  };

  return (
    <nav className="nav-container">
      <ul className="nav-item-container">
        {user ? (
          <>
            {/* <li>{user.displayName}</li> */}
            <li className="nav-item">
              <button className="header-btn">
                <FontAwesomeIcon
                  size="2x"
                  icon={faShoppingBag}
                  onClick={handleCartClick}
                />
              </button>
            </li>
            <li className="nav-item">
              <button className="header-btn">
                <FontAwesomeIcon
                  size="2x"
                  icon={faUser}
                  onClick={handleUserInfoClick}
                />
              </button>
            </li>
            <li className="nav-item">
              <button className="header-btn" onClick={handleLogoutClick}>
                <span>Log Out</span>
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <button className="header-btn" onClick={handleLoginClick}>
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
