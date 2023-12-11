import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const PATH ='items';

const useItemsImage = (itemName) => {
  const [imageUrl, setImageUrl] = useState('');
  console.log(itemName);
  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const currentName = itemName; // 현재 itemName 저장
        const imagePath = `${PATH}/${currentName}.jpg`; // 현재 itemName 사용
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