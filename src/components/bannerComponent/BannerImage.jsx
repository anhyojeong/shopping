import React, { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const BannerImage = ({ selectedCategory, product }) => {
  const [imageUrl, setImageUrl] = useState(null);

  // 이미지 가져오기
  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const imagePath = `${selectedCategory}/${product.name}.jpg`;
        const imageRef = ref(storage, imagePath);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        // console.error("Error getting image URL:", error);
      }
    };

    getImageUrl();
  }, [selectedCategory, product.name]);

  return (
    <div>
      {imageUrl ? (
        <img
          className="product-image"
          src={imageUrl}
          alt={`${selectedCategory} - ${product.name}`}
        />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default BannerImage;
