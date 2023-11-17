import { firestore } from '../firebase';
import { getDocs, collection } from 'firebase/firestore';

const LoadDB = async ({selectedCategory}) => {
    try {    
        const querySnapshot = await getDocs(collection(firestore, selectedCategory));
    
        const products = querySnapshot.docs.map((doc) => doc.data());
    
        return products;
      } catch (error) {
        console.error("Error loading data:", error);
        throw error;
      }
};

export default LoadDB;