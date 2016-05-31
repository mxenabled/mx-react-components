const React = require('react');

const { Select } = require('mx-react-components');

const Markdown = require('components/Markdown');

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

const SelectDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
          Select
          <label>A custom select box meant to replace the default {'<select>'} html element.</label>
        </h1>

        <h3>Demo</h3>
        <Select
          key='default'
          options={options}
          valid={true}
        />

        <h3>Usage</h3>
        <h5>color <label>String</label></h5>
        <p>Color that changes hover state color on menu options.</p>

        <h5>dropdownStyle <label>Object | Array</label></h5>
        <p>A style object or Radium array that modifies the css styles of the 'div' element that wraps the selected option and options menu elements.</p>

        <h5>onChange <label>Function</label></h5>
        <p>A function that is called when a new value has been selected.</p>

        <h5>options <label>Array</label></h5>
        <p>An array of option objects with the follow key/value pairs: icon: String, value: String/Number, displayValue: String.</p>

        <h5>optionsStyle <label>Object or Array</label></h5>
        <p>A style object or Radium array that modifies the css styles of the options wrapper element.</p>

        <h5>optionStyle <label>Object or Array</label></h5>
        <p>A style object or Radium array that modifies the css styles of each option element.</p>

        <h5>placeholderText <label>String</label></h5>
        <p>A text to be displayed when there is no value selected.</p>

        <h5>scrimStyle <label>Object | Array</label></h5>
        <p>A style object or Radium array that modifies the css styles of scrim. The scrim is used to handle clicking away from the select box and has a default opacity of 0.</p>

        <h5>selected <label>Object</label></h5>
        <p>An object that represents the selected value. This is typically used to pass in a default selected value. The object must have the following key/value pairs: value: String/Number, displayValue: String.</p>

        <h5>selectedStyle <label>Object or Array</label></h5>
        <p>A style object or Radium array that modifies the css styles of the selected valued.</p>

        <h5>valid <label>Boolean</label></h5>
        <p>If set to 'false', then the element will be marked as invalid and a red border will be placed around the element.</p>

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
});

module.exports = SelectDocs;
