import React, { useState, useEffect, useRef } from "react";
import styles from "./LetterFont.module.scss";
import { useRecoilState } from "recoil";
import { letterFontState } from "../../../recoil/atom";

export default function LetterFont() {
  const [letterFont, setLetterFont] = useRecoilState<number>(letterFontState);
  const [startIndex, setStartIndex] = useState<number>(0);
  const visibleFontsCount = 4;

  // 글씨체 종류
  const letterFonts: string[] = [
    "삼립호빵체",
    "김정철명조",
    "안성탕면체",
    "고령딸기체",   
    "제주돌담체",
    "평창평화체",
    "조선100년체",
    "가나초콜릿체",
  ];

  return (
    <div className="flex justify-center">
      {/* 글씨체 고르기 */}
      <div className="flex p-2">
        {/* 왼쪽 화살표 */}
        {startIndex !== 0 && (
          <button
            disabled={startIndex === 0}
            onClick={() => setStartIndex(startIndex - 1)}
          >
            &lt;
          </button>
        )}
        {/* 글씨체 목록 */}
        {letterFonts
          .slice(startIndex, startIndex + visibleFontsCount)
          .map((font: string, i: number) => (
            <div
              key={i}
              onClick={() => {
                setLetterFont(startIndex + i + 1);
              }}
              className="p-2"
            >
              <div
                className={`${styles.cursor} ${
                  styles[`letterFont${startIndex + i + 1}`]
                } `}
              >
                {font}
              </div>
            </div>
          ))}
        {/* 오른쪽 화살표 */}
        {startIndex + visibleFontsCount < letterFonts.length && (
          <button onClick={() => setStartIndex(startIndex + 1)}>&gt;</button>
        )}
      </div>
    </div>
  );
}