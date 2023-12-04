import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const useAddBuy = (user, items) => {
    const addBuy= async()=>{
        if (!user) {
            alert("로그인 이후 이용 가능합니다.");
            return;
          }
        
          try {
            for (const item of items) {
              // 유저의 문서 참조
              const docRef = doc(firestore, `${user.email}Buy`, item.name);
        
              const inputData = {
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              };
              await setDoc(docRef, inputData);
              alert("구매 내역에 추가되었습니다.");
            }
          } catch (error) {
            console.error("에러 : ", error);
          }
    };
    return {addBuy};
  
};

export default useAddBuy;
