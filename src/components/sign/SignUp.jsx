import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authActions";
import { auth } from "../../firebase"; // Firebase 모듈에서 auth 가져오기

const SignUp = ({ onSignUpSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  // #region 사용자 정보 입력
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // #endregion

  // 회원가입 오류 메세지
  const errorSignInMsg = (errType) => {
    const type = errType;

    switch (type) {
      case "auth/email-already-in-use":
        setMsg("이미 사용 중인 이메일입니다.");
        break;

      case "auth/weak-password":
        setMsg("비밀번호는 최소 6자리 이상이어야 합니다.");
        break;

      case "auth/invalid-email":
        setMsg("올바른 이메일 형식을 입력해주세요.");
        break;

      default:
        return;
    }
  };

  // 회원가입 되면 자동으로 로그인
  const autoLogin = async (auth, email, password) => {
    console.log("자동로그인");
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      dispatch(login(response.user));
    } catch (error) {
      console.error("Auto login failed:", error);
    }
  };

  // 회원가입 버튼 클릭
  const handleSignup = async () => {
    if (!name || !email || !password) {
      setMsg("이름 이메일 비밀번호를 모두 입력해주세요.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMsg("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    if (password.length < 6) {
      setMsg("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }

    // 회원가입 진행
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // if (!user) {
      //   setMsg("😢정보를 다시 입력해주세요😢");
      // } else {
      //   // 회원가입 성공하면 입력한 이름 저장
      //   console.log("회원가입 성공");
      //   await updateProfile(auth.currentUser, {
      //     displayName: name,
      //   });

      //   console.log("환영합니다!");
      //   onSignUpSuccess();
      //   await autoLogin(auth, email, password);
      // }

      if (!user) {
        setMsg("😢정보를 다시 입력해주세요😢");
        return;
      } else {
        // 회원가입 성공하면 입력한 이름 저장
        console.log("회원가입 성공");
        await autoLogin(auth, email, password);
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
  
        console.log("환영합니다!");
        onSignUpSuccess();
      }

     
      // 입력한 정보 초기화
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      const errorCode = error.code;
      console.error(errorCode);
      errorSignInMsg(errorCode);
    }
  };

  return (
    <div className="signForm-container signUp-container">
      <form className="signForm" action="#">
        <h1 className="sign-title">회원가입</h1>
        <p className="sign-subTitle">
          이름, 이메일, 6자리 이상의 비밀번호를 모두 입력해주세요.
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
          autoComplete="username"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          autoComplete="new-password"
          onChange={handlePasswordChange}
        />
        {msg && msg.length > 0 && <p>{msg}</p>}
        <button onClick={handleSignup} id="signUp-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
