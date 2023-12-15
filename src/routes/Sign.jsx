import React from "react";
import { useState } from "react";
import SignUp from "../components/sign/SignUp";
import SignIn from "../components/sign/SignIn";
import Modal from "../Modal";
import "../css/sign.css";

const Sign = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalMsg(""); // 모달이 닫으면 메시지 초기화
  };

  return (
    <div className={`sign ${isSignUp ? "right-panel-active" : ""}`}>
      <SignIn />
      <SignUp onSignUpSuccess={() => {
        setModalMsg("🎉회원가입 성공🎉\n 자동 로그인 된 후, 홈페이지로 이동합니다.");
        setIsModalVisible(true);
        togglePanel(); // 모달이 나타나면서 화면 전환
      }} />
      {isModalVisible && (
        <Modal message={modalMsg} onClose={handleModalClose} linkType="/"/>
      )}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="sign-title">어서오세요!</h1>
            <p className="sign-subTitle">
              계정이 있으시다면 로그인 후 이용해 주세요.
            </p>
            <button
              className="hidden"
              onClick={() => {
                togglePanel();
              }}
              id="signIn"
            >
              로그인
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="sign-title">반가워요!</h1>
            <p className="sign-subTitle">
              계정이 없다면 회원가입을 먼저 해주세요.
            </p>
            <button
              className="hidden"
              onClick={() => {
                togglePanel();
              }}
              id="signUp"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
