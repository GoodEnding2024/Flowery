import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { imageState, totalTextState } from "../../../recoil/atom";
import LetterPreview from "./LetterPreview";

const LetterPreviewModal = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const letter = useRecoilValue<string>(totalTextState);
  const navigate = useNavigate();

  const close = () => {
    props.onClose();
  };

  return (
    <div className=" w-screen h-screen opacity-100 fixed top-0 left-0 z-[10] overflow-x-hidden overflow-y-hidden bg-gray-300">
      <div className="flex h-screen items-center justify-center">
          {/* 입력한 편지 */}
          {letter && (
            <div ref={ref} className="card m-2 flex items-center justify-center  rounded-lg ">
                <div className="flex flex-col justify-center items-center md:flex-row ">
                  {LetterPreview()}
                </div>
              </div>
          )}
        </div>
      </div>
  );
});

export default LetterPreviewModal;
