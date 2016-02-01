const React = require('react');
const Radium = require('radium');
const StyleConstants = require('../constants/Style.js');

const Input = React.createClass({
  propTypes: {
    inputType: React.PropTypes.oneOf([
      'number',
      'email',
      'text',
      'password'
    ]),
    defaultValue: React.PropTypes.string,
    inputLabel: React.PropTypes.string,
    isRequired: React.PropTypes.bool,
    placeholderText: React.PropTypes.string,
    prefix: React.PropTypes.string,
    onChange: React.PropTypes.func,
  },

  getDefaultProps () {
    return {
      inputType: 'text',
      defaultValue: '',
      inputLabel: '',
      isRequired: false,
      placeholderText: '',
      prefix: '',
      onChange () {},
    }
  },

  getInitialState () {
    return {
      inputString: this.props.defaultValue,
      isValid: true,
      validationMessage: ''
    }
  },

  _handleChange (e) {
    this.setState({
      inputString: e.target.value
    })
    this.props.onChange(this.state.inputString)
  },

  _validateInput () {
    const currentVal = this.state.inputString;
    let isValid;
    let message = '';
    if (!currentVal && !this.props.isRequired) return;
    switch(this.props.inputType) {
      case 'email':
        const emailRe = /[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/ig;
        isValid = emailRe.test(currentVal);
        if (!isValid) message = 'This field requires an email address'
        break;
      case 'number':
        break;
    }

    this.setState({
      isValid: isValid,
      validationMessage: message
    })
  },

  render() {
    return (
      <div className="input-wrapper" key='wrapper' style={styles.component}>
        <label style={styles.label}>{this.props.inputLabel}</label>
        <div
          className="input-outer"
          key='outer'
          style={[
            styles.outer,
            !this.state.isValid && styles.invalid
          ]}
        >
          <span className="input-prefix" style={styles.prefix}>{this.props.prefix}</span>
          <input
          type={this.props.inputType}
          placeholder={this.props.placeholderText}
          style={styles.input}
          value={this.state.inputString}
          key='input'
          onChange={this._handleChange}
          onBlur={this._validateInput}
          />
          <span className='input-suffix' style={styles.suffix}>{this.props.suffix}</span>
        </div>
        <span style={styles.message}>{this.state.validationMessage}</span>
      </div>
    )
  }
});

const styles = {
  component: {
    textAlign: 'left'
  },
  outer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#e5e5e5',
    borderRadius: '3px',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    fontFamily: StyleConstants.FontFamily,
    fontSize: '12px',
    textAlign: 'center',
    marginTop: '5px',
    marginBottom: '5px',
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
      boxShadow: '0 0 5px #359BCF',
      color: StyleConstants.Colors.CHARCOAL,
      outline: 'none'
    }
  },
  invalid: {
    borderColor: '#EF0505'
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    color: StyleConstants.Colors.CHARCOAL,
    fontSize: StyleConstants.FontSizes.MEDIUM,
    minWidth: '90%',
    outline: 'none',
    WebkitAppearance: 'none',

    ':focus': {
      borderWidth: 0,
      boxShadow: 'none',
      outline: 'none'
    }
  },
  label: {
    color: StyleConstants.Colors.CHARCOAL,
    marginLeft: '10px',
  },
  prefix: {
    float: 'left',
    fontSize: StyleConstants.FontSizes.LARGE
  },
  suffix: {
    fontSize: StyleConstants.FontSizes.LARGE,
    float: 'right'
  },
  message: {
    fontSize: StyleConstants.FontSizes.MEDIUM,
    color: '#EF0505',
    marginLeft: '10px',
    float: 'left'
  }
}

module.exports = Radium(Input);
