// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react')
const { Link } = require('react-router')

const { Button, Styles } = require('mx-react-components')

const Code = require('components/Code')
const Markdown = require('components/Markdown')

const buttonStyle = {
  margin: '0 10px',
}

const customTheme = {
  Colors: {
    GRAY_300: '#ffc0bc',
    PRIMARY: '#6C3F6F',
  },
}

class ButtonDocs extends React.Component {
  state = {
    buttonIsActive: false,
    spinnerIsActive: false,
  }

  _handleButtonClick = () => {
    this.setState({
      buttonIsActive: !this.state.buttonIsActive,
    })
  }

  _handleSpinnerClick = () => {
    this.setState({
      spinnerIsActive: !this.state.spinnerIsActive,
    })
  }

  render() {
    return (
      <div>
        <h1>
          Button
          <label>A standard button with 7 available styles.</label>
        </h1>

        <h3>Demo</h3>
        <div className="flex">
          <Button>Primary</Button>
          <Button style={buttonStyle} type="primaryOutline">
            Primary Outline
          </Button>
          <Button style={buttonStyle} type="secondary">
            Secondary
          </Button>
          <Button style={buttonStyle} type="base">
            Base
          </Button>
          <Button style={buttonStyle} type="neutral">
            Neutral
          </Button>
          <Button style={buttonStyle} type="disabled">
            Disabled
          </Button>
        </div>
        <div
          className="flex"
          style={{
            backgroundColor: Styles.Colors.PRIMARY,
            padding: Styles.Spacing.LARGE,
            marginTop: Styles.Spacing.LARGE,
            width: 150,
          }}
        >
          <Button style={buttonStyle} type="primaryInverse">
            Primary Inverse
          </Button>
        </div>
        <br />
        <br />
        <div className="flex">
          <Button icon="add">Icon</Button>
          <Button aria-label="delete" icon="delete" style={buttonStyle} />
        </div>
        <br />
        <br />
        <div className="flex">
          <Button
            actionText="Loading..."
            isActive={this.state.buttonIsActive}
            onClick={this._handleButtonClick}
          >
            Loading
          </Button>
          <Button
            isActive={this.state.spinnerIsActive}
            onClick={this._handleSpinnerClick}
            style={buttonStyle}
          >
            Loading (spinner only)
          </Button>
        </div>
        <h4>Custom Theme</h4>
        <div className="flex">
          <Button theme={customTheme}>Primary</Button>
          <Button style={buttonStyle} theme={customTheme} type="disabled">
            Disabled
          </Button>
        </div>

        <h3>Usage</h3>
        <h5>
          actionText <label>String</label>
        </h5>
        <p>
          The button text when <Code>isActive</Code> is <Code>true</Code>. If not defined, a spinner
          without text is shown.
        </p>

        <h5>
          icon <label>String</label>
        </h5>
        <p>
          This can be any of the <Code>Icon</Code> component values. If defined, an icon will be
          shown to the left of the button content.
        </p>

        <h5>
          isActive <label>Boolean</label>
        </h5>
        <p>
          Default: <Code>false</Code>
        </p>
        <p>
          When <Code>true</Code> the <Code>Button</Code> will show either the{' '}
          <Code>actionText</Code> or a spinner.
        </p>

        <h5>
          theme <label>Object</label>
        </h5>
        <p>
          Customize the component&apos;s look. See <Link to="/components/theme">Theme</Link> for
          more information.
        </p>

        <h5>
          type <label>String</label>
        </h5>
        <p>
          Default: <Code>'primary'</Code>
        </p>
        <p>This sets the button type. Available options are:</p>
        <code>
          ['primary', 'primaryOutline', 'primaryInverse', 'secondary', 'base', 'neutral',
          'disabled']
        </code>
        <p>
          Setting the type to <Code>disabled</Code> also prevents onClick events from firing.
        </p>

        <h3>Example</h3>
        <Markdown>
          {`
    <Button aria-label='Submit Form' elementProps={{ 'data-my-attribute': 'my attribute data here' }} theme={{ Colors: { PRIMARY: '#333333' } }} type='secondary' />
  `}
        </Markdown>
      </div>
    )
  }
}

module.exports = ButtonDocs
