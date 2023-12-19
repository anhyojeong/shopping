import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const useAddCart = (user, type, searchResults, quantity) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMessage] = useState("");
  const [link, setLink] = useState("");

  const addCart = async () => {
    if (!user) {
      setModalMessage("로그인 이후 이용 가능합니다.");
      setLink("/sign");
      setIsModalOpen(true);
      return;
    }
    if (quantity < 1) {
      setModalMessage("주문 수량은 최소 1개 이상이어야 합니다.");
      setLink(`/itemInfo/${searchResults[0].name}`);
      setIsModalOpen(true);
      return;
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

      // 장바구니
      if (type === "Cart") {
        // 이미 장바구니에 해당 아이템이 존재하는 경우
        if (cartDocSnapshot.exists()) {
          setModalMessage(
            "장바구니에 같은 상품이 이미 존재합니다.\n 장바구니로 이동하시겠습니까?"
          );
          setLink(`/cart/${user.email}`);
          setIsModalOpen(true);
        } else {
          const inputData = {
            name: searchResults[0].name,
            brand: searchResults[0].brand,
            quantity: quantity,
            price: searchResults[0].price,
          };
          await setDoc(docRef, inputData);

          setModalMessage(
            "장바구니에 추가되었습니다.\n 장바구니로 이동하시겠습니까?"
          );
          setLink(`/cart/${user.email}`);

          setIsModalOpen(true);
        }
      }
    } catch (error) {
      console.error("에러 : ", error);
    }
  };

  return { addCart, isModalOpen, modalMsg, link, setIsModalOpen  };
};

export default useAddCart;
