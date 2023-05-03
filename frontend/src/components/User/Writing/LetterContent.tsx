import React, { useState, useEffect, useRef } from "react";
import styles from "./LetterContent.module.scss";
import { useRecoilState } from "recoil";
import {
  totalTextState,
  letterPaperState,
  letterFontState,
} from "../../../recoil/atom";

export default function LetterContent() {
  const [letterContent, setLetterContent] =
    useRecoilState<string>(totalTextState);
  const [letterPaper, setLetterPaper] =
    useRecoilState<number>(letterPaperState);
  const [letterFont, setLetterFont] = useRecoilState<number>(letterFontState);

  // 편지 길이 제한
  const handleTextareaHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textarea = event.target;
    const { scrollHeight, clientHeight } = textarea;
    if (scrollHeight > clientHeight) {
      textarea.value = letterContent;
    } else {
      setLetterContent(event.target.value);
    }
  };

  // 편지 내용
  const currentLetter = () => {
    return (
      <textarea
        autoFocus
        rows={14}
        onChange={handleTextareaHeight}
        value={letterContent}
        className={`${styles[`letterContent${letterPaper}`]} ${
          styles[`letterFont${letterFont}`]
        }`}
      ></textarea>
    );
  };

  return (
    // 전체 페이지
    <div className={styles[`letterPaper${letterPaper}`]}>{currentLetter()}</div>
  );
}
