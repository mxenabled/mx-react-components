const React = require('react');

const { BarChart } = require('mx-react-components');

const chartData = [
  {
    color: "#E3E6E7",
    label: "Oct",
    value: 2191.45
  },
  {
    color: "#E3E6E7",
    label: "Oct",
    value: 2191.45
  },
  {
    color: "#E3E6E7",
    label: "Oct",
    value: 2191.45
  },
  {
    color: "#E3E6E7",
    label: "Oct",
    value: 2191.45
  }
];

const BarChartDocs = React.createClass({

  getInitialState () {
    return {
      buttonIsActive: false,
      spinnerIsActive: false
    };
  },

  _handleButtonClick () {
    this.setState({
      buttonIsActive: !this.state.buttonIsActive
    });
  },

  _handleSpinnerClick () {
    this.setState({
      spinnerIsActive: !this.state.spinnerIsActive
    });
  },

  render () {
    const styles = this.styles();

    return (
      <div>
        <BarChart
          data={chartData}
          height={70}
          style={styles.chart}
          width={200}
        />
      </div>
    )
  },

  styles () {
    return {
      chart: {

      }
    }
  }
});

module.exports = BarChartDocs;
