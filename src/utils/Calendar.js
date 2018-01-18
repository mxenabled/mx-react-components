import moment from 'moment'

export const getNewDateStateChange = ({ code, focusedDay, startDate, endDate }) => {
  let day = null;
  let currentDate = null;
  console.log('XXXX code', code)

  if (code === 'right') {
    day = focusedDay.add(1, 'days').startOf('day');
  } else if (code === 'left') {
    day = focusedDay.subtract(1, 'days').startOf('day');
  } else if (code === 'up') {
    day = focusedDay.subtract(7, 'days').startOf('day');
  } else if (code === 'down') {
    day = focusedDay.add(7, 'days').startOf('day');
  }

  if (day && (day.isBefore(startDate) || day.isAfter(endDate))) {
    console.log('we in here')
    currentDate = day.unix();
  }

  return day ? {
    focusedDay: day.unix(),
    ...currentDate ? { currentDate } : {}
  } : null;
};
