"use client";

import { useEffect, useRef, useState } from "react";

import * as css from "./timer.styles";
import { PomodoroTypeObjI } from "./timer.types";

const types: PomodoroTypeObjI = {
  pomodoro: {
    id: "pomodoro",
    label: "Pomodoro",
    time: 25,
  },
  shortBreak: {
    id: "shortBreak",
    label: "Short Break",
    time: 5,
  },
  longBreak: {
    id: "longBreak",
    label: "Long Break",
    time: 15,
  },
};

function spawnNotification(title: string) {
  new Notification(title);
}

type PomodoroKey = keyof typeof types;

export default function Timer() {
  const [running, setRunning] = useState(false);
  const [type, setType] = useState(types.pomodoro);
  const [time, setTime] = useState(type.time * 60);

  const [results, setResults] = useState<Record<PomodoroKey, number>>({
    pomodoro: 0,
    shortBreak: 0,
    longBreak: 0,
  });
  const alarm = useRef<any>(
    typeof Audio != "undefined" ? new Audio("/alarm.mp3") : null
  );

  const startAudio = () => {
    if (alarm.current) {
      alarm.current.play();
    }
  };

  const handleSetTime = (time: number) => {
    setTime(time * 60);
  };

  const handleTimeButtonClick = async () => {
    await Notification.requestPermission();
    if (time === 0) {
      handleSetTime(type.time);
    }
    setRunning(!running);
  };

  const handleSelectType = (key: string) => {
    if (running) setRunning(false);
    setType(types[key]);
  };

  useEffect(() => {
    if (time === 0) {
      const currentType = types[type.id];

      if (Notification.permission === "granted") {
        spawnNotification("Time to take a break");
      }

      startAudio();
      setRunning(false);
      setResults((prevState) => {
        const key = currentType.id;

        return {
          ...prevState,
          [key]: prevState[key] + 1,
        };
      });
    }
  }, [time]);

  useEffect(() => {
    if (type.time !== time) {
      handleSetTime(type.time);
    }
  }, [type]);

  useEffect(() => {
    let timeOutId: NodeJS.Timeout | undefined;
    if (running) {
      timeOutId = setInterval(
        () => setTime((prevState) => prevState - 1),
        1000
      );
    }

    return () => {
      if (timeOutId) {
        clearInterval(timeOutId);
      }
    };
  }, [running]);

  const formatTime = (time: number) => {
    const seconds = String(time % 60);
    const minutes = String(Math.floor(time / 60));

    return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  };

  return (
    <css.TimerSection>
      {/* tabs */}
      <css.Tabs>
        {Object.keys(types).map((key: string) => {
          return (
            <css.Tab
              selected={types[key].label === type.label}
              onClick={() => {
                handleSelectType(key);
              }}
              key={key}
            >
              {types[key].label}
            </css.Tab>
          );
        })}
      </css.Tabs>

      {/* timer */}
      <div>
        {/* timer action */}
        <css.Timer>{formatTime(time)}</css.Timer>
        <div>
          <css.Button onClick={handleTimeButtonClick}>
            {running ? "PAUSE" : "START"}
          </css.Button>
        </div>
      </div>

      <css.ResultCount>#{results[type.id]}</css.ResultCount>
    </css.TimerSection>
  );
}
