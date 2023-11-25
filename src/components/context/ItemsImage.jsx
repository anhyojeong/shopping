import React, { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const ItemsImage = ({ selectedCategory, item}) => {
  const [imageUrl, setImageUrl] = useState(null);

  // 이미지 가져오기
  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const imagePath = `${selectedCategory}/${item.name}.jpg`;
        const imageRef = ref(storage, imagePath);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        // console.error("Error getting image URL:", error);
      }
    };

    getImageUrl();
  }, [selectedCategory, item.name]);

  return (
    <div>
      {imageUrl ? (
        <img
          className="item-image"
          src={imageUrl}
          alt={`${selectedCategory} - ${item.name}`}
        />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ItemsImage;
