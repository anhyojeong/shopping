import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/authActions';
import { auth } from "../firebase"; // Firebase 모듈에서 auth 가져오기
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch(login(response.user));
      console.log("성공");
    } catch (error) {
      console.error(error.message);
    }
  };

    return(
    <div className="signForm-container signIn-container">
    <form className ="signForm" action="#">
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
      <button id="signIn-btn" onClick={handleSignIn} >Sign In</button>
    </form>
  </div>
    );
}

export default SignIn;