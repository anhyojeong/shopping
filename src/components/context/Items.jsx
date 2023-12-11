import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem, selectItem } from "../../redux/itemActions";
import LoadDB from "../../hooks/LoadDB";
import ItemsImage from "./ItemsImage";

const Items = ({ selectedCategory }) => {
  const [itmes, setItmes] = useState([]); // 가져온 물건들
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 선택한 카테고리에 맞게 firestore에서 물건들 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await LoadDB({ selectedCategory });
        setItmes(data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData(); // 함수 호출
  }, [selectedCategory]); // selectedCategory 변경될 때마다 useEffect 실행

  // 최근 본 상품 저장
  const storeViewItem = (selectedItem) => {
    dispatch(addItem(selectedItem)); // 최근 본 상품 저장
  };

  // 제품 상세 페이지
  const goToItemDetail = (item) => {
    dispatch(selectItem(item));
    navigate(`/itemInfo/${item.name}`);
  };

  return (
    <div className="items-container">
      <p id="category-name">{selectedCategory}</p>
      <div className="items">
        {itmes.map((item, index) => (
          <div
            className="item-area"
            key={index}
            onClick={() => {
              storeViewItem(item.name); // 최근 본 상품 이름 저장
              goToItemDetail(item); // 상품 상세 페이지
            }}
          >
            <ul className="item">
              <ItemsImage
                selectedCategory={selectedCategory}
                item={item}
              />
              <li className="item-brand">{item.brand}</li>
              <li className="item-name ellipsis">
                {item.name}
              </li>
              <li className="item-price">{item.price.toLocaleString()}원</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
