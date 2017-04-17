const React = require('react');
const _merge = require('lodash/merge');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const StylesUtil = require('../utils/Styles');

const Input = React.createClass({
  propTypes: {
    baseColor: React.PropTypes.string,
    elementProps: React.PropTypes.object,
    focusOnLoad: React.PropTypes.bool,
    handleResetClick: React.PropTypes.func,
    icon: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    rightIcon: React.PropTypes.string,
    style: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    styles: React.PropTypes.object,
    type: React.PropTypes.string,
    valid: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      baseColor: StyleConstants.Colors.PRIMARY,
      elementProps: {},
      focusOnLoad: false,
      type: 'text',
      valid: true
    };
  },

  getInitialState () {
    return {
      focus: false
    };
  },

  componentDidMount () {
    StylesUtil.checkForDeprecated(this.props);

    if (this.props.focusOnLoad && this.input) {
      this.input.focus();
    }
  },

  _onFocus () {
    this.setState({
      focus: true
    });
  },

  _onBlur () {
    this.setState({
      focus: false
    });

    if (this.props.elementProps.onBlur) this.props.elementProps.onBlur();
  },

  render () {
    const { elementProps } = this.props;
    const styles = this.styles();

    return (
      <div
        style={Object.assign({}, styles.wrapper, this.state.focus ? styles.activeWrapper : null)}
      >
        {this.props.icon ? (
          <Icon size={20} style={styles.icon} type={this.props.icon} />
        ) : null}
        <input
          {...elementProps}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          ref={ref => this.input = ref}
          style={styles.input}
          type={this.props.type}
        />
        {this.props.rightIcon && this.props.handleResetClick ? (
          <Icon
            elementProps={{
              onClick: this.props.handleResetClick
            }}
            size={20}
            style={styles.rightIcon}
            type={this.props.rightIcon}
          />
        ) : null}
      </div>
    );
  },

  styles () {
    return _merge({}, {
      wrapper: Object.assign({}, {
        padding: StyleConstants.Spacing.SMALL,
        boxSizing: 'border-box',
        backgroundColor: StyleConstants.Colors.WHITE,
        border: this.props.valid ? '1px solid ' + StyleConstants.Colors.FOG : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        outline: 'none',
        boxShadow: 'none'
      }, this.props.style),
      activeWrapper: {
        border: '1px solid ' + this.props.baseColor
      },
      icon: {
        paddingRight: 7,
        fill: this.props.baseColor
      },
      rightIcon: {
        paddingLeft: StyleConstants.Spacing.XSMALL,
        fill: StyleConstants.Colors.FOG,
        cursor: 'pointer'
      },
      input: {
        flex: '1 0 0%',
        color: StyleConstants.Colors.CHARCOAL,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        backgroundColor: StyleConstants.Colors.WHITE,
        border: 'none',
        outline: 'none',
        boxShadow: 'none'
      }
    }, this.props.styles);
  }
});

module.exports = Input;
