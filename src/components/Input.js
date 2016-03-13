const React = require('react');
const Radium = require('radium');
const ReactDOM = require('react-dom');
const _debounce = require('lodash/debounce');
const StyleConstants = require('../constants/Style');

const Input = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    prefix: React.PropTypes.string,
    suffix: React.PropTypes.string,
    type: React.PropTypes.string,
    value: React.PropTypes.string
  },

  componentDidMount () {
    this._calculateInputWidth();
    window.addEventListener('resize', _debounce(this._calculateInputWidth, 200));
  },

  componentWillUnmount () {
    window.removeEventListener('resize', _debounce(this._calculateInputWidth, 200));
  },

  //allows for input fields to dynamically adjust size based on whether
  //there is a prefix and/or suffix and also dependent on size of those
  //divs.
  _calculateInputWidth () {
    const component = ReactDOM.findDOMNode(this.refs.inputField);
    const componentStyles = window.getComputedStyle(component);
    const componentWidth = parseInt(componentStyles.width, 0);

    let width = 0;

    //Determine width of prefix and suffix divs and calculate input width
    width += this.props.prefix ? ReactDOM.findDOMNode(this.refs.prefix).clientWidth + 1 : 0;
    width += this.props.suffix ? ReactDOM.findDOMNode(this.refs.suffix).clientWidth + 1 : 0;
    const inputWidth = parseInt(componentWidth - width, 0);

    this.setState({
      componentWidth,
      inputWidth
    });
  },

  render () {
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
        borderRadius: 2,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        margin: '0 auto 15px auto'
      },
      float: {
        display: 'inline',
        float: 'left',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        height: '30px',
        margin: 0,
        padding: '0px 10px 0px 10px'
      },
      input: {
        width: this.state.inputWidth || '100%'
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

    return (
      <div ref='inputField' style={ [styles.component] }>
        <label htmlFor='test' style={ [styles.iLabel] }>{ this.props.label }</label>
        <div>
          {this.props.prefix ? <div ref='prefix' style={[styles.float, styles.prefix]} >{this.props.prefix}</div> : null }
          <input onChange={ this.props.onChange } placeholder={ this.props.placeholder }
                 style={ [styles.float, styles.input, styles.primary] }
                 type={ this.props.type } value={this.props.value}/>
          {this.props.suffix ? <div ref='suffix' style={[styles.float, styles.suffix, styles.center]}>{this.props.suffix}</div> : null}
          <br style={[styles.clearfix]}/>
        </div>
      </div>
    );
  }
});

module.exports = Radium(Input);