import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const useAddBuy = (user, items) => {
    const addBuy= async()=>{
      console.log(items);
        if (!user) {
            alert("로그인 이후 이용 가능합니다.");
            return;
          }
        
          try {
            for (const item of items) {
              const timestamp = Date.now(); // 현재 시간을 밀리초로 가져옴 (주문 번호로 사용)
              // 유저의 문서 참조
              const docRef = doc(firestore, `${user.email}Buy`, `${timestamp}`);
        
              const inputData = {
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              };
              await setDoc(docRef, inputData);
              console.log("구매 내역이 추가되었습니다.");
            }
          } catch (error) {
            console.error("에러 : ", error);
          }
    };
    return {addBuy};
  
};

export default useAddBuy;
