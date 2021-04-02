import React, { useEffect, useState } from "react";

function Time({onTimeChange, id, startEnd, date, time}) {
  console.log(id, startEnd, date, time);
  const calculateTimeLeft = () => {
    let difference = +new Date(date) - +new Date();
    let x = (60*(time[0]-0)*10) + (60*(time[1]-0)) + ((time[3]-0)*10) + (time[4]-0);
    difference += (1000*60*x);
    difference -= (1000*60*60*(5.5));
    let timeLeft = {};

    if(difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60),
      };
    }
    else if(startEnd === false) {
      onTimeChange(id);
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if(!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <div>
      {timerComponents.length ? timerComponents : <span>00:00:00</span>}
    </div>
  );
}

export default Time;