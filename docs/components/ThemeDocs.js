const React = require('react');
const { Link } = require('react-router-dom');

const { Button } = require('mx-react-components');

const Code = require('components/Code');
const Markdown = require('components/Markdown');

class ThemeDocs extends React.Component {
  render () {
    return (
      <div>
        <h1>
          Theme
          <label>Custom themes for mx-react-components.</label>
        </h1>

        <h3>Basic Usage</h3>
        <p>The most common theming use case is to modify <Code>Colors.PRIMARY</Code>. For example:</p>
        <Markdown lang='js'>
          {`
    <Button theme={{ Colors: { PRIMARY: '#6C3F6F' } }}>Click me!</Button>
          `}
        </Markdown>
        <p><Button theme={{ Colors: { PRIMARY: '#b421c4' } }}>Click me!</Button></p>

        <h3>Advanced Usage</h3>
        <p>
          For more complex theming please view the source code of the component and look for how the <Code>theme</Code> prop is used.
          See <Link to='/components/styles'>Styles</Link> for the full list of theme-able constants.
        </p>
        <p>Here's a link to the <Code>Button</Code> component's source to get you started:</p>
        <p><a href='https://github.com/mxenabled/mx-react-components/blob/master/src/components/Button.js'>https://github.com/mxenabled/mx-react-components/blob/master/src/components/Button.js</a></p>
      </div>
    );
  }
}

module.exports = ThemeDocs;
