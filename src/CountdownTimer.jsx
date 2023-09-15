import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [running, setRunning] = useState(false);

  const startTimer = () => {
    setRunning(true);

  };

  const stopTimer = () => {
    setRunning(false);
  };
  var val;
  const resetTimer = () => {
    setTime(0);
    val=0;
    setRunning(false);
  };

  const handleChangeTime = (event) => {
    val=event.target.value;
    setInitialTime(parseInt(event.target.value, 10));
    setTime(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    let interval;

    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      // Handle timer completion here
      console.log("Timer has finished");
      alert("Timer has finished");
      setRunning(false);
    }

    return () => clearInterval(interval);
  }, [running, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div class="countdownHeading">
      <h1>Countdown Timer</h1>
      <div class="timerSetting">
            <div class="InputText">
               <input class="selectInput" type="number" onChange={handleChangeTime} value={initialTime} />
            </div>  
            <div class="timerButton">
               <button onClick={startTimer}>Start</button>
               <button onClick={stopTimer}>Stop</button>
               <button onClick={resetTimer}>Reset</button>
            </div>  
      </div>
      <div class="count">
            <div><h1>Time Remaining</h1></div>
            <div><h1>{formatTime(time)}</h1></div>
      </div>
    </div>
  );
};

export default CountdownTimer;
