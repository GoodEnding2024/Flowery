import React, { useState } from "react";
import styles from "./PrintCard.module.scss";
import camera from "../../assets/add_logo.png";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { storeId } from "../../recoil/atom";
interface modalProps {
  closeModal: () => void;
}

export default function GoodsAdd(props: modalProps) {
  const [GoodsName, setGoodsName] = useState<string>("");
  const [GoodsPrice, setGoodsPrice] = useState<string>("");
  const [GoodsDetail, setGoodsDetail] = useState<string>("");
  const [photoUrl2, setPhotoUrl2] = useState<string | null>(null);
  const [formdatas, setFormdatas] = useState<FormData | null>(null);
  const myStoreId = useRecoilValue(storeId);

  function handleClick() {
    props.closeModal();
  }

  function handleProductNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setGoodsName(event.target.value);
  }

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setGoodsPrice(event.target.value);
    } else {
      alert("숫자만 입력해야 합니다.");
    }
  }
  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setGoodsDetail(event.target.value);
  }

  function handleCameraClick2() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "camera";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const formData2 = new FormData();
        formData2.append("pictures", file);
        formData2.append("storeId", String(myStoreId));
        formData2.append("goodsName", String(GoodsName));
        formData2.append("goodsPrice", String(GoodsPrice));
        formData2.append("goodsDetail", String(GoodsDetail));
        console.log(file, myStoreId, GoodsName, GoodsPrice, GoodsDetail);
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotoUrl2(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        setFormdatas(formData2);
      }
    };
    input.click();
  }

  function handlePrint() {
    fetch("https://flowery.duckdns.org/api/goods", {
      method: "POST",
      body: formdatas,
    }).then((response) => {
      alert("등록이 완료되었습니다.");
    });
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.stepone}>
          <div>
            {photoUrl2 ? (
              <img
                src={photoUrl2}
                alt="captured"
                onClick={handleCameraClick2}
              ></img>
            ) : (
              <img
                src={camera}
                alt="camera icon"
                onClick={handleCameraClick2}
              ></img>
            )}
          </div>
          <div>
            <p className={styles.steptitle}>상품 사진을 추가해주세요</p>
            <p className={styles.stephint}>
              ※ 반드시 한 장 이상 추가되어야 합니다.
            </p>
          </div>
        </div>
        <div className={styles.stepone}>
          <div className="w-[100%]">
            <label
              htmlFor="default-input1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              상품명
            </label>
            <input
              placeholder="상품명을 입력해주세요."
              type="text"
              id="default-input1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={GoodsName}
              onChange={handleProductNameChange}
            ></input>
          </div>
          <div className="w-[100%]">
            <label
              htmlFor="default-input2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              가격
            </label>
            <input
              placeholder="가격을 입력해주세요."
              type="text"
              id="default-input2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={GoodsPrice}
              onChange={handlePriceChange}
            ></input>
          </div>
          <div className="w-[100%]">
            <label
              htmlFor="default-input3"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              상품 소개
            </label>
            <input
              placeholder="상품 소개를 입력해주세요."
              type="text"
              id="default-input3"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={GoodsDetail}
              onChange={handleDescriptionChange}
            ></input>
          </div>
        </div>
        {formdatas ? (
          <button
            className={styles.successbutton}
            onClick={() => handlePrint()}
          >
            생성
          </button>
        ) : (
          <button className={styles.printbutton}>등록</button>
        )}
        <button onClick={handleClick}>취소</button>
      </div>
    </div>
  );
}