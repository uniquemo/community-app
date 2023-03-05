export const transformSecondsToTime = (value: number) => {
  let minutes: string | number = Math.floor(value / 60);
  let seconds: string | number = value % 60;
  let hours: string | number = Math.floor(minutes / 60);
  minutes = minutes % 60;
  hours = hours < 10 ? '' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  const result = hours + ':' + minutes + ':' + seconds;
  return result;
};
