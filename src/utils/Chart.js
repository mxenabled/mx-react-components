const d3 = require('d3');

const Chart = {
  getDataMinMaxValues (data, axis) {
    let max = d3.max(data, d => {
      return d[axis];
    });

    let min = d3.min(data, d => {
      return d[axis];
    });

    //remove negative character if it exists
    let maxString = Math.ceil(max).toString();
    let minString = Math.floor(min).toString();

    maxString = maxString.replace('-', '');
    minString = minString.replace('-', '');

    const maxDigits = maxString.length - 1;
    const minDigits = minString.length - 1;

    const maxMultiplier = Math.pow(10, maxDigits) < 100 ? 100 : Math.pow(10, maxDigits);
    const minMultiplier = Math.pow(10, minDigits) < 100 ? 100 : Math.pow(10, maxDigits);

    max = Math.ceil(max / maxMultiplier) * maxMultiplier;
    min = Math.floor(min / minMultiplier) * minMultiplier;

    return { min, max };
  },

  getAxisTickValues (data, axis) {
    const estimatedNumberOfTicks = 6;
    const minMaxValues = this.getDataMinMaxValues(data, axis);
    const range = minMaxValues.max - minMaxValues.min;
    const tempStep = range / estimatedNumberOfTicks;
    const magnitude = Math.floor(Math.log(tempStep) / Math.LN10);
    const magnitudePower = Math.pow(10, magnitude);
    const magnitudeMultiplier = parseInt(tempStep / magnitudePower + 0.5, 10);
    const stepSize = magnitudeMultiplier * magnitudePower;

    const values = [];

    for (let min = minMaxValues.min; min <= minMaxValues.max; min += stepSize) {
      values.push(min);
    }

    return values;
  }
};

module.exports = Chart;