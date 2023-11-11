import React, { useState } from 'react';
import SignUp from './coponents/SignUp';
import SignIn from './coponents/SignIn';
import "./css/sign.css";

const App = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
      <SignIn>
      </SignIn>
      <SignUp></SignUp>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="sign-title">어서오세요!</h1>
            <p className = 'sign-subTitle'>계정이 있으시다면 로그인 후 이용해 주세요.</p>
            <button className="hidden" onClick={togglePanel} id="signIn">
              로그인
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="sign-title">반가워요!</h1>
            <p className = 'sign-subTitle' >계정이 없다면 회원가입을 먼저 해주세요.</p>
            <button className="hidden" onClick={togglePanel} id="signUp">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;