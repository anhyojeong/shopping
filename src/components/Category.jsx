import React from "react";

const Category = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="categories-container">
      <ul>
        {categories.map((category) => (
          <li
          key={category}
          className={`category ${category === selectedCategory ? 'selected' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
