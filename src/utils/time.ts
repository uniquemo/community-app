export const transformSecondsToTime = (value: number) => {
  let hours: number | string = Math.floor(value / 3600);
  let minutes: number | string = Math.floor((value % 3600) / 60);
  let seconds: number | string = value % 60;

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
};
