const React = require('react');
const { Link } = require('react-router');

const { ButtonGroup } = require('mx-react-components');

const Code = require('components/Code');
const Markdown = require('components/Markdown');

class ButtonGroupDocs extends React.Component {
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
              { 'aria-label': 'Back', icon: 'caret-left' },
              { 'aria-label': 'March 2015 to February 2016', text: 'Mar 2015 - Feb 2016' },
              { 'aria-label': 'Forward', icon: 'caret-right' }
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
              { 'aria-label': 'Download', icon: 'download' },
              { 'aria-label': 'Search', icon: 'search' },
              { 'aria-label': 'Add', icon: 'add' }
            ]}
            type='base'
          />
        </div>
        <h4>Custom Theme</h4>
        <div className='flex'>
          <ButtonGroup
            buttons={[
              { text: 'Custom' },
              { text: 'Theme' }
            ]}
            theme={{ Colors: { PRIMARY: '#DAD' } }}
            type='primaryOutline'
          />
        </div>

        <h3>Usage</h3>
        <h5>buttons <label>Array of Objects</label></h5>
        <p>Default: <Code>[]</Code></p>
        <p>An array of objects that will populate the button values. Works with as little as one object. Objects take an <Code>aria-label</Code>, <Code>icon</Code>, <Code>text</Code>, and <Code>style</Code>.</p>
        <p>A button can be disabled by adding <Code>type = 'disabled'</Code> but no other button types are supported within the button group.</p>
        <p>The <Code>aria-label</Code> attribute for each button is used for accessibility purposes but is not required.  See the <Link to='/components/button'>Button</Link> component documentation for more details.</p>

        <h5>icon <label>String</label></h5>
        <p>The name of the <a href='/components/icon'>icon</a></p>

        <h5>text <label>String</label></h5>
        <p>The text to be displayed in the button</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

        <h5>type <label>String</label></h5>
        <p>Default: <Code>'primaryOutline'</Code></p>
        <p>This sets the button type for the entire group. Available options are:</p>
        <code>['primary', 'primaryOutline', 'secondary', 'base', 'neutral', 'disabled']</code>

        <h3>Example</h3>
        <Markdown>
  {`
    <ButtonGroup
      buttons={[
         { 'aria-label': 'Download', icon: 'download' },
         { 'aria-label': 'Search', icon: 'search', type: 'disabled' },
         { 'aria-label': 'Add', icon: 'add' }
      ]}
      type='base' />
    />
  `}
        </Markdown>
      </div>
    );
  }
}

module.exports = ButtonGroupDocs;
