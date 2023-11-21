export const login = (user) => ({
  type: "LOGIN",
  payload: user,
});

export const logout = () => ({
  type: "LOGOUT",
});

// 리듀서
const initialState = {
  user: null,
  userInfo: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      // 로그인한 사람 정보를 세션 스토리지에 저장
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case "LOGOUT":
      // 로그인한 사람 정보를 세션 스토리지에서 제거
      sessionStorage.removeItem("user");
      return { ...state, user: null,};
    default:
      return state;
  }
};

export default authReducer;
