const PropTypes = require('prop-types');
const React = require('react');
const _merge = require('lodash/merge');

import { withTheme } from './Theme';

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class SimpleInput extends React.Component {
  static propTypes = {
    elementProps: PropTypes.object,
    elementRef: PropTypes.func,
    focusOnLoad: PropTypes.bool,
    prefix: PropTypes.node,
    //keep style for backwards compatibility
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    styles: PropTypes.object,
    suffix: PropTypes.node,
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
    const { elementProps, prefix, suffix } = this.props;
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);

    return (
      <div
        className='mx-simple-input'
        style={this.state.focus ? { ...styles.wrapper, ...styles.activeWrapper } : styles.wrapper}
      >
        {prefix ? prefix : null}
        <input
          {...elementProps}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          ref={ref => {
            this.elementRef = ref;
            if (typeof this.props.elementRef === 'function') this.props.elementRef(ref);
          }}
          style={styles.input}
          type={this.props.type}
        />
        {suffix ? suffix : null}
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

module.exports = withTheme(SimpleInput);
