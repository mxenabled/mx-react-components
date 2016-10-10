const React = require('react');

const Markdown = require('components/Markdown');

const { BarChart } = require('mx-react-components');

const chartData = [
  {
    color: '#E3E6E7',
    label: 'Jan',
    value: 595.45
  },
  {
    color: '#E3E6E7',
    label: 'Feb',
    value: 690.65
  },
  {
    color: '#E3E6E7',
    label: 'Mar',
    value: 897.40
  },
  {
    color: '#E3E6E7',
    label: 'Apr',
    value: 1209.95
  },
  {
    color: '#E3E6E7',
    label: 'May',
    value: 1191.00
  },
  {
    color: '#E3E6E7',
    label: 'Jun',
    value: 1391.27
  },
  {
    color: '#E3E6E7',
    label: 'Jul',
    value: 991.23
  },
  {
    color: '#E3E6E7',
    label: 'Aug',
    value: 1101.45
  },
  {
    color: '#E3E6E7',
    label: 'Sep',
    value: 1301.45
  },
  {
    color: '#E3E6E7',
    label: 'Oct',
    value: 1405.45
  },
  {
    color: '#E3E6E7',
    label: 'Nov',
    value: 1600.45
  },
  {
    color: '#E3E6E7',
    label: 'Dec',
    value: 2100.45
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
        <h1>
          BarChart
          <label>A D3 bar chart that supports labels for the bars and tooltips.</label>
        </h1>

        <h3 style={styles.demoHeader}>Demo</h3>

        <BarChart
          data={chartData}
          style={styles.chart}
        />

        <h3>Usage</h3>
        <h5>animateOnHover <label>Boolean</label></h5>
        <p>If true, individual bars will animate on hover.</p>
        <p>Default: false</p>

        <h5>data<label>Array</label></h5>
        <p>An array of objects that have color, label, and value properties. Each object represents a bar. Example:</p>
        <Markdown lang='js'>
  {`
    [{
      label: 'Bar Label Name', //string - used to display the data label
      color: '#E3E6E7', //string - color hexcode
      value: 10 //number - required, value of bar, determines bar size
    }]
  `}
        </Markdown>

        <h5>height <label>Number</label></h5>
        <p>Height in pixels of the SVG that renders the bars.</p>
        <p>Default: 300</p>

        <h5>labelStyle<label>Object</label></h5>
        <p>A style object used to style the bar label.</p>

        <h5>onClick<label>Function</label></h5>
        <p>Callback function that will run when a bar is clicked.</p>

        <h5>onHover<label>Function</label></h5>
        <p>Callback function that will run when a bar is hovered over.</p>

        <h5>primaryColor<label>String</label></h5>
        <p>Primary Color used in the chart.</p>
        <p>Default: '#359BCF'</p>

        <h5>tooltipFormat<label>String</label></h5>
        <p>A string that can be passed to change the display format of the tooltip text.</p>
        <p>Default: '$0,0.00'</p>

        <h5>tooltipStyle<label>Object</label></h5>
        <p>A style object that can be passed to style the tooltip.</p>

        <h5>width<label>Number</label></h5>
        <p>Width of the SVG; bars will determine their individual width accordingly.</p>
        <p>Default: 500</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <BarChart
      data={[
        {
          color: '#E3E6E7',
          label: 'Jan',
          value: 595.45
        },
        {
          color: '#E3E6E7',
          label: 'Feb',
          value: 690.65
        },
        {
          color: '#E3E6E7',
          label: 'Mar',
          value: 897.40
        },
        {
          color: '#E3E6E7',
          label: 'Apr',
          value: 1209.95
        },
        {
          color: '#E3E6E7',
          label: 'May',
          value: 1191.00
        },
        {
          color: '#E3E6E7',
          label: 'Jun',
          value: 1391.27
        },
        {
          color: '#E3E6E7',
          label: 'Jul',
          value: 991.23
        },
        {
          color: '#E3E6E7',
          label: 'Aug',
          value: 1101.45
        },
        {
          color: '#E3E6E7',
          label: 'Sep',
          value: 1301.45
        },
        {
          color: '#E3E6E7',
          label: 'Oct',
          value: 1405.45
        },
        {
          color: '#E3E6E7',
          label: 'Nov',
          value: 1600.45
        },
        {
          color: '#E3E6E7',
          label: 'Dec',
          value: 2100.45
        }
      ]}
    />
  `}
        </Markdown>
      </div>

    );
  },

  styles () {
    return {
      demoHeader: {
        marginBottom: 20
      }
    };
  }
});

module.exports = BarChartDocs;
