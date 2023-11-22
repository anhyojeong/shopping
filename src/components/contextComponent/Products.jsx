import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addItem  } from '../../redux/itemActions';
import LoadDB from "../../hooks/LoadDB";
import BannerImage from "../bannerComponent/BannerImage";

const Products = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]); // 가져온 물건들
  const dispatch = useDispatch();

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
  }, [selectedCategory]); //  selectedCategory 변경될 때마다 useEffect 실행

  // 사용자가 본 물건 저장
   const storeViewItem = (selectedProduct) => {
    dispatch(addItem(selectedProduct));  
  }

  return (
    <div className="products-container">
      <p id="category-name">{selectedCategory}</p>
      <div className="products">
        {products.map((product, index) => (
          <div className="product-area" key={index} onClick={() => storeViewItem(product.name)}>
            <ul className="product">
              <BannerImage
                selectedCategory={selectedCategory}
                product={product}
              />
              <li id="product-brand">{product.brand}</li>
              <li id="product-name" className="ellipsis">{product.name}</li>
              <li id="product-price">{product.price}원</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
