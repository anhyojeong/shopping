import { useState, useEffect} from 'react';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebase'; 

const LoadStorageImage =  (folderPath) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImagesFromFolder = async () => {
      try {
        const folderRef = ref(storage, folderPath);
        const files = await listAll(folderRef);

        const urls = await Promise.all(
          files.items.map(async (file) => {
            const url = await getDownloadURL(file);
            return url;
          })
        );
        setImageUrls(urls);
      } catch (error) {
        console.error('가져오기 실패', error);
      } 
    };

    fetchImagesFromFolder();
  }, [folderPath]);

  return { imageUrls };
};

export default LoadStorageImage;
