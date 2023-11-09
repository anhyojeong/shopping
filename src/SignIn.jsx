import React from 'react';

const SignIn = () => {
    return(
    <div className="signForm-container signIn-container">
    <form className ="signForm" action="#">
      <h1 className ='sign-title'>로그인</h1>
      <p className = 'sign-subTitle' >이메일과 비밀번호를 모두 입력해주세요.</p>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button id="signIn-btn">Sign In</button>
    </form>
  </div>
    );
}

export default SignIn;