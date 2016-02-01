const React = require('react');
const Radium = require('radium');
const StyleConstants = require('../constants/Style.js');

const Input = React.createClass({
  propTypes: {
    inputType: React.PropTypes.string,
    inputLabel: React.PropTypes.string,
    placeholderText: React.PropTypes.string,
    onChange: React.PropTypes.func,
  },

  getDefaultProps () {
    return {
      inputType: 'text',
      inputLabel: '',
      placeholderText: '',
      onChange () {},
    }
  },

  getInitialState () {
    return {
      inputString: this.props.defaultValue ? this.props.defaultValue : '',
    }
  },

  _handleChange (e) {
    this.setState({
      inputString: e.target.value
    })
    this.props.onChange(this.state.inputString)
  },

  render() {
    return (
      <div className="input-wrapper" key='wrapper' style={styles.component}>
        <input
        type={this.props.inputType}
        placeholder={this.props.placeholderText}
        style={styles.input}
        value={this.state.inputString}
        key='input'
        onChange={this._handleChange}
        />
      </div>
    )
  }
});

const styles = {
  component: {
    backgroundColor: '#FFFFFF',
    borderColor: '#e5e5e5',
    borderRadius: '3px',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    fontFamily: StyleConstants.FontFamily,
    fontSize: '12px',
    paddingTop: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
    paddingLeft: '10px',
    position: 'relative',
    WebkitAppearance: 'none',
    width: '100%',
    minHeight: '35px',

    ':focus': {
      backgroundColor: '#FFFFFF',
      boxShadow: 'none',
      color: StyleConstants.Colors.CHARCOAL,
      outline: 'none'
    }
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    color: StyleConstants.Colors.CHARCOAL,
    fontSize: '13px',
    minWidth: '95%',
    outline: 'none',
    WebkitAppearance: 'none',

    ':focus': {
      borderWidth: 0,
      boxShadow: 'none',
      outline: 'none'
    }
  }
}

module.exports = Radium(Input);
