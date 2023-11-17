import React from "react";
import { useState, useEffect } from "react";
import { LoadDB } from "../hooks/LoadDB";

const Products = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]); // 가져온 물건들

  useEffect(() => {
    // 선택한 카테고리에 맞게 firestore에서 물건들 가져오기
    const fetchData = async () => {
      try {
        const data = await LoadDB({ selectedCategory });
        setProducts(data);
        console.log("Data loaded:", data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData(); // 함수 호출
  }, [selectedCategory]); //  selectedCategory가 변경될 때마다 useEffect 실행
 
  return (
    <div>
      <span>{selectedCategory}</span>
      <div>
        {products.map((product, index) => (
          <ul>
            <li key={index}>{product.이름}</li>
            <li>{product.가격}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Products;
