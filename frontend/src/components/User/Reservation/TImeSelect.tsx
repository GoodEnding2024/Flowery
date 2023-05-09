import React, { useState } from "react";
// import ReactDatePicker from "react-datepicker";

export default function Timeselect() {
  const open = 900;
  const close = 2100;

  const rezBefore = [];
  const rezAfter = [];
  for (let i = open; i < close; i += 30) {
    let hour = Math.floor(i / 100);
    let minute = i % 100;
    if (minute >= 60) {
      minute = 0;
      hour += 1;
      i += 40;
    }
    const rezTime = `${hour}:${minute === 0 ? "00" : minute}`;
    if (hour >= 12) {
      rezAfter.push(rezTime);
    } else {
      rezBefore.push(rezTime);
    }
  }

  // console.log(rezAfter, "오후");
  // console.log(rezBefore, "오전");

  return (
    <div className="flex flex-col pb-[15%]">
      <p className="pl-[8%] text-user_green font-bold font-nasq pb-[2%]">
        오전
      </p>
      <div className="flex flex-row flex-wrap  pl-[8%] gap-1">
        {rezBefore.map((time, index) => (
          <div
            key={index}
            className="w-[4.5rem] p-1 text-center border-solid border-2 border-user_green hover:bg-user_sol text-user_green"
          >
            {time}
          </div>
        ))}
      </div>
      <p className="pl-[8%] mt-[10%] text-user_green font-bold font-nasq pb-[2%]">
        오후
      </p>
      <div className="flex flex-row pl-[8%] flex-wrap gap-1">
        {rezAfter.map((time, index) => (
          <div
            key={index}
            className="w-[4.5rem] p-1  text-center border-solid border-2 border-user_green hover:bg-user_sol text-user_green"
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  );
}
