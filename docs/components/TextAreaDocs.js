/* eslint-disable react/jsx-indent */
const React = require('react');

const { TextArea } = require('mx-react-components');

const Markdown = require('components/Markdown');

class TextAreaDocs extends React.Component {
  render () {
    return (
      <div>
        <h1>
          Text Area
          <label>A text area field used in forms</label>
        </h1>

        <h3>Demo</h3>
        <TextArea
          elementProps={{
            placeholder: 'Type something'
          }}
          rows={3}
        />

        <h3>Usage</h3>
        <h5>placeholder <label>String</label></h5>
        <p>The text to show before the user starts typing or when the input field is empty.</p>

        <h5>rows <label>Integer</label></h5>
        <p>Specifies the number of rows to show.</p>

        <h5>valid <label>Boolean</label></h5>
        <p>Indicates whether the value of Input field is valid. If it is not valid, the input field will have a red border.</p>

        <h3>Example</h3>
        <Markdown>
          {`
            <TextArea
              placeholder='Type something'
              valid={false}
            />
          `}
        </Markdown>

        <p>Properties to be passed to the input element must now be passed via the new elementProps property.  This was done to fix React unknow prop warnings.</p>

        <Markdown>
        {`
          <TextArea
            elementProps={{
              onChange: myOnChangeCallbackFunction
              placeholder: 'Type something'
            }}
            rows={5}
            valid={true}
          />
        `}
        </Markdown>
      </div>
    );
  }
}

module.exports = TextAreaDocs;
