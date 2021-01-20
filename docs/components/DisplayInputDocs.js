// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router');

const { DisplayInput, Styles } = require('mx-react-components');

const Markdown = require('components/Markdown');

class DisplayInputDocs extends React.Component {
  state = {
    showHint: false,
    statusMessage: null,
    valid: true
  };

  _handleInputShowHint = () => {
    this.setState({
      showHint: true
    });
  };

  _handleInputHideHint = () => {
    this.setState({
      showHint: false
    });
  };

  _handleInputFocus = () => {
    this.setState({
      statusMessage: null,
      showHint: false
    });
  };

  _handleInputStatusMessage = () => {
    this.setState({
      statusMessage: {
        type: 'success',
        message: 'Saved!'
      },
      valid: true
    });
  };

  render () {
    return (
      <div>
        <h1>
          Display Input
          <label>Special type of input, used primary to display details but allows for the user to edit or add data.</label>
        </h1>

        <h3>Demo</h3>
        <DisplayInput
          elementProps={{
            id: 'input-id',
            onBlur: this._handleInputStatusMessage,
            onFocus: this._handleInputFocus,
            onMouseOut: this._handleInputHideHint,
            onMouseOver: this._handleInputShowHint,
            placeholder: 'Type something'
          }}
          hint='Click to Edit'
          label='Display Input'
          showHint={this.state.showHint}
          status={this.state.statusMessage}
          valid={this.state.valid}
        />
        <DisplayInput
          elementProps={{
            disabled: true,
            id: 'input-id',
            onFocus: this._handleInputFocus,
            placeholder: 'Disabled Input',
            value: 'Disabled'
          }}
          label='Disabled Display Input'
          status={this.state.statusMessage}
          valid={true}
        />
        <DisplayInput
          childrenStyle={{ backgroundColor: Styles.Colors.GRAY_100 }}
          label='Display Children'
        >
          Custom &nbsp;<span style={{ fontFamily: 'monospace' }}>children</span>
        </DisplayInput>

        <h3>Usage</h3>

        <h5>children <label>Node</label></h5>
        <p>JSX node to be rendered in place of the standard input.</p>

        <h5>childrenStyle <label>Object</label></h5>
        <p>When providing custom children use this to to style the wrapping div.</p>

        <h5>elementRef <label>Function</label></h5>
        <p>A callback function for getting the ref on the input that shows if there are no children passed in to DisplayInput.</p>

        <h5>hint <label>String</label></h5>
        <p>Hint text to display to user on input hover.</p>

        <h5>isFocused <label>Boolean</label></h5>
        <p>When providing custom children use this to indicate that the component has focus.</p>

        <h5>label <label>String</label></h5>
        <p>Input label shown to the left of the input field.</p>

        <h5>labelStyle <label>Object</label></h5>
        <p>Styles for the input label.</p>

        <h5>placeholder <label>String</label></h5>
        <p>The text to show before the user starts typing or when the input field is empty.</p>

        <h5>showHint <label>Boolean</label></h5>
        <p>A boolean that controls when the hint text is displayed.</p>

        <h5>status <label>Object</label></h5>
        <p>An Object that contains a status type ('error' or 'success') and a status message that is displayed to the right of the input field.</p>

        <h5>statusRole <label>String</label></h5>
        <p>A string that will override the default "alert" role for the status message element.</p>

        <h5>styles <label>Object</label></h5>
        <p>A nested object that allows you to set styles on any of the elements in the component. See the `styles` method in the component code for a full list of available keys and values.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

        <h5>valid <label>Boolean</label></h5>
        <p>Indicates whether the value of Input field is valid. If it is not valid, the input field will have a red bottom border and the aria-label will update to the error message, if provided.</p>

        <h3>Example</h3>
        <Markdown>
        {`
          <DisplayInput
            label='Display Input'
            placeholder='Type something'
            valid={true}
          />
        `}
        </Markdown>

        <h5>Release Canidate 5.0.0</h5>
        <p>Properties to be passed to the input element must now be passed via the new elementProps property.  This was done to fix React unknow prop warnings.</p>

        <Markdown>
        {`
          <DisplayInput
            elementProps={{
              disabled: true,
              onChange: myOnChangeCallbackFunction,
              placeholder: 'Type something'
            }}
            label='Display Input'
            valid={true}
          />
        `}
        </Markdown>
      </div>
    );
  }
}

module.exports = DisplayInputDocs;
