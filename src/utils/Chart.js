const d3 = require('d3');

const Chart = {
  getDataMinMaxValues (data, axis) {
    const max = d3.max(data, d => {
      return Math.ceil(d[axis] / 1000) * 1000;
    });

    const min = d3.min(data, d => {
      return Math.floor(d[axis] / 1000) * 1000;
    });

    return { min, max };
  },

  getAxisTickValues (data, axis) {
    const minMaxValues = this.getDataMinMaxValues(data, axis);
    const range = minMaxValues.max - minMaxValues.min;
    const tempStep = range / 6;
    const magnitude = Math.floor(Math.log10(tempStep));
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