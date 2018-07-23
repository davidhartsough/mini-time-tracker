const prefixZero = number => {
  return Math.abs(number) < 10 ? '0' + number : number;
};

const getHours = seconds => Math.floor(seconds / 3600);

const formatHours = hours => {
  return hours ? hours + 'h' : '';
};

const getMinutes = (seconds, hours) => {
  return Math.floor((seconds - hours * 3600) / 60);
};

const formatMinutes = minutes => prefixZero(minutes) + 'm';

const formatDuration = seconds => {
  if (seconds === 0) {
    return '';
  }
  if (seconds < 60) {
    return seconds + 's';
  }
  const hours = getHours(seconds);
  const minutes = getMinutes(seconds, hours);
  return formatHours(hours) + formatMinutes(minutes);
};

export default formatDuration;
