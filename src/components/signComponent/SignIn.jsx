import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from '../../redux/authActions';
import { auth } from "../../firebase"; // Firebase 모듈에서 auth 가져오기
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch(login(response.user));
      console.log(response.user.uid);
      console.log(response.user.displayName);

      navigate("/");
    } catch (error) {
      console.error(error.code, error.message);
      if (error.code === 'auth/invalid-email' || error.code === 'auth/invalid-login-credentials') {
        setMsg('이메일이나 비밀번호가 올바르지 않습니다.');
      } else {
        setMsg('로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    }
  };

  // 폼 제출될 때 handleSignIn를 실행
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
  };

    return(
    <div className="signForm-container signIn-container">
    <form className ="signForm"  onSubmit={handleSubmit}>
      <h1 className ='sign-title'>로그인</h1>
      <p className = 'sign-subTitle' >이메일과 비밀번호를 모두 입력해주세요.</p>
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        {msg && <p>{msg}</p>}
      <button id="signIn-btn" onClick={handleSignIn} >Sign In</button>
    </form>
  </div>
    );
}

export default SignIn;