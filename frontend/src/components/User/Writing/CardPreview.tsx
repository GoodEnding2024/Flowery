import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import cardframe from "../../../assets/card1234.png";
import { useRecoilState } from "recoil";
import { cardContent, cardName } from "../../../recoil/atom";

export default function CardPreview() {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [name, setName] = useRecoilState<string>(cardName);
  const [content, setContent] = useRecoilState<string>(cardContent);

  function drawMultilineText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(" ");
    let line = "";
    let posY = y;
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, x, posY);
        line = words[i] + " ";
        posY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, posY);
  }

  function mergeImages(
    image1Url: string,
    image2Base64: string,
    text: string,
    text2: string,
    text3: string,
    outputFileName: string
  ) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image1 = new Image();
    image1.onload = () => {
      canvas.width = image1.width;
      canvas.height = image1.height;

      if (ctx) {
        ctx.drawImage(image1, 0, 0);

        const image2 = new Image();
        image2.onload = () => {
          ctx.drawImage(
            image2,
            0,
            0,
            image2.width,
            image2.height,
            canvas.width / 2 - 250,
            800,
            500,
            500
          );
          ctx.font = "120px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          drawMultilineText(
            ctx,
            text,
            canvas.width / 2,
            canvas.height * 0.555,
            1500,
            180
          );

          ctx.font = "100px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          drawMultilineText(
            ctx,
            text2,
            canvas.width / 2,
            canvas.height * 0.46,
            900,
            100
          );

          const { width: width2, actualBoundingBoxDescent: descent2 } =
            ctx.measureText(text2);
          ctx.beginPath();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 8;
          ctx.moveTo(
            canvas.width / 2 - width2 / 2 - 20,
            canvas.height * 0.46 + descent2 + 45
          );
          ctx.lineTo(
            canvas.width / 2 + width2 / 2,
            canvas.height * 0.46 + descent2 + 45
          );
          // ctx.stroke();

          ctx.font = "100px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          drawMultilineText(
            ctx,
            text3,
            canvas.width / 2,
            canvas.height * 0.76,
            900,
            100
          );
          setImgUrl(canvas.toDataURL());
        };
        image2.src = `data:image/png;base64,${image2Base64}`;
      }
    };
    image1.src = image1Url;

    return <img src={imgUrl} alt="카드" />;
  }

  const testQr = ""

  return (
    <div className="relative">
      {mergeImages(
        cardframe,
        testQr,
        `${content}`,
        // `From. ${name}`,
        // `kkotdeul`,
        "",
        "",
        "test1"
      )}
      <input
        onChange={(e: any) => setName(e.target.value)}
        value={name}
        className="absolute top-[9.5em] resize-none opacity-30"
      ></input>
    </div>
  );
}