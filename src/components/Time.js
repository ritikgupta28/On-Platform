import React, { useEffect, useState } from "react";

function Time({onTimeChange, date, time}) {
  const calculateTimeLeft = () => {
    console.log(date);
    console.log(time);
    let difference = +new Date(date) - +new Date();
    console.log(difference);
    let x = (60*(time[0]-0)*10) + (60*(time[1]-0)) + ((time[3]-0)*10) + (time[4]-0);
    let y = +new Date(date);
    let z = +new Date();
    console.log(x);
    console.log(y);
    console.log(z);
    difference += (1000*60*x);
    console.log(difference);
    difference -= (1000*60*60*(5.5));
    console.log(difference);
    let timeLeft = {};

    if(difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60),
      };
    }
    else {
      onTimeChange(true);
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
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}

export default Time;