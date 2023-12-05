import React from "react";
import { useState } from "react";

const Shipping = () => {
  const [recipient, setRecipient] = useState(""); // 수령인
  const [address, setAddress] = useState(""); // 배송주소
  const [phoneNum, setPhoneNum] = useState(""); // 연락처

  const handleRecipientChange = (e) => {
    const inputText = e.target.value;
    console.log(inputText);
    setRecipient(inputText);
  };

  const handleAddressChange = (e) => {
    const inputText = e.target.value;
    console.log(inputText);
    setAddress(inputText);
  };

  const handlePhoneNumChange = (e) => {
    const inputText = e.target.value;
    console.log(inputText);
    setPhoneNum(inputText);
  };

  return (
    <section className="shipping-container">
      <h2>배송 정보</h2>
      <div className="shipping-input-container">
        <label htmlFor="recipient">
          수령인 :
          <input id="recipient" onChange={handleRecipientChange} />
        </label>
        <label htmlFor="address">
          배송지 :
          <input id="address" onChange={handleAddressChange} />
        </label>
        <label htmlFor="phoneNum">
          연락처 :
          <input id="phoneNum" onChange={handlePhoneNumChange} />
        </label>
      </div>
    </section>
  );
};

export default Shipping;
