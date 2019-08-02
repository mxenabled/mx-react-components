// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router');

const { Select } = require('mx-react-components');

const Markdown = require('components/Markdown');
const Code = require('components/Code');

const options = [
  {
    icon: 'add',
    value: '1',
    displayValue: 'Option 1'
  },
  {
    value: '2',
    displayValue: 'Option 2'
  },
  {
    value: '3',
    displayValue: 'Option 3'
  },
  {
    value: '4',
    displayValue: 'Option 4'
  },
  {
    value: '5',
    displayValue: 'Option 5'
  },
  {
    value: '6',
    displayValue: 'Option 6'
  },
  {
    value: '7',
    displayValue: 'Option 7'
  },
  {
    value: '8',
    displayValue: 'Option 8'
  },
  {
    value: '9',
    displayValue: 'Option 9'
  },
  {
    value: '10',
    displayValue: 'Option 10'
  }
];

class SelectDocs extends React.Component {
  render () {
    return (
      <div>
        <h1>
          Select
          <label>A custom select box meant to replace the default {'<select>'} html element.</label>
        </h1>

        <h3>Demo</h3>

        <h5>Default:</h5>
        <Select
          key='default'
          options={options}
          valid={true}
        />

        <h5>With prop: <Code>withSearch</Code></h5>
        <Select
          key='withSearch'
          options={options}
          valid={true}
          withSearch={true}
        />

        <h3>Usage</h3>
        <h5>dropdownStyle <label>Object or Array</label></h5>
        <p>A style object or Radium array that modifies the CSS styles of the 'div' element that wraps the selected option and options menu elements.</p>

        <h5>elementRef <label>Function</label></h5>
        <p>A callback function for getting the button on the wrapping div of the Select component.</p>

        <h5>onChange <label>Function</label></h5>
        <p>A function that is called when a new value has been selected.</p>

        <h5>options <label>Array</label></h5>
        <p>An array of option objects with the following key/value pairs: icon: String, value: String/Number, displayValue: String.</p>

        <h5>optionsStyle <label>Object or Array</label></h5>
        <p>A style object or Radium array that modifies the CSS styles of the options wrapper element.</p>

        <h5>optionStyle <label>Object or Array</label></h5>
        <p>A style object or Radium array that modifies the CSS styles of each option element.</p>

        <h5>optionTextStyle <label>Object or Array </label></h5>
        <p>A style object or Radium array that modifies the CSS style of the selected option.</p>

        <h5>placeholderText <label>String</label></h5>
        <p>A text to be displayed when there is no value selected.</p>

        <h5>scrimStyle <label>Object or Array</label></h5>
        <p>A style object or Radium array that modifies the CSS styles of scrim. The scrim is used to handle clicking away from the select box and has a default opacity of 0.</p>

        <h5>selected <label>Object</label></h5>
        <p>An object that represents the selected value. This is typically used to pass in a default selected value. The object must have the following key/value pairs: value: String/Number, displayValue: String.</p>

        <h5>selectedStyle <label>Object or Array</label></h5>
        <p>A style object or Radium array that modifies the CSS styles of the selected value.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

        <h5>valid <label>Boolean</label></h5>
        <p>If set to 'false', then the element will be marked as invalid and a red border will be placed around the element.</p>
        
        <h5>withSearch <label>Boolean</label></h5>
        <p>Default: <Code>false</Code></p>
        <p>If set to true, the component renders with the Search component to support longer lists of options</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <Select
      options={[
        {
          icon: 'add',
          value: '1',
          displayValue: 'Option 1'
        },
        {
          value: '2',
          displayValue: 'Option 2'
        },
        {
          value: '3',
          displayValue: 'Option 3'
        },
        {
          value: '4',
          displayValue: 'Option 4'
        },
        {
          value: '5',
          displayValue: 'Option 5'
        },
        {
          value: '6',
          displayValue: 'Option 6'
        },
        {
          value: '7',
          displayValue: 'Option 7'
        },
        {
          value: '8',
          displayValue: 'Option 8'
        },
        {
          value: '9',
          displayValue: 'Option 9'
        },
        {
          value: '10',
          displayValue: 'Option 10'
        }
      ]}
      valid={true}
    />
  `}
        </Markdown>
      </div>
    );
  }
}

module.exports = SelectDocs;
