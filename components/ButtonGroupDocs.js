const React = require('react');

const { ButtonGroup } = require('mx-react-components');

const Markdown = require('components/Markdown');

const ButtonGroupDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
          Button Group
          <label>A standard button group with 6 available styles.</label>
        </h1>

        <h3>Demo</h3>
        <div className='flex'>
          <ButtonGroup
            buttons={[
              { icon: 'caret-left' },
              { text: 'Mar 2015 - Feb 2016' },
              { icon: 'caret-right' }
            ]}
            type='primaryOutline'
          />
        </div>
        <br/><br/>
        <div>
          <ButtonGroup
            buttons={[
              { icon: 'download' },
              { icon: 'search' },
              { icon: 'add' }
            ]}
            type='base'
          />
        </div>

        <h3>Usage</h3>
        <h5>buttons <label>Array of Objects</label></h5>
        <p>Default: An empty array</p>
        <p>An array of objects that will populate the button values. Works with as little as one object. Objects take an <label>icon</label>, <label>text</label>, or both.</p>

        <h5>icon <label>String</label></h5>
        <p>The name of the <a href='/components/icon'>icon</a></p>

        <h5>text <label>String</label></h5>
        <p>The text to be displayed in the button</p>

        <h5>primaryColor <label>String</label></h5>
        <p>Default: Styles.Colors.PRIMARY</p>
        <p>The primary color used with the button styles.</p>

        <h5>type <label>String</label></h5>
        <p>Default: 'primaryOutline'</p>
        <p>This sets the button type for the entire group. Available options are 'primary', 'primaryOutline', 'secondary', 'base', 'neutral', and 'disabled'</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <ButtonGroup
      buttons={[
         { icon: 'download' },
         { icon: 'search' },
         { icon: 'add' }
      ]}
      type='base' />
    />
  `}
        </Markdown>
      </div>
    );
  }
});

module.exports = ButtonGroupDocs;
