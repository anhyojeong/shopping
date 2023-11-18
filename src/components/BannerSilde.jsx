import React, { useState, useEffect } from "react";
import "../css/home.css";

const BannerSlide = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images, currentImage]);

  return (
    <div className="slide-container">
      {images.length ? (
        <div className="slide">
          <img
            className="slide-img"
            src={images[currentImage]}
            alt={`banner image ${currentImage + 1}`}
          />
        </div>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default BannerSlide;

