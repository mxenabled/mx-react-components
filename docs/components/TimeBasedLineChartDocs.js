// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require("react");
const moment = require("moment");
const { Link } = require("react-router");

const { TimeBasedLineChart } = require("mx-react-components");

const Markdown = require("components/Markdown");

class TimeBasedLineChartDocs extends React.Component {
  state = {
    chartHeight: window.innerWidth * 0.6 / 2,
    chartWidth: window.innerWidth * 0.6
  };

  componentDidMount() {
    window.addEventListener("resize", this._handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._handleWindowResize);
  }

  _handleWindowResize = () => {
    this.setState({
      chartHeight: window.innerWidth * 0.6 / 2,
      chartWidth: window.innerWidth * 0.6
    });
  };

  render() {
    const lineChartData = [];

    for (let i = 6; i > 0; i--) {
      lineChartData.push({
        x: moment()
          .subtract(i, "months")
          .startOf("month")
          .unix(),
        y: Math.floor(Math.random() * 1000)
      });
    }

    for (let i = 0; i < 6; i++) {
      lineChartData.push({
        x: moment()
          .add(i, "months")
          .startOf("month")
          .unix(),
        y: Math.floor(Math.random() * 1000)
      });
    }

    return (
      <div>
        <h1>
          TimeBasedLineChart
          <label>
            A D3 time-based line chart chart that supports tooltips and a data
            breakpoint.
          </label>
        </h1>

        <h3>Demo</h3>
        <TimeBasedLineChart
          breakPointLabel={"This Month"}
          data={lineChartData}
          getBreakPointDate={() =>
            moment()
              .startOf("month")
              .unix()
          }
          height={this.state.chartHeight}
          rangeType={"month"}
          showZeroLine={true}
          width={this.state.chartWidth}
        />

        <h3>Usage</h3>
        <h5>
          getBreakPointDate <label>Function</label>
        </h5>
        <p>Default: today (as a Unix timestamp)</p>
        <p>
          A function that returns a unix timestamp that sets the breakpoint for
          the chart. The breakpoint is displayed as a vertical line on the
          chart. If 'dashedFutureLine' is set to 'true', then the line after the
          breakpoint will be dashed instead of solid.
        </p>

        <h5>
          breakPointLabel <label>String</label>
        </h5>
        <p>Default: 'Today'</p>
        <p>
          The text to display in the breakpoint label. The label is displayed at
          the top of the chart above the breakpoint line.
        </p>

        <h5>
          children <label>Node(s)</label>
        </h5>
        <p>
          If defined, these nodes will be used for the tooltip. Typically this
          is used in conjunction with 'hoverCallBack' to create custom tooltips.
        </p>

        <h5>
          data <label>Arrray</label>
        </h5>
        <p>
          An array of data objects that are used to set the x axis, y axis, and
          line values. Example:
        </p>
        <Markdown lang="js">
          {`
          [{
            x: 1446063248, //unix timestamp, required
            y: 10 //number or string
          }]
        `}
        </Markdown>

        <h5>
          height <label>Number</label>
        </h5>
        <p>Default: 400</p>
        <p>Sets the overall height of the chart.</p>

        <h5>
          limitLineCircles <label>Bool</label>
        </h5>
        <p>Default: false</p>
        <p>
          If set to true, limits the circles on the line to the beginning,
          middle, and end of the line.
        </p>

        <h5>
          lineColor <label>String</label>
        </h5>
        <p>Default: #359BCF</p>
        <p>A CSS color value that sets the color of the data line.</p>

        <h5>
          margin <label>Object</label>
        </h5>
        <p>
          A object that contains top, right, bottom, and left margin values.
          These can be used to adjust the spacing around the chart. Default:
        </p>
        <Markdown lang="js">
          {`
          {
            top: 20,
            right: 50,
            bottom: 20,
            left: 50
          }
        `}
        </Markdown>

        <h5>
          rangeType <label>String ('day', 'month')</label>
        </h5>
        <p>Default: 'day'</p>
        <p>
          This should match the type of data you're passing in. It is used to
          normalize the data points to month or day intervals.
        </p>

        <h5>
          shadeBelowZero <label>Boolean</label>
        </h5>
        <p>Default: false</p>
        <p>
          If set to 'true', then the area below zero will be shaded. This is set
          to 'true' in the example above.
        </p>

        <h5>
          shadeFutureOnGraph <label>Boolean</label>
        </h5>
        <p>Default: true</p>
        <p>
          Set this to 'false' if don't want any part of the graph that is in the
          future to be shaded.
        </p>

        <h5>
          showBreakPoint <label>Boolean</label>
        </h5>
        <p>Default: true</p>
        <p>
          Set this to 'false' if you don't want to display the vertical line and
          label that indicates the breakpoint.
        </p>

        <h5>
          showZeroLine <label>Boolean</label>
        </h5>
        <p>Default: false</p>
        <p>
          If set to 'true', then a tick, label, and line will be displayed for
          the '0' yAxis value.
        </p>

        <h5>
          theme <label>Object</label>
        </h5>
        <p>
          Customize the component&apos;s look. See{" "}
          <Link to="/components/theme">Theme</Link> for more information.
        </p>

        <h5>
          width <label>Number</label>
        </h5>
        <p>Default: 550</p>
        <p>Sets the overall height of the chart.</p>

        <h5>
          yAxisFormatter <label>Function</label>
        </h5>
        <p>
          This function will be used to determine the format of the y axis tick
          labels. If should return some type of value.
        </p>

        <h5>
          zeroState <label>Node</label>
        </h5>
        <p>A JSX node rendered if the data supplied has no length.</p>

        <h3>Example</h3>
        <Markdown lang="js">
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
      breakPointDate={moment().startOf('month').unix()}
      breakPointLabel={'This Month'}
      data={lineChartData}
      height={400}
      margin={{ top: 30, right: 0, bottom: 30, left: 75 }}
      rangeType={'month'}
      shadeBelowZero={true}
      showZeroLine={true}
      style={{ boxSizing: 'content-box' }}
      width={700}
    />
  `}
        </Markdown>
      </div>
    );
  }
}

module.exports = TimeBasedLineChartDocs;
