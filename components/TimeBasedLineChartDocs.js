const React = require('react');
const moment = require('moment');

const { TimeBasedLineChart } = require('mx-react-components');

const Markdown = require('components/Markdown');

const TimeBasedLineChartDocs = React.createClass({
  render () {
    const lineChartData = [];

    for (let i = 6; i > 0; i--) {
      lineChartData.push({
        timeStamp: moment().subtract(i, 'months').startOf('month').unix(),
        value: Math.floor(Math.random() * 1000)
      });
    }

    for (let i = 0; i < 6; i++) {
      lineChartData.push({
        timeStamp: moment().add(i, 'months').startOf('month').unix(),
        value: Math.floor(Math.random() * 1000)
      });
    }

    return (
      <div>
        <h1>
          TimeBasedLineChart
          <label>A D3 time-based line chart chart that supports tooltips and a data breakpoint.</label>
        </h1>

        <h3>Demo</h3>
        <TimeBasedLineChart
          alwaysShowZeroYTick={true}
          breakPointDate={moment().startOf('month').unix()}
          breakPointLabel={'This Month'}
          dashedFutureLine={false}
          data={lineChartData}
          height={400}
          margin={{ top: 30, right: 0, bottom: 30, left: 75 }}
          rangeType={'month'}
          shadeAreaBelowZero={true}
          style={{ boxSizing: 'content-box' }}
          width={700}
        />

        <h3>Usage</h3>
        <h5>alwaysShowZeroYTick <label>Boolean</label></h5>
        <p>Default: false</p>
        <p>If set to 'true', then a tick, label, and line will be displayed for the '0' yAxis value.</p>

        <h5>areaBelowZeroColor <label>String</label></h5>
        <p>Default: rgb(238, 66, 53)</p>
        <p>A CSS color value that sets the color of the area below zero.</p>

        <h5>breakPointDate <label>Number</label></h5>
        <p>Default: today (as a Unix timestamp)</p>
        <p>A Unix timestamp that sets the breakpoint for the chart. The breakpoint is displayed as a vertical line on the chart. If 'dashedFutureLine' is set to 'true', then the line after the breakpoint will be dashed instead of solid.</p>

        <h5>breakPointLabel <label>String</label></h5>
        <p>Default: 'Today'</p>
        <p>The text to display in the breakpoint label. The label is displayed at the top of the chart above the breakpoint line.</p>

        <h5>children <label>Node(s)</label></h5>
        <p>If defined, these nodes will be used for the tooltip. Typically this is used in conjunction with 'hoverCallBack' to create custom tooltips.</p>

        <h5>dashedFutureLine <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>If set to 'true', then the line after the breakpoint will be dotted instead of solid.</p>

        <h5>data <label>Arrray</label></h5>
        <p>An array of data objects that are used to set the x axis, y axis, and line values. Example:</p>
  <Markdown lang='js'>
  {`
    [{
      timeStamp: 1446063248, //unix timestamp, required
      value: 10 //number or string
    }]
  `}
  </Markdown>

        <h5>height <label>Number</label></h5>
        <p>Default: 400</p>
        <p>Sets the overall height of the chart.</p>

        <h5>hoverCallBack <label>Function</label></h5>
        <p>A method to be called when hovering over a data point on the chart. This is where you can </p>

        <h5>lineColor <label>String</label></h5>
        <p>Default: #359BCF</p>
        <p>A CSS color value that sets the color of the data line.</p>

        <h5>defaultLabelText <label>String</label></h5>
        <p>Default: Roll over item for details</p>
        <p>The text to display in the data label when not hovering over a slice.</p>

        <h5>margin <label>Object</label></h5>
        <p>A object that contains top, right, bottom, and left margin values. These can be used to adjust the spacing around the chart. Default:</p>
  <Markdown lang='js'>
  {`
    {
      top: 20,
      right: 50,
      bottom: 20,
      left: 50
    }
  `}
  </Markdown>

        <h5>rangeType <label>String ('day', 'month')</label></h5>
        <p>Default: 'day'</p>
        <p>This should match the type of data you're passing in. It is used to normalize the data points to month or day intervals.</p>

        <h5>shadeAreaBelowZero <label>Boolean</label></h5>
        <p>Default: false</p>
        <p>If set to 'true', then the area below zero will be shaded. This is set to 'true' in the example above.</p>

        <h5>showBreakPoint <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>Set this to 'false' if you don't want to display the vertical line and label that indicates the breakpoint.</p>

        <h5>showTooltips <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>Set this to 'false' if you don't want to display a tooltip when hovering over the data points.</p>

        <h5>staticXAxis <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>If set to false, the x axis labels will only be shown when hovering over a data point and a static x axis label will be displayed under the breakpoint.</p>

        <h5>width <label>Number</label></h5>
        <p>Default: 550</p>
        <p>Sets the overall height of the chart.</p>

        <h5>yAxisFormatter <label>Function</label></h5>
        <p>This function will be used to determine the format of the y axis tick labels. If should return some type of value.</p>

        <h3>Example</h3>
        <Markdown lang='js'>
  {`
    const lineChartData = [];

    for (let i = 6; i > 0; i--) {
      lineChartData.push({
        timeStamp: moment().subtract(i, 'months').startOf('month').unix(),
        value: Math.floor(Math.random() * 1000)
      });
    }

    for (let i = 0; i < 6; i++) {
      lineChartData.push({
        timeStamp: moment().add(i, 'months').startOf('month').unix(),
        value: Math.floor(Math.random() * 1000)
      });
    }

    <TimeBasedLineChart
      alwaysShowZeroYTick={true}
      breakPointDate={moment().startOf('month').unix()}
      breakPointLabel={'This Month'}
      dashedFutureLine={false}
      data={lineChartData}
      height={400}
      margin={{ top: 30, right: 0, bottom: 30, left: 75 }}
      rangeType={'month'}
      shadeAreaBelowZero={true}
      style={{ boxSizing: 'content-box' }}
      width={700}
    />
  `}
        </Markdown>
      </div>
    );
  }
});

module.exports = TimeBasedLineChartDocs;