const React = require('react');

const { SimpleInput } = require('mx-react-components');

const Markdown = require('components/Markdown');

const SimpleInputDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
          SimpleInput
          <label>A simple input field used in forms</label>
        </h1>

        <h3>Demo</h3>
        <SimpleInput
          placeholder='Type something'
        />

        <h3>Usage</h3>
        <h5>placeholder <label>String</label></h5>
        <p>a placeholder text appears in Input field before you type.</p>

        <h5>valid <label>Boolean</label></h5>
        <p>Indicates whether the value of Input field is valid. If it is not valid, Input field will have a red border.</p>

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
      </div>
    );
  }
});

module.exports = SimpleInputDocs;