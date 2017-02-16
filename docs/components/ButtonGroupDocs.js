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
              { ariaLabel: 'Back', icon: 'caret-left' },
              { ariaLabel: 'March 2015 to February 2016', text: 'Mar 2015 - Feb 2016' },
              { ariaLabel: 'Forward', icon: 'caret-right' }
            ]}
            type='primaryOutline'
          />
        </div>
        <br /><br />
        <div className='flex'>
          <ButtonGroup
            buttons={[
              { text: 'Item 1' },
              { text: 'Item 2, disabled', type: 'disabled' },
              { text: 'Item 3' },
              { text: 'Item 4' }
            ]}
            type='primaryOutline'
          />
        </div>
        <br /><br />
        <div>
          <ButtonGroup
            buttons={[
              { ariaLabel: 'Download', icon: 'download' },
              { ariaLabel: 'Search', icon: 'search' },
              { ariaLabel: 'Add', icon: 'add' }
            ]}
            type='base'
          />
        </div>

        <h3>Usage</h3>
        <h5>buttons <label>Array of Objects</label></h5>
        <p>Default: An empty array</p>
        <p>An array of objects that will populate the button values. Works with as little as one object. Objects take an <label>ariaLabel</label>, <label>icon</label>, <label>text</label>, and <label>style</label>.</p>
        <p>A button can be disabled by adding <label>type = 'disabled'</label> but no other button types are supported within the button group.</p>
        <p>The ariaLabel attribute for each button is used for accessibility purposes but is not required.  See the Button component documentation for more details.</p>

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
         { ariaLabel: 'Download', icon: 'download' },
         { ariaLabel: 'Search', icon: 'search', type: 'disabled' },
         { ariaLabel: 'Add', icon: 'add' }
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
