import { useState } from "react";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { firestore } from "../firebase";

const useAddBuy = (user, items) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMessage] = useState("");
  const [link, setLink] = useState("");

  // 파이어베이스 스토어에서 장바구니 비우기
  const collectionPath = `${user.email}Cart`;
  // 파이어베이스 스토어에서 장바구니 비우기
  const deleteAllDocuments = async (collectionPath) => {
    try {
      const collectionRef = collection(firestore, collectionPath); // 파이어스토어에서 참조할 컬렉션 경로
      const snapshot = await getDocs(collectionRef); // 컬렉션 안에 문서들 가져오기

      const deletePromises = [];

      snapshot.forEach((document) => {
        // 컬렉션의 문서마다 문서 경로 참조 생성
        const docRef = doc(collectionRef, document.id);
        deletePromises.push(deleteDoc(docRef)); // 넣어서
      });

      await Promise.all(deletePromises); // 삭제 실행 다 될 때까지 기다리기~

      console.log("장바구니 비우기 성공");
    } catch (error) {
      console.error("장바구니 비우기 실패 : ", error);
    }
  };

  const addBuy = async () => {
    if (!user) {
      setModalMessage("로그인 이후 이용 가능합니다.");
      setLink("/sign");
      setIsModalOpen(true);
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
          orderNum: timestamp.toString(),
        };
        await setDoc(docRef, inputData);
        deleteAllDocuments(collectionPath);

        // console.log("구매 내역이 추가되었습니다.");
      }
    } catch (error) {
      console.error("에러 : ", error);
    }
  };
  return { addBuy, isModalOpen, modalMsg, link, setIsModalOpen };
};

export default useAddBuy;
