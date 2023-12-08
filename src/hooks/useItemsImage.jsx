import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const PATH ='items';

const useItemsImage = (itemName) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const imagePath = `${PATH}/${itemName}.jpg`;
        const imageRef = ref(storage, imagePath);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error getting image URL:", error);
      }
    };

    getImageUrl();
  }, [itemName]);

  return imageUrl;
};

export default useItemsImage;