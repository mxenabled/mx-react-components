const React = require('react');
const _merge = require('lodash/merge');

const Icon = require('./Icon');
const StyleConstants = require('../constants/Style');

const Input = React.createClass({
  propTypes: {
    baseColor: React.PropTypes.string,
    focusOnLoad: React.PropTypes.bool,
    icon: React.PropTypes.string,
    placeholder: React.PropTypes.string,
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
    if (this.props.style) {
      console.warn('The style prop is deprecated and will be removed in a future release. Please used styles.');
    }

    if (this.props.focusOnLoad) {
      this.refs.input.focus();
    }
  },

  _onFocus () {
    this.refs.input.focus();

    this.setState({
      focus: true
    });
  },

  _onBlur () {
    this.refs.input.blur();

    this.setState({
      focus: false
    });
  },

  render () {
    const styles = this.styles();

    return (
      <div
        onBlur={this._onBlur}
        onFocus={this._onFocus}
        style={Object.assign({}, styles.wrapper, this.state.focus ? styles.activeWrapper : null)}
        tabIndex={0}
      >
        {this.props.icon ? (
          <Icon size={20} style={styles.icon} type={this.props.icon} />
        ) : null}
        <input
          {...this.props}
          ref='input'
          style={styles.input}
          type={this.props.type}
        />
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
        paddingRight: StyleConstants.Spacing.XSMALL,
        fill: this.props.baseColor
      },
      input: {
        flex: '1 0 0%',
        backgroundColor: StyleConstants.Colors.WHITE,
        border: 'none',
        outline: 'none',
        boxShadow: 'none'
      }
    }, this.props.styles);
  }
});

module.exports = Input;
