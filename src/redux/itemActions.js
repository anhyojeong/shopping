// 아이템 추가
export const addItem = (item) => ({
  type: "ADDITEM",
  payload: item,
});

// 리듀서
const MAX_ITEMS =15; // 최대 아이템 수 (15개)

const initialState = {
  items: [],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDITEM":
      const newItem = action.payload;
      
      // 사용자가 본 물건 저장
      localStorage.setItem("items", JSON.stringify([...state.items, newItem]));
      
      // 아이템 수가 최대값을 초과하면 가장 오래된 아이템을 제거
      if (state.items.length >= MAX_ITEMS) {
        const updatedItems = state.items.slice(1); // 첫 번째 아이템 제거
        return { ...state, items: [...updatedItems, newItem] };
      } else {
        return { ...state, items: [...state.items, newItem] };
      }
      default:
      return state;
  }
};

export default itemReducer;
