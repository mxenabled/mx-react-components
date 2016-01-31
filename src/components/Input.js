const React = require('react');
const Radium = require('radium');

const Spin = require('./Spin');

const StyleConstants = require('../constants/Style');

const InputBox = React.createClass({
  _handleChange() {
	  console.log("this is this.props.inputValue", this.props.inputValue);
  },
  render () {
    if (this.props.isLoading) {
      const styles = {
        component: {
          width: '100%',

	    },
	  	input: {
			width: 'inherit',
			fontSize: '1.1em',
			height: '30px',
			padding: '5px',

			':focus': {
				outline: '4px solid red'
			},
			':hover': {
				outline: '2px solid blue'
			}
		}
      };

      return (
        <div className='input-box' style={styles.component}>
			<input onChange={this._handleChange} style={styles.input} type="email" placeholder="This Is An Input Box" value={this.props.inputValue} />
        </div>
      );
    }
  }
});



module.exports = Radium(InputBox);
