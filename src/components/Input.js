const React = require('react');
const Radium = require('radium');
const ReactDOM = require('react-dom');
const StyleConstants = require('../constants/Style');

const Input = React.createClass( {
    // _handleFocus () {
    // this.setState({
    //   ReactDOM.findDOMNode(this.refs.input).value = "$0.00"
    // });

    // ReactDOM.findDOMNode(this.refs.input).focus();

    getInitialState: function() {
        return {price: ''};
      },
    getDefaultProps: function() {
        return {
            prefixSymbol: '',
            suffixSymbol: '',
            defaultValue: '',
        }
    },
    handleInputChange: function(e) {

        if (e.target.value.indexOf(this.props.prefixSymbol) < 0){
            e.target.value = this.props.prefixSymbol + e.target.value + " " + this.props.suffixSymbol;
        }
        if (e.target.value === this.props.prefixSymbol + " " + this.props.suffixSymbol) {
            e.target.value = '';
        }

        this.setState({price: e.target.value});

    },
    handleFocus: function() {
        ReactDOM.findDOMNode(this.refs.input).value = this.props.prefixSymbol + this.props.defaultValue + " " + this.props.suffixSymbol
        this.setState({price: ReactDOM.findDOMNode(this.refs.input).value});
    },
    handleSubmit: function(e) {

        e.preventDefault();

        let text = ReactDOM.findDOMNode(this.refs.input).value;

        if (!text) {
          return;
        }

        let subString = text.substring(0, text.length - 4);

        let isValid = subString.search(/^\$(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$/) >= 0;

        if (!isValid) {
            alert("Invalid currency format.")
        }

        this.setState({price: ''});
    },

    render: function() {
        return (
          <form className="InputForm" onSubmit={this.handleSubmit} >
            <label htmlFor="InputForm"> <strong>Amount</strong> </label>
            <br/>
            <input
              id="price"
              key="input"
              ref="input"
              type="text"
              required={true}
              placeholder="Enter Amount"
              style={styles.inputStyle}
              value={this.state.price}
              onChange={this.handleInputChange}
              onSubmit={this.handleSubmit}
              onFocus={this.handleFocus}

              />

          </form>
        );
    }

    });


const styles = {
  inputStyle: {
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

    ':hover': {
        backgroundColor: StyleConstants.Colors.PRIMARY,
        color: StyleConstants.Colors.WHITE
    },
    ':focus': {
        backgroundColor: '#FFFFFF',
        boxShadow: 'none',
        color: StyleConstants.Colors.BLACK,
        outline: 'none'
    }
},

};

module.exports = Radium(Input)
