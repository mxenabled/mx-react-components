const React = require('react');
const Radium = require('radium');

const Spin = require('./Spin');

const StyleConstants = require('../constants/Style');

const InputBox = React.createClass({
  propTypes: {
	  inputValue: React.PropTypes.string,
	  prefix: React.PropTypes.string,
	  suffix: React.PropTypes.string,
	  handleInputValueChange: React.PropTypes.func,
	  email: React.PropTypes.bool,
	  phone: React.PropTypes.bool,
	  currency: React.PropTypes.bool
  },
  getDefaultProps() {
	  return{
		  inputValue: "test",
		  email: false,
		  phone: false,
		  currency: true
		//   prefix: "$$",
		//   suffix: '.00'
	  };
  },
  getInitialState () {
	  return {
		  valid: false
	  }
  },

  _handleChange(event) {
	  const textValue = event.target.value;

	  this.props.handleInputValueChange(textValue);

	  this._handleValidate(textValue);

	//   this.setState({value: textValue}, () => {
	  //
	// 	  this._handleValidate(this.state.value);
	  //
	// 	  console.log("this.state.value", this.state.value);
	//   });
  },
  _handleValidate(textValue) {
	let isValid = this._validateText(textValue);
	this.setState({
		valid: isValid
	});
	//   if(textValue !== "aaaa") {
	// 	  console.log("woohoo!");
	//   } else {
	// 	  console.log("nope");
	// 	  this.setState({
	// 		  valid: true
	// 	  });
	//   }
  },
  _validateText(inputTextValue) {
	  if(this.props.email) {

        return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( inputTextValue );
	  }
	  if(this.props.phone) {
		  return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test( inputTextValue );
	  }
	  if(this.props.currency) {
		  return /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/.test( inputTextValue );
	  }
  },
  render () {
      const styles = {
        component: {
          width: '100%',

	    },
	  	input: {
			width: 'inherit',
			fontSize: '1em',
			height: '30px',
			padding: '5px',

			':focus': {
				outline: '4px solid red'
			},
			':hover': {
				backgroundColor: 'rgb(240, 240, 240)'
			}
		},
		valid: {
			color: 'blue'
		},
		notValid: {
			color: 'red'
		}
      };
	  //IS THIS OK?
	  let isValid = this.state.valid ? <h1 style={styles.valid}> TESTING</h1> :
	  								   <h6 style={styles.notValid}> Not</h6>;

      return (

        <div className='input-box' style={styles.component}>
			<input onChange={this._handleChange}
			 style={styles.input} type="text"
			 placeholder="This Is An Input Box"
			 />
			 <div style={styles.isValid}>
			 {isValid}
			 </div>

        </div>
      );
  }
});



module.exports = Radium(InputBox);
