import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase"; // Firebase 모듈에서 auth 가져오기

const SignUp = ({ onSignUpSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (!user) {
          setMsg("😢정보를 다시 입력해주세요😢");
        } else {
          // 회원가입 성공 시 모달 나오고 부모한테 알림
          onSignUpSuccess();
        }
        // 회원가입 성공하면 입력한 이름 저장
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            console.log("aa");
          })
          .catch((error) => {
            console.log(error);
          });
        onSignUpSuccess();
        
        // 입력한 정보 초기화
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className="signForm-container signUp-container">
      <form className="signForm" action="#">
        <h1 className="sign-title">회원가입</h1>
        <p className="sign-subTitle">
          이름, 이메일, 비밀번호를 모두 입력해주세요 
        </p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        {email && !/^\S+@\S+\.\S+$/.test(email) && (
          <p className="signUp-msg">올바른 이메일 형식이 아닙니다.</p>
        )}
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        {password.length > 0 && password.length < 6 && (
          <p className="signUp-msg">비밀번호는 6자리 이상이어야 합니다.</p>
        )}
        <button
          onClick={handleSignup}
          disabled={!name || !email || !password}
          id="signUp-btn"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
