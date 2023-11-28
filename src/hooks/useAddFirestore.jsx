import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const useAddFirestore = (user, type, searchResults, numOfOrderItems, totalAmount) => {
    // 장바구니
    const addCart = async () => {
    if (!user) {
      alert("로그인 이후 이용 가능합니다.");
      return;
    }
    if(numOfOrderItems<1){
      alert("주문 수량은 최소 1개 이상이어야 합니다.");
    }
    try {
      // 유저의 문서 참조
      const docRef = doc(
        firestore,
        `${user.email}${type}`,
        searchResults[0].name
      );

      // 해당 문서의 스냅샷 가져오기
      const cartDocSnapshot = await getDoc(docRef);

      // 이미 장바구니에 해당 아이템이 존재하는 경우
      if (cartDocSnapshot.exists()) {
        alert("장바구니에 같은 상품이 이미 존재합니다.");
      } else {
        const inputData = {
          name: searchResults[0].name,
          numOfOrderItems: numOfOrderItems,
          totalAmount: totalAmount,
        };

        // 새로운 문서 추가
        await setDoc(docRef, inputData);
        alert("장바구니에 추가되었습니다.");
      }
    } catch (error) {
      console.error("에러 : ", error);
    }
  };
  return { addCart };
};

export default useAddFirestore;
