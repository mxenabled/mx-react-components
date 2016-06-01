const React = require('react');

const { RadioButton, Styles } = require('mx-react-components');

const Markdown = require('components/Markdown');

const RadioButtonDocs = React.createClass({
  getInitialState () {
    return {
      selected: false
    };
  },

  _handleRadioClick () {
    this.setState({
      selected: !this.state.selected
    });
  },

  render () {
    return (
      <div>
        <h1>
          Radio Button
          <label>A simple radio button used in forms</label>
        </h1>

        <h3>Demo</h3>
        <RadioButton checked={!this.state.selected}>Default Style</RadioButton>
        <RadioButton
          activeButtonStyle={{ backgroundColor: '#FBB600' }}
          buttonStyle={{ height: 30, width: 30 }}
          checked={this.state.selected}
          color='#FBB600'
          onClick={this._handleRadioClick}
          style={{ marginTop: 20 }}
        >
          Custom Style
        </RadioButton>

        <h3>Usage</h3>
        <h5>activeButtonStyle <label>Object</label></h5>
        <p>A style object that modifies the css styles of the inner 'div' element that creates the checked indicator for the radio button.</p>

        <h5>buttonStyle <label>Object</label></h5>
        <p>A style object that modifies the css styles of the 'div' element that creates the radio button.</p>

        <h5>checked <label>Boolean</label></h5>
        <p>A boolean indicating if the radio button should show as checked.</p>

        <h5>children <label>Boolean</label></h5>
        <p>Optional content included between opening and closing tags such as a label.</p>

        <h5>color <label>String</label></h5>
        <p>A string with a valid CSS color to use for the checked indicator. Defaults to <span style={{ color: Styles.Colors.PRIMARY }}>{Styles.Colors.PRIMARY}</span>. This can also be overridden with the activeButtonStyle prop.</p>

        <h5>onClick <label>Function</label></h5>
        <p>A callback function that will be triggered on component click.</p>

        <h5>style <label>Object</label></h5>
        <p>A style object that modifies the css styles of the 'div' element that wraps the component.</p>

        <h3>Example</h3>
        <Markdown>
          {`
            <RadioButton
              activeButtonStyle={{ backgroundColor: '#FBB600' }}
              buttonStyle={{ height: 30, width: 30 }}
              checked={true}
              color='#FBB600'
              onClick={this._handleRadioClick}
              style={{ marginTop: 20 }}
            >
              Label
            </RadioButton>
          `}
        </Markdown>
      </div>
    );
  }
});

module.exports = RadioButtonDocs;
