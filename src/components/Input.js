const React = require('react');
const Radium = require('radium');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const StyleConstants = require('../constants/Style');

const Input = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    prefix: React.PropTypes.string,
    suffix: React.PropTypes.string,
    type: React.PropTypes.string,
    windowWidth: React.PropTypes.number
  },

  _calculateInputWidth () {
    ctx.font = '15px ProximaNovaSemibold';
    let width = 0;

    width += this.props.prefix ? ctx.measureText(this.props.prefix).width + 20 : 0;
    width += this.props.suffix ? ctx.measureText(this.props.suffix).width + 20 : 0;
    return `${this.props.windowWidth * 0.9 - width}px`;
  },

  render () {
    const width = this._calculateInputWidth();

    return (
      <div style={ [styles.component, { width: this.props.windowWidth * 0.9 }]}>
        <label htmlFor='test' style={ [styles.iLabel] }>{ this.props.label }</label>
          <div style={[styles.inputContainer]}>
          {this.props.prefix ? <div style={[styles.float, styles.prefix]} >{this.props.prefix}</div> : null }
          <input style={ [styles.float, { width }, styles.primary] } type={ this.props.type }/>
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
    margin: '0 auto 15px auto'

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
    }
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