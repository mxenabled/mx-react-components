// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router');

const { Gauge } = require('mx-react-components');

const Markdown = require('components/Markdown');

class GaugeDocs extends React.Component {
  render () {
    return (
      <div>
        <h1>
          Gauge
          <label>A D3 gauge that supports multiple colors for each tranche of the gauge, and reference dots.</label>
        </h1>

        <h3>Demo</h3>
        <Gauge
          activeOffset={5}
          arcWidth={15}
          chartTotal={300}
          data={[]}
          dataPointColors={['#FFA510']}
          dataPoints={[
            {
              name: 'Data Dot 1',
              value: 150
            }
          ]}
          id='gauge-1'
          numberLabel='300'
          numberOfSegments={50}
          textLabel='Total Users'
        />


        <h3>Usage</h3>
        <h5>activeOffset <label>Number</label></h5>
        <p>Default: 0</p>
        <p>A number, in pixels, that the slice will increase on mouse hover.</p>

        <h5>arcWidth <label>Number</label></h5>
        <p>Default: 10</p>
        <p>Width of the arc in pixels.</p>

        <h5>baseArcColor <label>String</label></h5>
        <p>Default: #e5e5e5</p>
        <p>A css color value (hex, rgba, etc) used to set the base arc color.</p>

        <h5>chartTotal <label>Number</label></h5>
        <p>A number representing the total possible value for the chart. If no chartTotal is provided, then the sum of the data values is used. This is useful if your data values only represent a portion of the total available value.</p>

        <h5>children <label>Node</label></h5>
        <p>If children nodes are provided, they will be used in place of the default data label.</p>

        <h5>colors <label>Array</label></h5>
        <p>Default: PRIMARY</p>
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
        <p>Array of css color values whose indexes correspond with the data array. For example, the first color value in dataPointColors will determine the dot color for the first item in dataPoints.</p>

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

        <h5>formatter <label>Function</label></h5>
        <p>A function used to format a value for display as a label.</p>

        <h5>height <label>Number</label></h5>
        <p>Default: 1560</p>
        <p>Height, in pixels, of the entire component.</p>

        <h5>id <label>string</label></h5>
        <p>Default: gauge</p>
        <p>An id used to give the chart unique classNames/references so that multiple charts on a page don't attempt to animate each other.</p>

        <h5>numberLabel <label>String</label></h5>
        <p>The value to display in the data label.</p>

        <h5>numberLabelColor <label>String</label></h5>
        <p>The color of the value displayed in the data label.</p>

        <h5>numberOfSegments <label>Number</label></h5>
        <p>Default: 6</p>
        <p>Number of segments or slices that you will have in your gauge</p>

        <h5>opacity <label>Number</label></h5>
        <p>Default: 1</p>
        <p>The opacity of the entire Gauge component.</p>

        <h5>padAngle <label>Number</label></h5>
        <p>Default: 0.02</p>
        <p>A number, in degrees, that sets the space between slices.</p>

        <h5>showBaseArc <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>Show a base arc that respresents the chartTotal. Typically used when the data only covers a portion of the arc.</p>

        <h5>showDataLabel <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>If set to true, the defaultLabelText will be displayed in the center of the chart. On slice hover, the defaultLabelText with change to display the data corresponding with the slice.</p>

        <h5>textLabel <label>String</label></h5>
        <p>The text to display in the data label.</p>

        <h5>textLabelColor <label>String</label></h5>
        <p>The color of the text displayed in the data label.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

        <h5>width <label>Number</label></h5>
        <p>Default: 150</p>
        <p>Width of the component. Also used to calculate the radius of the arc.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <Gauge
      activeOffset={5}
      arcWidth={15}
      chartTotal={300}
      data={[]}
      dataPointColors={['#FFA510']}
      dataPoints={[
        {
          name: 'Data Dot 1',
          value: 150
        }
      ]}
      id='gauge-1'
      numberOfSegments={50}
      numberLabel='300'
      textLabel='Total Users'
    />
  `}
        </Markdown>
      </div>
    );
  }
}

module.exports = GaugeDocs;
