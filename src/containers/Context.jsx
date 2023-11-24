import React from "react";
import { useState } from "react";
import Category from "../components/context/Category";
import Items from "../components/context/Items";
import "../css/context.css";

const Context = () => {
  const categories = ["outer", "top", "bottom","acc"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // 카테고리 골랐을 때 state 변경
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="context-container">
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleCategorySelect}
      />
      <Items selectedCategory={selectedCategory} />
    </div>
  );
};

export default Context;
