import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledTimer = styled.p`
  color: ${(props) => props.color || "var(--color-primary)"};
  font-weight: 700;
`;

const CountdownTimer = ({ startDate, endDate, color, refetch }) => {
  const startTimestamp = new Date(startDate).getTime() / 1000;
  const endTimestamp = new Date(endDate).getTime() / 1000;

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(startTimestamp, endTimestamp)
  );

  function calculateTimeLeft(startTimestamp, endTimestamp) {
    const nowTimestamp = new Date().getTime() / 1000;

    if (startTimestamp >= endTimestamp) {
      refetch();
      return {
        status: "Zakończono",
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const difference = Math.max(0, endTimestamp - nowTimestamp);

    if (difference <= 0) {
      refetch();

      return {
        status: "Zakończono",
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (3600 * 24));
    const hours = Math.floor((difference % (3600 * 24)) / 3600);
    const minutes = Math.floor((difference % 3600) / 60);
    const seconds = Math.floor(difference % 60);

    return {
      status: "Odliczanie",
      days,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(startTimestamp, endTimestamp));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTimestamp, endTimestamp]);

  return (
    <div>
      {timeLeft.status === "Odliczanie" ? (
        <StyledTimer color={color}>
          {timeLeft.days > 0 && (
            <>{String(timeLeft.days).padStart(2, "0")}d&nbsp;</>
          )}
          {String(timeLeft.hours).padStart(2, "0")}h&nbsp;
          {String(timeLeft.minutes).padStart(2, "0")}min&nbsp;
          {String(timeLeft.seconds).padStart(2, "0")}s
        </StyledTimer>
      ) : (
        <p>{timeLeft.status}</p>
      )}
    </div>
  );
};

export default CountdownTimer;
