import React from "react";

const Category = ({ categories, onSelect }) => {
  return (
    <div className="categories-container">
      <ul>
        {categories.map((category) => (
          <li className="category"key={category} onClick={() => onSelect(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
