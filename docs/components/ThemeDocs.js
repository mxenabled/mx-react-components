const React = require('react');
const { Link } = require('react-router');

const { Button, ThemeProvider } = require('mx-react-components');

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

        <h3>Passing the Theme</h3>
        <p>There are two options available for theming a component.         The most common theming use case is to modify <Code>Colors.PRIMARY</Code>. For the full list of theme-able constants see <Link to='/components/styles'>Styles</Link>.</p>

        <h4>Option 1: ThemeProvider</h4>
        <p>Use <Code>&lt;ThemeProvider&gt;</Code> to make the theme available to all components in the application without passing it via props. Render it once at the root of your application and all theme-able components will have access to the theme.
        </p>

        <Markdown lang='js'>
          {`
    <ThemeProvider theme={{ Colors: { PRIMARY: '#F00' } }}>
      <Button>Click me!</Button>
    </ThemeProvider>
          `}
        </Markdown>
        <p>
          <ThemeProvider theme={{ Colors: { PRIMARY: '#F00' } }}>
            <Button>Click me!</Button>
          </ThemeProvider>
        </p>

        <h4>Option 2: Props</h4>
        <Markdown lang='js'>
          {`
    <Button theme={{ Colors: { PRIMARY: '#F00' } }}>Click me!</Button>
          `}
        </Markdown>
        <p>
          <Button theme={{ Colors: { PRIMARY: '#F00' } }}>Click me!</Button>
        </p>

        <h3>Advanced Usage</h3>
        <p>
          For more complex theming please view the source code of the component and look for how the <Code>theme</Code> prop is used.
        </p>
        <p>Here's a link to the <Code>Button</Code> component's source to get you started:</p>
        <p><a href='https://github.com/mxenabled/mx-react-components/blob/master/src/components/Button.js'>https://github.com/mxenabled/mx-react-components/blob/master/src/components/Button.js</a></p>
      </div>
    );
  }
}

module.exports = ThemeDocs;
