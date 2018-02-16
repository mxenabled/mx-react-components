const PropTypes = require('prop-types');
const React = require('react');
const _merge = require('lodash/merge');

const Icon = require('./Icon');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

class Input extends React.Component {
  static propTypes = {
    baseColor: PropTypes.string,
    elementProps: PropTypes.object,
    elementRef: PropTypes.func,
    focusOnLoad: PropTypes.bool,
    handleResetClick: PropTypes.func,
    icon: PropTypes.string,
    rightIcon: PropTypes.string,
    //keep style for backwards compatibility
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    styles: PropTypes.object,
    theme: themeShape,
    type: PropTypes.string,
    valid: PropTypes.bool
  };

  static defaultProps = {
    elementProps: {},
    focusOnLoad: false,
    type: 'text',
    valid: true
  };

  state = {
    focus: false
  };

  componentDidMount () {
    deprecatePrimaryColor(this.props, 'baseColor');

    if (this.props.focusOnLoad && this.elementRef) {
      this.elementRef.focus();
    }
  }

  _onFocus = (e) => {
    this.setState({
      focus: true
    });

    if (this.props.elementProps.onFocus) this.props.elementProps.onFocus(e);
  };

  _onBlur = (e) => {
    this.setState({
      focus: false
    });

    if (this.props.elementProps.onBlur) this.props.elementProps.onBlur(e);
  };

  render () {
    const { elementProps } = this.props;
    const theme = StyleUtils.mergeTheme(this.props.theme, this.props.baseColor);
    const styles = this.styles(theme);

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
          ref={ref => this.elementRef = ref}
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
  }

  styles = (theme) => {
    return _merge({}, {
      wrapper: Object.assign({}, {
        padding: theme.Spacing.SMALL,
        boxSizing: 'border-box',
        backgroundColor: theme.Colors.WHITE,
        border: this.props.valid ? '1px solid ' + theme.Colors.GRAY_300 : '1px solid ' + theme.Colors.DANGER,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        outline: 'none',
        boxShadow: 'none'
      }, this.props.style),
      activeWrapper: {
        border: '1px solid ' + theme.Colors.PRIMARY
      },
      icon: {
        paddingRight: 7,
        fill: theme.Colors.PRIMARY
      },
      rightIcon: {
        paddingLeft: theme.Spacing.XSMALL,
        fill: theme.Colors.GRAY_300,
        cursor: 'pointer'
      },
      input: {
        flex: '1 0 0%',
        color: theme.Colors.GRAY_700,
        fontSize: theme.FontSizes.MEDIUM,
        backgroundColor: theme.Colors.WHITE,
        border: 'none',
        outline: 'none',
        boxShadow: 'none'
      }
    }, this.props.styles);
  };
}

module.exports = Input;
