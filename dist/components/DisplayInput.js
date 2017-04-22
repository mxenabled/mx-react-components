'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Radium = require('radium');

var StyleConstants = require('../constants/Style');

var Column = require('../components/grid/Column');
var Container = require('../components/grid/Container');
var Row = require('../components/grid/Row');

var DisplayInput = React.createClass({
  displayName: 'DisplayInput',

  propTypes: {
    elementProps: React.PropTypes.object,
    hint: React.PropTypes.string,
    isFocused: React.PropTypes.bool,
    label: React.PropTypes.string,
    labelStyle: React.PropTypes.object,
    placeholder: React.PropTypes.string,
    primaryColor: React.PropTypes.string,
    showHint: React.PropTypes.bool,
    status: React.PropTypes.shape({
      type: React.PropTypes.string,
      message: React.PropTypes.string
    }),
    valid: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      elementProps: {},
      isFocused: false,
      primaryColor: StyleConstants.Colors.PRIMARY,
      valid: true
    };
  },
  _isLargeOrMediumWindowSize: function _isLargeOrMediumWindowSize() {
    var windowSize = StyleConstants.getWindowSize();

    return windowSize === 'large' || windowSize === 'medium';
  },
  render: function render() {
    // Input properties
    var elementProps = this.props.elementProps;

    // Methods

    var hasChildren = !!this.props.children;
    var isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize();
    var showHint = this.props.showHint && !this.props.status && isLargeOrMediumWindowSize;

    // Column Sizes
    var twoWidthColumn = { large: 2, medium: 2, small: 0 };
    var inputColumn = showHint ? { large: 8, medium: 8, small: 12 } : { large: 10, medium: 10, small: 12 };
    var labelColumn = { large: 2, medium: 2, small: 12 };
    var statusColumn = { large: 10, medium: 10, small: 12 };

    // Styles
    var styles = this.styles();

    return React.createElement(
      Container,
      null,
      React.createElement(
        'div',
        { style: _extends({}, styles.wrapper, this.props.isFocused ? styles.wrapperFocus : {}) },
        React.createElement(
          Row,
          null,
          this.props.label ? React.createElement(
            Column,
            { span: labelColumn },
            React.createElement(
              'div',
              null,
              React.createElement(
                'div',
                { style: _extends({}, styles.labelText, this.props.labelStyle) },
                this.props.label
              )
            )
          ) : null,
          React.createElement(
            Column,
            { relative: !hasChildren, span: inputColumn },
            hasChildren ? React.createElement(
              'div',
              { style: styles.children },
              this.props.children
            ) : React.createElement(
              'div',
              { style: styles.inputWrapper },
              React.createElement('input', _extends({}, elementProps, {
                key: 'input',
                label: this.props.label,
                style: styles.input,
                type: 'text'
              }))
            )
          ),
          showHint ? React.createElement(
            Column,
            { span: twoWidthColumn },
            React.createElement(
              'div',
              { style: styles.hint },
              this.props.showHint && !this.props.status ? React.createElement(
                'div',
                null,
                this.props.hint
              ) : null
            )
          ) : null
        )
      ),
      React.createElement(
        Row,
        null,
        this.props.status ? React.createElement(
          Column,
          { offset: twoWidthColumn, span: statusColumn },
          React.createElement(
            'div',
            { style: styles.status },
            React.createElement(
              'div',
              { style: styles[this.props.status.type] },
              this.props.status.message
            )
          )
        ) : null
      )
    );
  },
  styles: function styles() {
    var isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize();
    var wrapperFocus = {
      borderBottom: this.props.valid ? '1px solid ' + this.props.primaryColor : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
      boxShadow: 'none',
      outline: 'none'
    };

    return {
      error: {
        color: StyleConstants.Colors.STRAWBERRY
      },

      hint: {
        color: this.props.primaryColor,
        height: 20,
        paddingTop: 15,
        textAlign: 'right'
      },

      input: {
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        fontSize: StyleConstants.FontSizes.LARGE,
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
        padding: StyleConstants.Spacing.SMALL
      },

      children: {
        alignItems: 'center',
        display: 'flex',
        padding: StyleConstants.Spacing.SMALL
      },

      labelText: {
        alignItems: 'center',
        color: StyleConstants.Colors.CHARCOAL,
        display: 'flex',
        fontSize: StyleConstants.FontSizes.SMALL,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        paddingBottom: isLargeOrMediumWindowSize ? StyleConstants.Spacing.MEDIUM : StyleConstants.Spacing.XSMALL,
        paddingLeft: StyleConstants.Spacing.SMALL,
        paddingRight: StyleConstants.Spacing.SMALL,
        paddingTop: isLargeOrMediumWindowSize ? StyleConstants.Spacing.MEDIUM : StyleConstants.Spacing.XSMALL,
        textAlign: 'left'
      },

      status: {
        paddingBottom: StyleConstants.Spacing.XSMALL,
        paddingLeft: isLargeOrMediumWindowSize ? StyleConstants.Spacing.SMALL : StyleConstants.Spacing.XSMALL,
        paddingRight: StyleConstants.Spacing.SMALL,
        paddingTop: StyleConstants.Spacing.XSMALL
      },

      success: {
        color: this.props.primaryColor
      },

      wrapper: _extends({
        borderBottom: this.props.valid ? '1px solid ' + StyleConstants.Colors.FOG : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
        boxSizing: 'border-box',
        paddingBottom: StyleConstants.Spacing.XSMALL,
        marginLeft: isLargeOrMediumWindowSize ? 0 : -10,
        marginRight: isLargeOrMediumWindowSize ? 0 : -10,
        paddingTop: StyleConstants.Spacing.XSMALL,
        transition: 'all .2s ease-in',
        WebkitAppearance: 'none',
        whiteSpace: 'nowrap',

        ':focus': wrapperFocus
      }, this.props.style),

      wrapperFocus: wrapperFocus
    };
  }
});

module.exports = Radium(DisplayInput);