import React from "react";
import styles from "./PrintCardProto.module.scss";
import { saveAs } from "file-saver";
import axios from "axios";
import cardframe from "../../assets/card1234.png";
import cardframe2 from "../../assets/card123.png";
interface PrintCardProps {
  closeModal: () => void;
  reservationId: number;
  printed: number;
  reservationName: string;
  phrase: string;
}

export default function PrintCard(props: PrintCardProps) {
  function handleClick() {
    props.closeModal();
  }

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

      // draw image1
      if (ctx) {
        ctx.drawImage(image1, 0, 0);

        const image2 = new Image();
        image2.onload = () => {
          // draw image2
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
          ctx.textBaseline = "bottom"; // 텍스트 기준선을 아래쪽으로 설정
          drawMultilineText(
            ctx,
            text,
            canvas.width / 2,
            canvas.height * 0.555,
            1500,
            180
          );

          // draw additional text
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
          ctx.stroke();

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

          // convert canvas to image file and save
          canvas.toBlob(
            (blob) => {
              if (blob) {
                saveAs(blob, outputFileName);
              } else {
                console.error("Failed to convert canvas to blob");
              }
            },
            "image/jpeg",
            1
          );
        };
        image2.src = `data:image/png;base64,${image2Base64}`;
      }
    };
    image1.src = image1Url;
  }

  function handlePrint(reservationId1: number) {
    if (!props.printed) {
      axios.post("https://flowery.duckdns.org/api/reservation/print", {
        reservationId: reservationId1,
      });
    }
    axios
      .get("https://flowery.duckdns.org/api/reservation/card", {
        params: {
          reservationId: reservationId1,
        },
      })
      .then((response) => {
        if (response.data.card === 0) {
          return mergeImages(
            cardframe,
            response.data.qrBase64,
            `${props.phrase}`,
            `From. ${props.reservationName}`,
            `kkotdeul`,
            "test1"
          );
        } else if (response.data.card === 1) {
          return mergeImages(
            cardframe2,
            response.data.qrBase64,
            `${props.phrase}`,
            `From. ${props.reservationName}`,
            `kkotdeul`,
            "test1"
          );
        }
      })
      .then(() => {
        alert("저장이 완료되었습니다");
        props.closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className={styles.modal}>
      <div className={styles.fontcheck}>.</div>
      <div className={styles.modalContent}>
        <button
          className={styles.successbutton}
          onClick={() => handlePrint(props.reservationId)}
        >
          생성
        </button>
        <button onClick={handleClick}>취소</button>
      </div>
    </div>
  );
}
