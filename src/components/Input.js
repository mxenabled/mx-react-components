const React = require('react');
const Radium = require('radium');
const StyleConstants = require('../constants/Style');

const Input = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
    inputLabel: React.PropTypes.string,
    inputType: React.PropTypes.oneOf([
      'number',
      'email',
      'text',
      'password'
    ]),
    isRequired: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    placeholderText: React.PropTypes.string,
    prefix: React.PropTypes.string,
    suffix: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      inputType: 'text',
      defaultValue: '',
      inputLabel: '',
      isRequired: false,
      placeholderText: '',
      onChange () {},
      prefix: '',
      suffix: ''
    };
  },

  getInitialState () {
    return {
      inputString: this.props.defaultValue,
      isValid: true,
      validationMessage: ''
    };
  },

  _handleChange (e) {
    this.setState({
      inputString: e.target.value
    });
    this.props.onChange(e.target.value);
  },

  _validateInput () {
    const currentVal = this.state.inputString;
    let valid;
    let message = '';

    if (!currentVal && !this.props.isRequired) {
      this.setState({
        isValid: true,
        validationMessage: ''
      });
      return;
    }
    switch (this.props.inputType) {
      case 'email':
        const emailRe = /[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/ig;
        valid = emailRe.test(currentVal);
        if (!valid) message = 'This field requires an email address';
        break;
      case 'password':
        const passRe = /^[a-zA-Z0-9]+$/;
        valid = passRe.test(currentVal);
        if (!valid) message = 'Your password may only contain letters and numbers';
        break;
      case 'text':
        valid = true;
        break;
      case 'number':
        valid = true;
        break;
      // default:
      //   valid = true;
    }

    this.setState({
      isValid: valid,
      validationMessage: message
    });
  },

  render () {
    return (
      <div className='input-wrapper' key='wrapper' style={styles.component}>
        <label style={styles.label}>{this.props.inputLabel}</label>
        <div
          className='input-outer'
          key='outer'
          style={[
            styles.outer,
            !this.state.isValid && styles.invalid,
            this.state.isValid && styles.outerHover
          ]}
        >
          <span className='input-prefix' style={styles.prefix}>{this.props.prefix}</span>
          <input
            key='input'
            onBlur={this._validateInput}
            onChange={this._handleChange}
            placeholder={this.props.placeholderText}
            style={[
              styles.input,
              this.props.prefix && this.props.suffix && styles.shrinkInput
            ]}
            type={this.props.inputType}
            value={this.state.inputString}
          />
          <span className='input-suffix' style={styles.suffix}>{this.props.suffix}</span>
        </div>
        <span style={styles.message}>{this.state.validationMessage}</span>
      </div>
    );
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
  outerHover: {
    ':hover': {
      borderColor: '#000'
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
    minWidth: '95%',
    outline: 'none',
    WebkitAppearance: 'none',

    ':focus': {
      borderWidth: 0,
      boxShadow: 'none',
      outline: 'none'
    }
  },
  shrinkInput: {
    minWidth: '90%'
  },
  label: {
    color: StyleConstants.Colors.CHARCOAL,
    marginLeft: '10px'
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
};

module.exports = Radium(Input);
