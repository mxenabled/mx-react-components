const React = require('react');

const { Button } = require('mx-react-components');

const Markdown = require('components/Markdown');

const ButtonDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
          Button
          <label>A standard button with 5 available styles.</label>
        </h1>

        <h3>Demo</h3>
        <div className='flex'>
          <Button style={style}>Primary</Button>
          <Button style={style} type='secondary'>Secondary</Button>
          <Button style={style} type='base'>Base</Button>
          <Button style={style} type='nertral'>Neurral</Button>
          <Button style={style} type='disabled'>Disabled</Button>
        </div>

        <h3>Usage</h3>
        <h5>primaryColor <label>String</label></h5>
        <p>Default: Styles.Colors.PRIMARY</p>
        <p>The primary color used with the button styles.</p>

        <h5>type <label>String</label></h5>
        <p>Default: 'primary'</p>
        <p>This sets the button type. Available options are 'primary', 'secondary', 'base', 'neutral', and 'disabled'</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <Button primaryColor='#333333' type='secondary' />
  `}
        </Markdown>
      </div>
    );
  }
});

const style = {
  margin: '0 10px'
};

module.exports = ButtonDocs;