// 장바구니 가져오기
export const setCart = (items) => ({
  type: "SET_ITEMS",
  payload: items,
});

// 장바구니 수량 변경
export const updateItemNum = (updatedItem) => ({
  type: "UPDATE_ITEM_NUM",
  payload: updatedItem,
});

// 리듀서
const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "UPDATE_ITEM_NUM":
      const updatedItems = state.items.map((item) => {
        if (item.name === action.payload.name) {
          return {
            ...item,
            numOfOrderItems: action.payload.numOfOrderItems,
          };
        }
        return item;
      });
      return {
        ...state,
        items: updatedItems,
      };
    default:
      return state;
  }
};

export default cartReducer;
