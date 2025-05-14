import React, { useState } from "react";
import "./calendar.css";

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const generateCalendar = () => {
    const totalDays = daysInMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    const calendarDays = [];

    // Fill in empty slots before the first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    // Fill in the days of the month
    for (let day = 1; day <= totalDays; day++) {
      const isToday =
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

      calendarDays.push(
        <div key={day} className={`day ${isToday ? "today" : ""}`}>
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return (
    <div className="calendar-container card">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid day-names">
        {["S", "M", "T", "W", "T", "F", "S"].map(day => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">{generateCalendar()}</div>
    </div>
  );
};

export default Calendar;
