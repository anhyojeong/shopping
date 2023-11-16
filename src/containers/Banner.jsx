import React from "react";
import LoadStorageImages from "../hooks/LoadStorageImages";

const Banner = () => {
  const folderPath = 'banner'; // 가져오고자 하는 폴더의 경로
  const { imageUrls } = LoadStorageImages(folderPath);
  console.log(imageUrls);
  return (
    <div className="banner-container">
      {imageUrls ? (
        <div>
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`배너 이미지 ${index + 1}`} />
          ))}
        </div>
      ):(
        <p>배너</p>
      )}
    </div>
  );
};

export default Banner;
