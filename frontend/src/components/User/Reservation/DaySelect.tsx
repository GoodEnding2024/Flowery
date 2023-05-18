import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import "./DaySelect.modules.scss";
import moment from "moment";

type DayselectProps = {
  getDay: (x: string) => void;
};

export default function Dayselect({ getDay }: DayselectProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    getDay(date);
  };

  const today = moment();
  const maxDate = moment(today).add(14, "days").toDate();

  // console.log(selectedDate);

  return (
    <>
      <div className="flex justify-center pt-[10%] pb-[10%]">
        <DatePicker
          selected={selectedDate}
          shouldCloseOnSelect={false}
          onChange={handleDateChange}
          minDate={today.add(1, "days").toDate()}
          maxDate={maxDate}
          locale={ko}
          dateFormat="yyyy-MM-dd"
          inline
          className="DaySelect.modules.scss"
        />
      </div>
    </>
  );
}
