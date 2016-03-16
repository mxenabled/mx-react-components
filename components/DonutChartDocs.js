const React = require('react');

const { DonutChart } = require('mx-react-components');

const Markdown = require('components/Markdown');

const DonutChartDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
          DonutChart
          <label>A D3 donut chart that supports a center label, multiple slices, and reference dots.</label>
        </h1>

        <h3>Demo</h3>
        <DonutChart
          chartTotal={300}
          data={[
            {
              name: 'Data Point 1',
              value: 50
            },
            {
              name: 'Data Point 2',
              value: 80
            },
            {
              name: 'Data Point 3',
              value: 20
            }
          ]}
          dataPoints={[
            {
              name: 'Data Dot 1',
              value: 200
            }
          ]}
          showBaseArc={true}
        />

        <h3>Usage</h3>
        <h5>activeIndex <label>Number</label></h5>
        <p>Required for hover animations and data labels. Used to determine which slice is currently active. Represented visually by making the slice slightly larger or zoomed in and displaying the data label.</p>

        <h5>activeIndex <label>Number</label></h5>
        <p>Default: -1</p>
        <p>A number used to represent the currently selected arc slice of the chart for animation purposes.</p>

        <h5>activeOffset <label>Number</label></h5>
        <p>Default: 3</p>
        <p>A number, in pixels, that the slice will increase on mouse hover.</p>

        <h5>animateOnHover <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>Show animation on hover</p>

        <h5>animationDuration <label>number</label></h5>
        <p>Default: 500</p>
        <p>Determines how long the load animation is in milliseconds</p>

        <h5>animationTypeOnLoad <label>string</label></h5>
        <p>Default: roll</p>
        <p>Determines which of two animations will be used when chart is loaded or data is changed.  Roll will rotate the chart in while pop will bounce the chart in.</p>

        <h5>arcWidth <label>Number</label></h5>
        <p>Default: 80</p>
        <p>Width of the arc in pixels.</p>

        <h5>baseArcColor <label>String</label></h5>
        <p>Default: #e5e5e5</p>
        <p>A css color value (hex, rgba, etc) used to set the base arc color.</p>

        <h5>chartTotal <label>Number</label></h5>
        <p>Default: 100</p>
        <p>A number representing the total possible value for the chart. If no chartTotal is provided, then the sum of the data values is used. This is useful if your data values only represent a portion of the total available value.</p>

        <h5>children <label>Node</label></h5>
        <p>If children nodes are provided, they will be used in place of the default data label.</p>

        <h5>colors <label>Array</label></h5>
        <p>Default: D3 Generated Colors</p>
        <p>Array of colors to used to display the slices.</p>

        <h5>data <label>Array</label></h5>
        <p><em>(required)</em> An array of data objects. Example:</p>
        <Markdown lang='js'>
  {`
    [{
      name: 'Data Label Name', //string - optional, used to display the data label
      value: 10 //number - required, used to determine the slice size
    }]
  `}
        </Markdown>

        <h5>dataPointColors <label>Array</label></h5>
        <p>Default: D3 Generated Colors</p>
        <p>Array of css color values whose indexes correspond with the data array. For example, the first color value in dataPointColors will determine the dot color for the first item in dataPoints.</p>

        <h5>dataPointRadius <label>Number</label></h5>
        <p>Default: 40</p>
        <p>The radius, in pixels, of each dataPoint dot.</p>

        <h5>dataPoints <label>Array</label></h5>
        <p>Array of name/value pairs for data points. These will be displayed as dots along the arc. Example:</p>
        <Markdown lang='js'>
  {`
    [{
      name: 'Data Label Name', //string - optional, not currently being used
      value: 10 //number - required, used to determine the dot location along the arc
    }]
  `}
        </Markdown>

        <h5>defaultLabelText <label>String</label></h5>
        <p>Default: Roll over item for details</p>
        <p>The text to display in the data label when not hovering over a slice.</p>

        <h5>dropdownStyle <label>Object | Array</label></h5>
        <p>A Radium style object or array that will be applied to the dropdown select box.</p>

        <h5>height <label>Number</label></h5>
        <p>Default: 360</p>
        <p>Height, in pixels, of the entire component.</p>

        <h5>id <label>string</label></h5>
        <p>Default: donut-chart</p>
        <p>An id used to give the chart unique classNames/references so that multiple charts on a page don't attempt to animate each other.</p>

        <h5>onClick <label>Function</label></h5>
        <p>A method to be called when a pie slice is clicked. It will be passed the index of the clicke data point.</p>

        <h5>onMouseEnter <label>Function</label></h5>
        <p>A method to be called when the mouse hovers over a slice. It will be passed the index of the hovered data point.</p>

        <h5>onMouseLeave <label>Function</label></h5>
        <p>A method to be called when the mouse leaves a slice. It will be passed the index of the hovered data point.</p>

        <h5>opacity <label>Number</label></h5>
        <p>Default: 1</p>
        <p>The opacity of the entire DonutChart component.</p>

        <h5>padAngle <label>Number</label></h5>
        <p>Default: 0.01</p>
        <p>A number, in degrees, that sets the space between slices.</p>

        <h5>showBaseArc <label>Boolean</label></h5>
        <p>Default: false</p>
        <p>Show a base arc that respresents the chartTotal. Typically used when the data only covers a portion of the arc.</p>

        <h5>showDataLabel <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>If set to true, the defaultLabelText will be displayed in the center of the chart. On slice hover, the defaultLabelText with change to display the data corresponding with the slice.</p>

        <h5>width <label>Number</label></h5>
        <p>Default: 360</p>
        <p>Width of the component. Also used to calculate the radius of the arc.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <DonutChart
      activeIndex={1}
      activeOffset={10}
      arcWidth={40}
      baseArcColor='#f5f5f5'
      chartTotal={300}
      data={[
        {
          name: 'Data Point 1',
          value: 50
        },
        {
          name: 'Data Point 2',
          value: 80
        },
        {
          name: 'Data Point 3',
          value: 20
        }
      ]}
      dataPointRadius={16}
      dataPoints={[
        {
          name: 'Data Dot 1',
          value: 200
        }
      ]}
      showBaseArc={true}
    />
  `}
        </Markdown>
      </div>
    );
  }
});

module.exports = DonutChartDocs;