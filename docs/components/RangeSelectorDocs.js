// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router-dom');

const { RangeSelector } = require('mx-react-components');

const Markdown = require('components/Markdown');

class RangeSelectorDocs extends React.Component {
  render () {
    return (
      <div>
        <h1>
          Range Selector
          <label>Used to display and edit a start and end value with the option to define preset start/end values.</label>
        </h1>

        <h3>Demo</h3>
        <RangeSelector
          defaultLowerValue={18}
          defaultUpperValue={30}
          interval={1}
          lowerBound={-100}
          presets={[
            {
              lowerValue: 0,
              upperValue: 13,
              label: 'Gen Z'
            },
            {
              lowerValue: 14,
              upperValue: 34,
              label: 'Millenials'
            },
            {
              lowerValue: 10,
              upperValue: 40,
              label: 'Gen Y'
            },
            {
              lowerValue: 36,
              upperValue: 50,
              label: 'Gen X'
            },
            {
              lowerValue: 51,
              upperValue: 72,
              label: 'Baby Boomers'
            },
            {
              lowerValue: 73,
              upperValue: 90,
              label: 'Silent'
            }
          ]}
          upperBound={100}
        />

        <h3>Usage</h3>
        <h5>defaultLowerValue <label>Number</label></h5>
        <p>The default value for the lower value/toggle.</p>

        <h5>defaultUpperValue <label>Number</label></h5>
        <p>The default value for the upper value/toggle.</p>

        <h5>formatter <label>Function</label></h5>
        <p>A function to be used to format the toggle labels. The toggle value will be passed to this function and the function should return a formatted value.</p>

        <h5>interval <label>Number</label></h5>
        <p>A number representing the interval you'd like the toggles to snap to.</p>

        <h5>lowerBound <label>Number</label></h5>
        <p>Default: 0</p>
        <p>A number that sets the lower bound of the RangeSelector and is used to calculate the relative position of the toggles.</p>

        <h5>onLowerDragStop <label>Function</label></h5>
        <p>A function to be called when the user has stopped dragging the lower toggle. The new lower toggle value will be passed to this function.</p>

        <h5>onUpperDragStop <label>Function</label></h5>
        <p>A function to be called when the user has stopped dragging the upper toggle. The new upper toggle value will be passed to this function.</p>

        <h5>presets <label>Array</label></h5>
        <p>An array of objects with the following key/value pairs that will be used to preset the toggle values/positions when clicked: lowerValue: Number, upperValue: number, label: String.</p>

        <h5>upperBound <label>Number</label></h5>
        <p>A number that sets the upper bound of the RangeSelector and is used to calculate the relative position of the toggles.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <RangeSelector
      defaultLowerValue={18}
      defaultUpperValue={30}
      interval={1}
      presets={[
        {
          lowerValue: 0,
          upperValue: 13,
          label: 'Gen Z'
        },
        {
          lowerValue: 14,
          upperValue: 34,
          label: 'Millenials'
        },
        {
          lowerValue: 10,
          upperValue: 40,
          label: 'Gen Y'
        },
        {
          lowerValue: 36,
          upperValue: 50,
          label: 'Gen X'
        },
        {
          lowerValue: 51,
          upperValue: 72,
          label: 'Baby Boomers'
        },
        {
          lowerValue: 73,
          upperValue: 90,
          label: 'Silent'
        }
      ]}
      range={100}
    />
  `}
        </Markdown>
      </div>
    );
  }
}

module.exports = RangeSelectorDocs;
