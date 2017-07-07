// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');

const { SelectFullScreen } = require('mx-react-components');

const Markdown = require('components/Markdown');

const options = [
  {
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

class SelectFullScreenDocs extends React.Component {
  render () {
    return (
      <div>
        <h1>
          SelectFullScreen
          <label>A custom select box meant to replace the default {'<select>'} html element.</label>
        </h1>

        <h3>Demo</h3>
        <SelectFullScreen
          isFixed={true}
          options={options}
          selected={{ value: '1', displayValue: 'Option 1' }}
        />

        <h3>Usage</h3>
        <h5>closeIcon <label>String</label></h5>
        <p>The name of the icon to used for the closing the options window.</p>

        <h5>isFixed <label>Boolean</label></h5>
        <p>A boolean used to determine if the options window is fixed or absolute.</p>

        <h5>onChange <label>Function</label></h5>
        <p>A function that is called when a new value has been selected.</p>

        <h5>optionFormatter <label>Function</label></h5>
        <p>Default:
          <Markdown>
            {`
              optionFormatter (option) {
                return (
                  <div key={option.displayValue + option.value + '_value'} style={styles.option}>
                    {option.displayValue}
                  </div>
                );
              }
            `}
          </Markdown>
        </p>
        <p>A function that formats each option.</p>

        <h5>options <label>Array</label></h5>
        <p>An array of option objects with the follow key/value pairs: value: String/Number, displayValue: String.</p>

        <h5>optionsHeaderText <label>String</label></h5>
        <p>String to be displayed above the options directing the user what to do (ie: Select An Option).</p>

        <h5>optionsStyle <label>Object or Array</label></h5>
        <p>A style object or Radium array that modifies the css styles of the options wrapper element.</p>

        <h5>optionStyle <label>Object or Array</label></h5>
        <p>A style object or Radium array that modifies the css styles of each option element.</p>

        <h5>placeholderText <label>String</label></h5>
        <p>A text to be displayed when there is no value selected.</p>

        <h5>selected <label>Object</label></h5>
        <p>An object that represents the selected value. This is typically used to pass in a default selected value. The object must have the following key/value pairs: value: String/Number, displayValue: String.</p>

        <h5>selectedStyle <label>Object or Array</label></h5>
        <p>A style object or Radium array that modifies the css styles of the selected valued.</p>


        <h3>Example</h3>
        <Markdown>
  {`
    <Select
      isFixed={true}
      options={[
        {
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
    />
  `}
        </Markdown>
      </div>
    );
  }
}

module.exports = SelectFullScreenDocs;
