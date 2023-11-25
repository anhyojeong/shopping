import { firestore } from '../firebase';
import { getDocs, collection } from 'firebase/firestore';

// 선택한 카테고리에 따른 상품 가져오기
const LoadDB = async ({selectedCategory}) => {
    try {    
        const querySnapshot = await getDocs(collection(firestore, selectedCategory));
    
        const items = querySnapshot.docs.map((doc) => doc.data());
    
        return items;
      } catch (error) {
        console.error("Error loading data:", error);
        throw error;
      }
};

export default LoadDB;

