import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const useItemsImage = (selectedCategory, itemName) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const imagePath = `${selectedCategory}/${itemName}.jpg`;
        const imageRef = ref(storage, imagePath);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error getting image URL:", error);
      }
    };

    getImageUrl();
  }, [selectedCategory, itemName]);

  return imageUrl;
};

export default useItemsImage;