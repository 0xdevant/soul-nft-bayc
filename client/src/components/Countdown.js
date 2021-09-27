import React, { useState } from "react";

function Countdown() {
  const [timer, setTimer] = useState({});
  let countDownDate = new Date("Sep 18, 2021 12:00:00").getTime();

  setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timeObj = {
      d: days,
      h: hours,
      m: minutes,
      s: seconds,
      distance: distance,
    };
    if (distance < 0) {
      clearInterval();
    }
    setTimer(timeObj);
  }, 0);

  const timeBlock = (number, unit) => {
    return (
      <div className="flex flex-col space-y-2 items-center">
        <h1>
          <b>{number < 10 ? "0" + number : number}</b>
        </h1>
        <span className="text-lg">{unit}</span>
      </div>
    );
  };

  const timeBlocks = (day, hour, min, seconds) => {
    return (
      <div className="flex space-x-6">
        <div>{timeBlock(day, "Days")}</div>
        <div>{timeBlock(hour, "Hours")}</div>
        <div>{timeBlock(min, "Minutes")}</div>
        <div>{timeBlock(seconds, "Seconds")}</div>
      </div>
    );
  };

  return (
    <div className="flex justify-center md:justify-start">
      {timer.distance !== 0
        ? timeBlocks(timer.d, timer.h, timer.m, timer.s)
        : "EXPIRED"}
    </div>
  );
}

export default Countdown;
