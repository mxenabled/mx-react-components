/* eslint-disable react/jsx-indent */
const React = require('react');

const { Button, Styles } = require('mx-react-components');

const Markdown = require('components/Markdown');

class ButtonDocs extends React.Component {
  state = {
    buttonIsActive: false,
    spinnerIsActive: false
  };

  _handleButtonClick = () => {
    this.setState({
      buttonIsActive: !this.state.buttonIsActive
    });
  };

  _handleSpinnerClick = () => {
    this.setState({
      spinnerIsActive: !this.state.spinnerIsActive
    });
  };

  render () {
    return (
      <div>
        <h1>
          Button
          <label>A standard button with 7 available styles.</label>
        </h1>

        <h3>Demo</h3>
        <div className='flex'>
          <Button>Primary</Button>
          <Button style={style} type='primaryOutline'>Primary Outline</Button>
          <Button style={style} type='secondary'>Secondary</Button>
          <Button style={style} type='base'>Base</Button>
          <Button style={style} type='neutral'>Neutral</Button>
          <Button style={style} type='disabled'>Disabled</Button>
        </div>
        <div
          className='flex'
          style={{
            backgroundColor: Styles.Colors.PRIMARY,
            padding: Styles.Spacing.LARGE,
            marginTop: Styles.Spacing.LARGE,
            width: 150
          }}
        >
          <Button style={style} type='primaryInverse'>Primary Inverse</Button>
        </div>
        <br /><br />
        <div className='flex'>
          <Button icon='add'>Icon</Button>
          <Button aria-label='delete' icon='delete' style={style} />
        </div>
        <br /><br />
        <div className='flex'>
          <Button
            actionText='Loading...'
            isActive={this.state.buttonIsActive}
            onClick={this._handleButtonClick}
          >
            Loading
          </Button>
          <Button
            isActive={this.state.spinnerIsActive}
            onClick={this._handleSpinnerClick}
            style={style}
          >
            Loading (spinner only)
          </Button>
        </div>

        <h3>Usage</h3>
        <h5>actionText <label>String</label></h5>
        <p>The button text when isActive is true. If not defined, a spinner without text is shown.</p>

        <h5>aria-label <label>String</label></h5>
        <p>If defined, adds an aria-label attribute equal to the supplied value on the button element for accessibility.</p>
        <p><a href='https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute'>aria-label documentation</a></p>

        <h5>icon <label>String</label></h5>
        <p>This can be any of the Icon component values. If defined, an icon will be shown to the left of the button content.</p>

        <h5>isActive <label>Boolean</label></h5>
        <p>Default: false</p>
        <p>A boolean that is toggled when the button is clicked and when the item is finished loading..</p>

        <h5>primaryColor <label>String</label></h5>
        <p>Default: Styles.Colors.PRIMARY</p>
        <p>The primary color used with the button styles.</p>

        <h5>type <label>String</label></h5>
        <p>Default: 'primary'</p>
        <p>This sets the button type. Available options are 'primary', 'primaryOutline', 'primaryInverse', 'secondary', 'base', 'neutral', and 'disabled'. Setting the type to `disabled` also prevents onClick events from firing.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <Button aria-label='Submit Form' primaryColor='#333333' type='secondary' />
  `}
        </Markdown>
      </div>
    );
  }
}

const style = {
  margin: '0 10px'
};

module.exports = ButtonDocs;
