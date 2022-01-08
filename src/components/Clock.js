import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import morning from "../assests/morning.jpg";
import afternoon from "../assests/afternoon.jpg";
import eve from "../assests/eve.jpg";
import night from "../assests/night.jpg";

const Clock = () => {
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [greet, setGreet] = useState("Good");
  const [bg, setBg] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      const milli = new Date().getTime();
      const utcOffset = new Date().getTimezoneOffset();
      const date = milli + (-utcOffset / 60) * (60 * 60 * 1000);
      const tsec = Math.floor(date / 1000);
      const sec = tsec % 60;
      setSec(sec);
      const tmins = Math.floor(tsec / 60);
      const min = tmins % 60;
      setMin(min);
      const thours = Math.floor(tmins / 60);
      const hours = thours % 24;
      setHours(hours);
      const tdays = Math.floor(thours / 24);
      //   console.log(hours, min, sec);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const hrs = () => {
    if (hours <= 12) {
      if (hours < 10) {
        return "0" + hours;
      } else {
        return hours;
      }
    }
    if (hours > 12) {
      return hours - 12;
    }
  };

  useEffect(() => {
    if (hours >= 6) {
      setBg(morning);
      setGreet("Good Morning!");
    }
    if (hours >= 12) {
      setBg(afternoon);
      setGreet("Good Afternoon!");
    }
    if (hours >= 16) {
      setBg(eve);
      setGreet("Good Evening!");
    }
    if (hours >= 20 || hours <= 5) {
      setBg(night);
      setGreet("Good Night!");
    }
  }, [hours]);

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="clock">
        <h1>{greet}</h1>
        <h1>
          <span className="time">
            {hrs()}:{min < 10 ? "0" + min : min}:{sec < 10 ? "0" + sec : sec}
          </span>{" "}
          {hours > 12 ? "PM" : "AM"}
        </h1>
      </div>
    </div>
  );
};

export default Clock;
