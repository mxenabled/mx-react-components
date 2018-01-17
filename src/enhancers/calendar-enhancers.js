const moment = require('moment');

export const calculateDayByKey = (code, focusedDay) => {
  debugger;

  let day;

  if (code === 'right') {
    day = moment.unix(focusedDay).add(1, 'days').startOf('day');

  } else if (code === 'left') {
    day = moment.unix(focusedDay).subtract(1, 'days').startOf('day');

  } else if (code === 'up') {
    day = moment.unix(focusedDay).subtract(7, 'days').startOf('day');

  } else if (code === 'down') {
    day = moment.unix(focusedDay).add(7, 'days').startOf('day');

  }

  return day;
}
