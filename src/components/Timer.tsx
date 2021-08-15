// TODO: this component needs to re-do or clean it up (it is really ugly)

import React, { useEffect, useState } from "react";

type CalculateEventTimeTypeProps =
  | "days"
  | "hours"
  | "minutes"
  | "seconds"
  | string;
type CalculateEventTimeProps = {
  [key in CalculateEventTimeTypeProps]: number;
};

const CalculateEventTime = (date: string): CalculateEventTimeProps | null => {
  const d = new Date(new Date(date).toLocaleString()).getTime();
  const diff = +d - +new Date().getTime();
  if (diff > 0) {
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  return null;
};

const isEventDone = (date: string) => {
  if (CalculateEventTime(date) === null) {
    return true;
  }

  return false;
};

type EventsTimerProps = {
  date: string;
  duration: number;
};

const EventsTimer = ({
  date: DATE,
  duration: TIME_EVENT_HOURS,
}: EventsTimerProps) => {
  const xDate = new Date(DATE);

  const [d, setD] = useState(DATE);
  const [waiting, setWaiting] = useState(!isEventDone(DATE));
  const [ongoing, setOngoing] = useState(() => {
    if (waiting) {
      return false;
    }

    return !isEventDone(
      new Date(xDate.setHours(xDate.getHours() + TIME_EVENT_HOURS)).toString()
    );
  });
  const [timeLeft, setTimeLeft] = useState(CalculateEventTime(DATE));

  useEffect(() => {
    const timer = setTimeout(() => {
      const t = CalculateEventTime(d);
      if (waiting && !t) {
        setWaiting(false);
        setOngoing(true);
      }

      if (ongoing && !t) {
        setOngoing(false);
      }

      setTimeLeft(t);
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (!waiting && ongoing) {
      setD(
        new Date(xDate.setHours(xDate.getHours() + TIME_EVENT_HOURS)).toString()
      );
    }
  }, [waiting, ongoing, xDate, TIME_EVENT_HOURS]);

  if (waiting)
    return (
      <div className="text-xl tracking-wide my-4">
        <p className="text-2xl font-black">
          {timeLeft
            ? Object.keys(timeLeft).map(
                (val, index) =>
                  `${`0${timeLeft[val]}`.slice(-2)}${
                    index < Object.keys(timeLeft).length - 1 ? " : " : ""
                  }`
              )
            : null}
        </p>
        <span className="mr-4 text-sm">(Waiting)</span>
      </div>
    );

  if (ongoing)
    return (
      <div className="text-xl tracking-wide my-4">
        <p className="text-2xl font-black">
          {timeLeft
            ? Object.keys(timeLeft).map(
                (val, index) =>
                  `${`0${timeLeft[val]}`.slice(-2)}${
                    index < Object.keys(timeLeft).length - 1 ? " : " : ""
                  }`
              )
            : null}
        </p>
        <span className="mr-4 text-sm">(Time Left)</span>
      </div>
    );

  return (
    <p className="text-2xl text-right tracking-wide">
      <span className="font-black">EVENT IS OVER!</span>
    </p>
  );
};

export default EventsTimer;
