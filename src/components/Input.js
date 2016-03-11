const React = require('react');
const Radium = require('radium');

const StyleConstants = require('../constants/Style');

const Input = React.createClass({
  propTypes: {
    inputType: React.PropTypes.string, 
    prefix: React.PropTypes.string,
    suffix: React.PropTypes.string
  },

  render () {
    return (
      <div style={styles.component} id='com'>
        <label style={[styles.iLabel]} htmlFor='test'>{this.props.label}</label>

        <div style={[styles.inputContainer]}>
          {this.props.prefix ? <div style={[styles.float, styles.prefix]} >{this.props.prefix}</div> : null }
          <input style={[styles.float, styles.input, styles.primary]}id='test' />
          {this.props.suffix ? <div style={[styles.float, styles.suffix, styles.center]}>{this.props.suffix}</div> : null}
          <br style={[styles.clearfix]}/>
        </div>
      </div>
    );
  }
});

const styles = {
  clearfix: {
    clear: 'both'
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  component: {
    // border: `1px Solid ${StyleConstants.Colors.BLUE}`,
    borderRadius: 2,
    fontFamily: StyleConstants.Fonts.SEMIBOLD,
    fontSize: StyleConstants.FontSizes.MEDIUM,
    margin: '0 auto 15px auto',
    width: '90%'
  },
  float: {
    // border: `1px Solid ${StyleConstants.Colors.BLUE}`,
    display: 'inline',
    float: 'left',
    fontSize: StyleConstants.FontSizes.MEDIUM,
    height: '30px',
    margin: 0,
    padding: '0px 10px 0px 10px'
  },
  input: {
    width: '90%'
  },
  inputContainer: {
    // position: 'relative'
  },
  iLabel: {
    color: StyleConstants.Colors.PRIMARY,
    display: 'block',
    fontSize: StyleConstants.FontSizes.LARGE,
    marginBottom: '15px'
  },
  prefix: {
    background: StyleConstants.Colors.PRIMARY,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    color: StyleConstants.Colors.WHITE,
    lineHeight: '30px'

  },
  primary: {
    ':hover': {
      background: StyleConstants.adjustColor(StyleConstants.Colors.WHITE, -20),
      border: 'none',
      outline: 'none'
    },
    ':focus': {
      background: StyleConstants.adjustColor(StyleConstants.Colors.WHITE, -10),
      border: 'none',
      outline: 'none'
    },    

  },
  suffix: {
    background: StyleConstants.Colors.PRIMARY,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    color: StyleConstants.Colors.WHITE,
    lineHeight: '30px'
  }
};

module.exports = Radium(Input);