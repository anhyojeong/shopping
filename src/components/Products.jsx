import React from "react";
import { useState, useEffect } from "react";
import LoadDB from "../hooks/LoadDB";

const Products = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]); // 가져온 물건들

  // 선택한 카테고리에 맞게 firestore에서 물건들 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await LoadDB({ selectedCategory });
        setProducts(data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData(); // 함수 호출
  }, [selectedCategory]); //  selectedCategory가 변경될 때마다 useEffect 실행
 
  return (
    <div className="products-container">
      <p id="category-name">{selectedCategory}</p>
      <div className="products">
        {products.map((product, index) => (
          <div className="product" key={index}>
            <ul>
              <li>{product.name}</li>
              <li>{product.brand}</li>
              <li>{product.price}원</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;