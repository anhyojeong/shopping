import React from "react";

const Category = ({ categories, onSelect }) => {
  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category} onClick={() => onSelect(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
