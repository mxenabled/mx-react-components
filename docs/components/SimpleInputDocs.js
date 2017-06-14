const React = require('react');
const { Link } = require('react-router');

const { SimpleInput } = require('mx-react-components');

const Code = require('components/Code');
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
        <h5>elementProps <label>Object</label></h5>
        <p>Properties to pass directly to the <Code>input</Code> element.</p>

        <h5>placeholder <label>String</label></h5>
        <p>The text to show before the user starts typing or when the <Code>input</Code> is empty.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

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
