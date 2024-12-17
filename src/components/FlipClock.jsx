import React, { useEffect, useRef } from "react";
import "./FlipClock.css";

const FlipNumber = ({ number, fontSize }) => (
  <div className="flip-number" style={{ fontSize: `${fontSize}px` }}>
    {String(number).padStart(2, "0")}
  </div>
);

const FlipDate = ({ text, fontSize }) => (
  <div className="flip-date" style={{ fontSize: `${fontSize}px` }}>
    {text}
  </div>
);

const FlipClock = () => {
  const clockRef = useRef(null);
  const [timeFontSize, setTimeFontSize] = React.useState(0);
  const [dateFontSize, setDateFontSize] = React.useState(0);

  useEffect(() => {
    const updateFontSize = () => {
      if (clockRef.current) {
        const containerHeight = clockRef.current.offsetHeight;
        const containerWidth = clockRef.current.offsetWidth;

        // Calculate font sizes based on container dimensions
        // Using the smaller of height-based or width-based calculation
        const timeHeight = containerHeight * 0.7; // 70% of container height for time section
        const dateHeight = containerHeight * 0.3; // 30% of container height for date section

        const timeSizeFromHeight = timeHeight * 0.6;
        const timeSizeFromWidth = containerWidth * 0.15;
        const newTimeSize = Math.min(timeSizeFromHeight, timeSizeFromWidth);

        const dateSizeFromHeight = dateHeight * 0.6;
        const dateSizeFromWidth = containerWidth * 0.075;
        const newDateSize = Math.min(dateSizeFromHeight, dateSizeFromWidth);

        setTimeFontSize(Math.floor(newTimeSize));
        setDateFontSize(Math.floor(newDateSize));
      }
    };

    // Initial size calculation
    updateFontSize();

    // Add resize listener
    window.addEventListener("resize", updateFontSize);

    // Cleanup
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date
    .toLocaleString("fr-FR", { month: "short" })
    .replace(".", "")
    .toUpperCase();
  const year = date.getUTCFullYear();

  return (
    <div className="flip-clock" ref={clockRef}>
      <div className="time-section">
        <FlipNumber number={hours} fontSize={timeFontSize} />
        <FlipNumber number={minutes} fontSize={timeFontSize} />
      </div>
      <div className="date-section">
        <FlipNumber number={day} fontSize={dateFontSize} />
        <FlipDate text={month} fontSize={dateFontSize} />
        <FlipDate text={year} fontSize={dateFontSize} />
      </div>
    </div>
  );
};

export default FlipClock;
