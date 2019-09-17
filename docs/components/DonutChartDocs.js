// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router');

const { DonutChart } = require('mx-react-components');

const Markdown = require('components/Markdown');

class DonutChartDocs extends React.Component {
  render () {
    return (
      <div>
        <h1>
          DonutChart
          <label>A D3 donut chart that supports a center label, multiple slices, and reference dots.</label>
        </h1>

        <h3>Demo</h3>
        <DonutChart
          activeOffset={5}
          animateOnHover={true}
          animationDuration={750}
          animationTypeOnLoad='roll'
          arcWidth={15}
          chartTotal={300}
          data={[
            {
              name: 'Data Point 1',
              value: 50
            },
            {
              name: 'Data Point 2',
              value: 80
            }
          ]}
          dataPoints={[
            {
              name: 'Data Dot 1',
              value: 200
            }
          ]}
          defaultLabelText='Total Users'
          defaultLabelValue='300'
          id='donut-1'
        />

        <h3>Usage</h3>
        <h5>activeIndex <label>Number</label></h5>
        <p>Default: -1</p>
        <p>Required for hover animations and data labels. Used to determine which slice is currently active. Represented visually by making the slice slightly larger or zoomed in and displaying the data label.</p>

        <h5>activeOffset <label>Number</label></h5>
        <p>Default: 0</p>
        <p>A number, in pixels, that the slice will increase on mouse hover.</p>

        <h5>animateOnHover <label>Boolean</label></h5>
        <p>Default: false</p>
        <p>Shows animation on hover when set to `true`.</p>

        <h5>animationDuration <label>number</label></h5>
        <p>Default: 500</p>
        <p>Determines how long the load animation is in milliseconds.</p>

        <h5>animationTypeOnLoad <label>string</label></h5>
        <p>Determines which of two animations will be used when chart is loaded or data is changed.  Roll will rotate the chart in while pop will bounce the chart in.</p>

        <h5>arcWidth <label>Number</label></h5>
        <p>Default: 10</p>
        <p>Width of the arc in pixels.</p>

        <h5>baseArcColor <label>String</label></h5>
        <p>Default: #e5e5e5</p>
        <p>A CSS color value (hex, rgba, etc) used to set the base arc color.</p>

        <h5>chartTotal <label>Number</label></h5>
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
        <p>Array of CSS color values whose indexes correspond with the data array. For example, the first color value in dataPointColors will determine the dot color for the first item in dataPoints.</p>

        <h5>dataPointRadius <label>Number</label></h5>
        <p>Default: 5</p>
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
        <p>The text to display in the data label when not hovering over a slice.</p>

        <h5>defaultLabelValue <label>String</label></h5>
        <p>The value to display in the data label when not hovering over a slice.</p>

        <h5>elementPropsForChartSVG <label>Object</label></h5>
        <p>Default: Empty Object</p>
        <p>element properties you wish to apply to the SVG element of the donut chart.</p>

        <h5>formatter <label>Function</label></h5>
        <p>A function used to format a value for display as a label.</p>

        <h5>height <label>Number</label></h5>
        <p>Default: 360</p>
        <p>Height, in pixels, of the entire component.</p>

        <h5>id <label>string</label></h5>
        <p>Default: donut-chart</p>
        <p>An id used to give the chart unique classNames/references so that multiple charts on a page don't attempt to animate each other.</p>

        <h5>onClick <label>Function</label></h5>
        <p>A method to be called when a pie slice is clicked. It will be passed the <code>data</code> at the clicked index.</p>

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
        <p>If set to true, the defaultLabelText will be displayed in the center of the chart.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

        <h5>shouldToggleDataLabelOnHover <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>When set to true, on slice hover, the defaultLabelText will change to display the data corresponding with the slice.</p>

        <h5>width <label>Number</label></h5>
        <p>Default: 150</p>
        <p>Width of the component. Also used to calculate the radius of the arc.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <DonutChart
      activeOffset={5}
      animateOnHover={true}
      animationDuration={750}
      animationTypeOnLoad='roll'
      arcWidth={15}
      chartTotal={300}
      data={[
        {
          name: 'Data Point 1',
          value: 50
        },
        {
          name: 'Data Point 2',
          value: 80
        }
      ]}
      dataPoints={[
        {
          name: 'Data Dot 1',
          value: 200
        }
      ]}
      defaultLabelText='Total Users'
      defaultLabelValue='300'
      id='donut-1'
    />
  `}
        </Markdown>
      </div>
    );
  }
}

module.exports = DonutChartDocs;
