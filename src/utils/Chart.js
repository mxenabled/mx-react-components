const d3 = require('d3');

const Chart = {
  getDataMinMaxValues (data, key) {
    const max = d3.max(data, d => {
      return Math.ceil(d[key] / 1000) * 1000;
    });

    let min = d3.min(data, d => {
      return Math.floor(d[key] / 1000) * 1000;
    });

    return { min, max };
  },

  getYAxisTickValues (data) {
    const minMaxValues = this.getDataMinMaxValues(data, 'y');
    const range = minMaxValues.max - minMaxValues.min;
    const tempStep = range / 6;
    const magnitude = Math.floor(Math.log10(tempStep));
    const magnitudePower = Math.pow(10, magnitude);
    const magnitudeMultiplier = parseInt(tempStep / magnitudePower + 0.5);
    const stepSize = magnitudeMultiplier * magnitudePower;

    const values = [];

    for (let min = minMaxValues.min; min <= minMaxValues.max; min += stepSize) {
      values.push(min);
    }

    return values;
  }
};

module.exports = Chart;