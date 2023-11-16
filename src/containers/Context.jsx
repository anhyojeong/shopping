import React from "react";
import { useState } from "react";
import Category from "../components/Category";
import Products from "../components/Products";
import "../css/context.css"

const Context = () => {
  const categories = ['outer','acc']
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };


  return (
    <div className="context-container">
        <Category categories={categories} onSelect={handleCategorySelect} />
        <Products selectedCategory={selectedCategory}/>
    </div>
  );
};

export default Context;
