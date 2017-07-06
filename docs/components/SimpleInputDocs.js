/* eslint-disable react/jsx-indent */
const React = require('react');

const { SimpleInput } = require('mx-react-components');

const Markdown = require('components/Markdown');

class SimpleInputDocs extends React.Component {
  render () {
    return (
      <div>
        <h1>
          Simple Input
          <label>A simple input field used in forms</label>
        </h1>

        <h3>Demo</h3>
        <SimpleInput
          elementProps={{
            placeholder: 'Type something'
          }}
        />

        <h3>Usage</h3>
        <h5>placeholder <label>String</label></h5>
        <p>The text to show before the user starts typing or when the input field is empty.</p>

        <h5>valid <label>Boolean</label></h5>
        <p>Indicates whether the value of Input field is valid. If it is not valid, the input field will have a red border.</p>

        <h3>Example</h3>
        <Markdown>
          {`
            <SimpleInput
              placeholder='Type something'
              type='text'
              valid={false}
            />
          `}
        </Markdown>

        <h5>Release Canidate 5.0.0</h5>
        <p>Properties to be passed to the input element must now be passed via the new elementProps property.  This was done to fix React unknow prop warnings.</p>

        <Markdown>
        {`
          <SimpleInput
            elementProps={{
              onChange: myOnChangeCallbackFunction
              placeholder: 'Type something'
            }}
            label='Type something'
            valid={true}
          />
        `}
        </Markdown>
      </div>
    );
  }
}

module.exports = SimpleInputDocs;
