import React, { useState, useEffect } from 'react';
import '../css/home.css';

const BannerSlide = ({ imageUrls }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBanner((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [imageUrls, currentBanner]);

  return (
    <div className="slide-container">
      {imageUrls.length ? (
        <div className="slide">
          <img src={imageUrls[currentBanner]} alt={`배너 이미지 ${currentBanner + 1}`} />
        </div>
      ) : (
        <p>배너</p>
      )}
    </div>
  );
};

export default BannerSlide;