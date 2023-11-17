import React from "react";
import { useState, useEffect } from "react";
import LoadStorageImages from "../hooks/LoadStorageImages";
import BannerSlide from "../components/BannerSilde";

const Banner = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const folderPath = 'banner';
  const { imageUrls: loadedImageUrls } = LoadStorageImages(folderPath);

  useEffect(() => {
    setImageUrls(loadedImageUrls);
  }, [loadedImageUrls]);

  return (
    <div className="banner-container">
      {imageUrls.length ? (
        <BannerSlide imageUrls={imageUrls} />
      ) : (
        <p>배너</p>
      )}
    </div>
  );
};

export default Banner;
