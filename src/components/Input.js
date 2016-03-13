const React = require('react');
const Radium = require('radium');

//const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');


const Input = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    pattern: React.PropTypes.string,
    placeholderText: React.PropTypes.string,
    postfix: React.PropTypes.string,
    prefix: React.PropTypes.string,
    required: React.PropTypes.bool,
    type: React.PropTypes.string,
    validate: React.PropTypes.bool,
    validateMsg: React.PropTypes.string,
    validateOn: React.PropTypes.string,
    value: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      id: '',
      label: 'GIVE ME A LABEL',
      onChange () {},
      placeholderText: '',
      postfix: '',
      prefix: '',
      validate: false,
      pattern: '',
      validateMsg: 'Invalid',
      validateOn: 'Input',
      required: false,
      type: 'text',
      value: ''
    };
  },

  getInitialState () {
    let regex;

    if (this.props.type !== 'email') {
      regex = new RegExp(this.props.pattern);
    } else {
      regex = new RegExp('^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$', 'i');
    }
    return {
      valid: true,
      value: this.props.value,
      touched: false,
      pattern: regex
    };
  },
  _handleBlur (e) {
    if (e.target.value.length === 0 && this.props.required) {
      this.setState({ valid: false });
    } else if (this.props.validate && this.props.validateOn === 'Blur' && !this.state.pattern.test(e.target.value)) {
      this.setState({ valid: false });
    } else if (this.props.validateOn === 'Blur') {
      this.setState({ valid: true });
    }
  },
  _handleFocus () {
    if (!this.state.touched) {
      this.setState({ touched: true });
    }
  },
  _handleInput (e) {
    this.setState({ value: e.target.value });
    if (!this.state.touched) {
      this.setState({ touched: true });
    }
    if (e.target.value.length === 0 && this.props.required && this.props.validateOn === 'Input') {
      this.setState({ valid: false });
    } else if (this.props.validate && this.props.validateOn === 'Input' && !this.state.pattern.test(e.target.value)) {
      this.setState({ valid: false });
    } else if (this.props.validateOn === 'Input') {
      this.setState({ valid: true });
    }
  },
  render () {
    const styles = {
      input: {
        padding: '10px',
        margin: '0px',
        position: 'relative',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        outline: 'none',
        border: '1px solid ' + StyleConstants.Colors.FOG,
        fontFamily: StyleConstants.Fonts.REGULAR,
        display: 'table-cell'
      },
      label: {
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        fontWeight: 'bold'
      },
      labelBad: {
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        color: StyleConstants.Colors.RED,
        fontWeight: 'bold'
      },
      inputDiv: {
        borderRadius: '3px',
        position: 'relative',
        background: 'transparent',
        marginTop: '3px',
        transition: 'all .2s ease-in',
        display: 'table',
        width: '100%',
        ':hover': {
          boxShadow: '0px 0px 2px 0px ' + StyleConstants.Colors.PRIMARY
        },
        ':focus': {
          boxShadow: '0px 0px 7px 0px ' + StyleConstants.Colors.PRIMARY
        }
      },
      inputDivBad: {
        position: 'relative',
        background: 'transparent',
        marginTop: '3px',
        transition: 'all .2s ease-in',
        display: 'table',
        width: '100%',
        boxShadow: '0px 0px 7px 0px ' + StyleConstants.Colors.RED,
        borderRadius: '3px'
      },
      errorText: {
        position: 'absolute',
        color: StyleConstants.Colors.RED,
        minHeight: '15px',
        fontFamily: StyleConstants.Fonts.ITALIC,
        fontSize: StyleConstants.FontSizes.SMALL,
        bottom: '-20px',
        left: '0px'
      },
      prefix: {
        backgroundColor: StyleConstants.Colors.FOG,
        height: '100%',
        borderTopLeftRadius: '3px',
        borderBottomLeftRadius: '3px',
        display: 'table-cell',
        textAlign: 'center',
        fontFamily: StyleConstants.Fonts.REGULAR,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        padding: '6px 12px',
        boxSizing: 'border-box',
        width: '1%'
      },
      postfix: {
        backgroundColor: StyleConstants.Colors.FOG,
        height: '100%',
        borderTopRightRadius: '3px',
        borderBottomRightRadius: '3px',
        display: 'table-cell',
        textAlign: 'center',
        fontFamily: StyleConstants.Fonts.REGULAR,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        padding: '6px 12px',
        boxSizing: 'border-box',
        width: '1%'
      }
    };
    let divStyle;
    let lableStyle;
    let errorText;
    let inputStyle;

    if (this.state.valid || !this.state.touched) {
      divStyle = styles.inputDiv;
      lableStyle = styles.label;
      errorText = '';
    } else if (!this.state.valid && this.state.touched) {
      divStyle = styles.inputDivBad;
      lableStyle = styles.labelBad;
      if (this.state.value.length === 0 && this.props.required) { // invalid because it is required and empty and has been touched
        errorText = 'This field is required.';
      } else { // invalid because it doesn't match the pattern
        errorText = this.props.validateMsg;
      }
    }

    if (this.props.prefix === '' && this.props.postfix === '') { // no pre/post fix
      inputStyle = [styles.input, { borderRadius: '3px' }];
    } else if (this.props.prefix !== '' && this.props.postfix === '') { // prefix only
      inputStyle = [styles.input, { borderTopRightRadius: '3px', borderBottomRightRadius: '3px' }];
    } else if (this.props.prefix === '' && this.props.postfix !== '') { // postfix only
      inputStyle = [styles.input, { borderTopLeftRadius: '3px', borderBottomLeftRadius: '3px' }];
    } else { // both prefix and postfix
      inputStyle = styles.input;
    }

    return (
        <div style={ { display: 'block' } }>
          <label htmlFor={this.props.id}
                 style={lableStyle}>{this.props.label}</label>
          <div style={ divStyle }>
            <div style={ { display: 'table-row' } }>
              {this.props.prefix ? <span style={styles.prefix}>{this.props.prefix}</span> : null}
              <input
                  id={this.props.id}
                  name={this.props.id}
                  onBlur={this._handleBlur}
                  onChange={this.props.onChange}
                  onFocus={this._handleFocus}
                  onInput={this._handleInput}
                  placeholder={this.props.placeholderText}
                  required={this.props.required}
                  style={inputStyle}
                  type={this.props.type}
                  value={this.state.value}
                  />
              {this.props.postfix ? <span style={styles.postfix}>{this.props.postfix}</span> : null}
            </div>
            <span style={styles.errorText}>{errorText}</span>
          </div>
        </div>
    );
  }
});

module.exports = Radium(Input);