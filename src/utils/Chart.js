const Chart = {
  getAxisTickSpecification (min, max) {
    // Needs to maintain parity with mobile app.
    // https://git.moneydesktop.com/dev/moneymobilex/blob/master/Classes/utils/maths.cpp
    // generate_tick_specification method

    let step = 0;
    let numberOfTicks = 0;
    let start = 0;
    let end = 0;

    if (min < max) {
      // Math.Log10 not supported in IE 10/11 so we have to use Math.log / Math.LN10
      step = Math.pow(10, Math.floor(Math.log(max - min) / Math.LN10));

      if (step >= 100) {
        const range = Math.ceil(max / step) * step - Math.floor(min / step) * step;

        numberOfTicks = range / step;

        if (numberOfTicks <= 3) {
          step /= 2;
        } else if (numberOfTicks >= 7) {
          step *= 2;
        }
      } else {
        step = 100;
      }

      start = Math.floor(min / step) * step;
      end = Math.ceil(max / step) * step;
      numberOfTicks = Math.max((end - start) / step, 2);
    } else {
      if (min === max) {
        start = Math.floor(min / 100) * 100;
      } else {
        start = 0;
      }

      step = 50;
      numberOfTicks = 2;
      end = start + 100;
    }

    const values = [];

    for (let value = start; value <= end; value += step) {
      values.push(value);
    }

    return { min: start, max: end, tickValues: values };
  }
};

module.exports = Chart;