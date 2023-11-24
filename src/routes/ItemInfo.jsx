import React from "react";
import { useSelector } from "react-redux";
import "../css/itemInfo.css";

const ItemInfo = () => {
  const selectedItem = useSelector((state) => state.item.selectItem);
  console.log(selectedItem);

  if (!selectedItem) {
    return <div>No item selected.</div>;
  }

  return (
    <div className="item-container">
      <div className="item-img-container">
        <img src={selectedItem.image} alt={selectedItem.name} />
      </div>
      <div className="item-info-container">
        <p>{selectedItem.name}</p>
        <p>{selectedItem.brand}</p>
        <p>{selectedItem.price}원</p>
      </div>
      <div className="item-btn-container">
        <button>장바구니</button>
        <button>바로구매</button>
      </div>
    </div>
  );
};

export default ItemInfo;
