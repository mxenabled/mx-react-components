const React = require('react');
const Radium = require('radium');

const Spin = require('./Spin');

const StyleConstants = require('../constants/Style');
const Icon = require('../components/Icon');

const styles = {
  component: {
    width: '100%',
  },
  icon: {
    color: 'green',
    display: 'inline-block'
  },
  input: {
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    width: '90%',
    margin: '0 auto',
    display: 'inline-block',
    fontSize: '12px'
  },
  inputHolder: {
    width: 'inherit',
    fontSize: '12px',
    height: '18px',
    padding: '5px',
    outline: 'none',
    border: '1px solid rgb(229, 229, 229)',
    borderRadius: '3px',

	  ':focus': {
		  outline: 'focus-ring-color auto 4px',
		  backgroundColor: 'white'
	  },
	  ':hover': {
		  backgroundColor: 'rgb(249, 249, 249)'
	  }
  }
};

const InputBox = React.createClass({
  propTypes: {
    currency: React.PropTypes.bool,
    email: React.PropTypes.bool,
    handleInputValueChange: React.PropTypes.func,
    icon: React.PropTypes.string,
    phone: React.PropTypes.bool,
    placeholderText: React.PropTypes.string,
    prefix: React.PropTypes.string,
    text: React.PropTypes.bool
  },

  getDefaultProps() {
	  return{
      currency: false,
		  email: false,
		  phone: false,
      placeholderText: "Placeholder Text...",
		  prefix: "",
      text: false,
	  };
  },

  getInitialState () {
    return {
      valid: false
    }
  },

  _getValidIcon () {
    //Returns the 'check' type icon if the input is valid
    let isValid = this.state.valid ? 'check' : '';
    return isValid;
  },

  _handleChange(event) {
	  const textValue = event.target.value;

	  this.props.handleInputValueChange(textValue);

	  this._handleValidate(textValue);
  },

  _handleValidate(textValue) {
	  let isValid = this._validateText(textValue);
	    this.setState({
		    valid: isValid
	    });
  },

  _validateText(inputTextValue) {
	  //Validates for Email (version 1)
	  if(this.props.email) {
        return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( inputTextValue );
	  }
	  //Validates for Phone
	  if(this.props.phone) {
		  return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test( inputTextValue );
	  }
	  //Validates for other
	  if(this.props.currency) {
		  return /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/.test( inputTextValue );
	  }
    //Allows any characters - standard input
	  if(this.props.text) {
	    return true;
  	}
  },

  render () {
    return (
      <div className='input-box' style={styles.component}>
        <div style={styles.inputHolder} >
          <span> {this.props.prefix} </span>
			    <input
            onChange={this._handleChange}
            placeholder={this.props.placeholderText}
            style={styles.input}
            type="text"
            value={this.props.defaultValueProp}
			    />
          <Icon
            size={20}
				    type={this._getValidIcon()}
				    style={styles.icon}
			    />
		    </div>
      </div>
    );
  }
});

module.exports = Radium(InputBox);
