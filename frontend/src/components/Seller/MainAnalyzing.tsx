import React from "react";
import styles from "./MainAnalyzing.module.scss";
import BarChart from "./BarChart";
import go_logo from "../../assets/go_logo.png";
export default function MainAnalyzing() {
  return (
    <div className={styles.chartcontainer}>
      <div className={styles.cardheader}>판매 분석</div>
      <div className={styles.cardmain}>
        <div className={styles.pp}>월간 품목별 판매량</div>
        <BarChart />
      </div>
      <div className={styles.cardfooter}>
        더보기
        <span>
          <img src={go_logo} alt="" />
        </span>
      </div>
    </div>
  );
}