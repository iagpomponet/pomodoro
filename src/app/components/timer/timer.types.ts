export type PomodoroType = "pomodoro" | "shortBreak" | "longBreak";

export interface PomodoroTypeObjI {
  [key: string]: {
    id: string;
    label: string;
    time: number;
  };
}
