// 아이템 추가
export const addItem = (item) => ({
  type: "ADDITEM",
  payload: item,
});

// 리듀서
const initialState = {
  items: [],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDITEM":
      // 사용자가 본 물건 저장
      localStorage.setItem("items", JSON.stringify(action.payload));
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};

export default itemReducer;
