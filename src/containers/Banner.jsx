import React from "react";
import { useState, useEffect } from "react";
import LoadStorageImages from "../hooks/LoadStorageImages";

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  const folderPath = "banner";
  const { imageUrls: loadedImageUrls } = LoadStorageImages(folderPath);

  useEffect(() => {
    setImageUrls(loadedImageUrls);
  }, [loadedImageUrls]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [imageUrls, currentImageIndex]);

  return (
    <div className="banner-container">
      {imageUrls.length ? (
        <div className="banner-image-container">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`배너 이미지 ${index + 1}`}
              className={`banner-image ${index === currentImageIndex ? "active" : ""}`}
              style={{ transform: `translateX(${-100 * currentImageIndex}%)` }}
            />
          ))}
        </div>
      ) : (
        <p>배너</p>
      )}
    </div>
  );
};

export default Banner;
