const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const _uniqueId = require('lodash/uniqueId');
const _merge = require('lodash/merge');

import { withTheme } from './Theme';
const Column = require('../components/grid/Column');
const Container = require('../components/grid/Container');
const Row = require('../components/grid/Row');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class DisplayInput extends React.Component {
  static propTypes = {
    childrenStyle: PropTypes.object,
    elementProps: PropTypes.object,
    elementRef: PropTypes.func,
    hint: PropTypes.string,
    isFocused: PropTypes.bool,
    label: PropTypes.string,
    labelStyle: PropTypes.object,
    placeholder: PropTypes.string,
    showHint: PropTypes.bool,
    status: PropTypes.shape({
      type: PropTypes.string,
      message: PropTypes.string
    }),
    styles: PropTypes.object,
    theme: themeShape,
    valid: PropTypes.bool
  };

  static defaultProps = {
    elementProps: {
      type: 'text'
    },
    isFocused: false,
    valid: true
  };

  componentWillMount () {
    this._labelId = _uniqueId('DI');
    this._inputId = this.props.elementProps.id || _uniqueId('DI');
  }

  _isLargeOrMediumWindowSize = (theme) => {
    const windowSize = StyleUtils.getWindowSize(theme.BreakPoints);

    return windowSize === 'large' || windowSize === 'medium';
  };

  _getInputColumns = (hasLabel, showHint) => {
    if (showHint && hasLabel) {
      return { large: 8, medium: 7, small: 12 };
    }

    if (showHint || hasLabel) {
      return { large: 10, medium: 9, small: 12 };
    }

    return { large: 12, medium: 12, small: 12 };
  }

  render () {
    // Input properties
    const { disabled, onChange, ...rest } = this.props.elementProps;

    // Methods
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const hasChildren = !!this.props.children;
    const isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize(theme);
    const showHint = this.props.showHint && !this.props.status && isLargeOrMediumWindowSize;
    const hasLabel = !!this.props.label;

    // Column Sizes
    const twoWidthColumn = { large: 2, medium: 2, small: 0 };
    const inputColumn = this._getInputColumns(hasLabel, showHint);
    const labelColumn = { large: 2, medium: 3, small: 12 };
    const statusColumn = { large: 10, medium: 9, small: 12 };

    // Styles
    const styles = this.styles(theme, isLargeOrMediumWindowSize);

    return (
      <Container className='mx-display-input'>
        <div style={Object.assign({}, styles.wrapper, this.props.isFocused ? styles.wrapperFocus : {})}>
          <Row>
            {this.props.label ? (
              <Column span={labelColumn}>
                <label htmlFor={this._inputId} id={this._labelId} style={Object.assign({}, styles.labelText, this.props.labelStyle)}>
                  {this.props.label}
                </label>
              </Column>
            ) : null }

            <Column relative={!hasChildren} span={inputColumn}>
              {hasChildren ? (
                <div style={Object.assign({}, styles.children, this.props.childrenStyle)}>
                  {this.props.children}
                </div>
              ) : (
                <div style={styles.inputWrapper}>
                  <input
                    {...rest}
                    aria-disabled={disabled}
                    aria-labelledby={this.props.label ? this._labelId : null}
                    id={this._inputId}
                    key='input'
                    onChange={disabled ? null : onChange}
                    ref={this.props.elementRef}
                    style={styles.input}
                  />
                </div>
              )}
            </Column>

            {showHint ? (
              <Column span={twoWidthColumn}>
                <div style={styles.hint}>
                  {this.props.showHint && !this.props.status ? (<div>{this.props.hint}</div>) : null}
                </div>
              </Column>
            ) : null }
          </Row>
        </div>

        <Row>
          {this.props.status ? (
            <Column offset={twoWidthColumn} span={statusColumn} >
              <div style={styles.status}>
                <div style={styles[this.props.status.type]}>{this.props.status.message}</div>
              </div>
            </Column>
          ) : null}
        </Row>
      </Container>
    );
  }

  styles = (theme, isLargeOrMediumWindowSize) => {
    const wrapperFocus = {
      borderBottom: this.props.valid ? '1px solid ' + theme.Colors.PRIMARY : '1px solid ' + theme.Colors.DANGER,
      boxShadow: 'none',
      outline: 'none'
    };

    return _merge({}, {
      error: {
        color: theme.Colors.DANGER
      },

      hint: {
        color: theme.Colors.PRIMARY,
        height: 20,
        paddingTop: 15,
        textAlign: 'right'
      },

      input: {
        backgroundColor: 'transparent',
        border: 0,
        color: theme.Colors.GRAY_700,
        fontSize: theme.FontSizes.LARGE,
        lineHeight: 1,
        textAlign: 'left',
        width: '100%',

        ':focus': {
          boxShadow: 'none',
          outline: 'none'
        }
      },

      inputWrapper: {
        alignItems: 'center',
        display: 'flex',
        padding: theme.Spacing.SMALL
      },

      children: {
        alignItems: 'center',
        color: theme.Colors.GRAY_700,
        display: 'flex',
        fontSize: theme.FontSizes.LARGE,
        height: theme.Spacing.LARGE,
        padding: theme.Spacing.SMALL
      },

      labelText: {
        alignItems: 'center',
        color: theme.Colors.GRAY_700,
        display: 'flex',
        fontSize: theme.FontSizes.SMALL,
        fontFamily: theme.Fonts.SEMIBOLD,
        paddingBottom: isLargeOrMediumWindowSize ? theme.Spacing.MEDIUM : theme.Spacing.XSMALL,
        paddingLeft: theme.Spacing.SMALL,
        paddingRight: theme.Spacing.SMALL,
        paddingTop: isLargeOrMediumWindowSize ? theme.Spacing.MEDIUM : theme.Spacing.XSMALL,
        textAlign: 'left'
      },

      status: {
        paddingBottom: theme.Spacing.XSMALL,
        paddingLeft: isLargeOrMediumWindowSize ? theme.Spacing.SMALL : theme.Spacing.XSMALL,
        paddingRight: theme.Spacing.SMALL,
        paddingTop: theme.Spacing.XSMALL
      },

      success: {
        color: theme.Colors.PRIMARY
      },

      wrapper: Object.assign({
        borderBottom: this.props.valid ? '1px solid ' + theme.Colors.GRAY_300 : '1px solid ' + theme.Colors.DANGER,
        boxSizing: 'border-box',
        paddingBottom: theme.Spacing.XSMALL,
        marginLeft: isLargeOrMediumWindowSize ? 0 : -10,
        marginRight: isLargeOrMediumWindowSize ? 0 : -10,
        paddingTop: theme.Spacing.XSMALL,
        transition: 'all .2s ease-in',
        WebkitAppearance: 'none',
        whiteSpace: 'nowrap',

        ':focus': wrapperFocus
      }, this.props.style),

      wrapperFocus
    }, this.props.styles);
  };
}

module.exports = withTheme(Radium(DisplayInput));
