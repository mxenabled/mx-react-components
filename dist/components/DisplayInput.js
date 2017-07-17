'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var Radium = require('radium');
var _uniqueId = require('lodash/uniqueId');

var StyleConstants = require('../constants/Style');

var Column = require('../components/grid/Column');
var Container = require('../components/grid/Container');
var Row = require('../components/grid/Row');

var DisplayInput = function (_React$Component) {
  _inherits(DisplayInput, _React$Component);

  function DisplayInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DisplayInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DisplayInput.__proto__ || Object.getPrototypeOf(DisplayInput)).call.apply(_ref, [this].concat(args))), _this), _this._isLargeOrMediumWindowSize = function () {
      var windowSize = StyleConstants.getWindowSize();

      return windowSize === 'large' || windowSize === 'medium';
    }, _this.styles = function () {
      var isLargeOrMediumWindowSize = _this._isLargeOrMediumWindowSize();
      var wrapperFocus = {
        borderBottom: _this.props.valid ? '1px solid ' + _this.props.primaryColor : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
        boxShadow: 'none',
        outline: 'none'
      };

      return {
        error: {
          color: StyleConstants.Colors.STRAWBERRY
        },

        hint: {
          color: _this.props.primaryColor,
          height: 20,
          paddingTop: 15,
          textAlign: 'right'
        },

        input: {
          backgroundColor: 'transparent',
          border: 0,
          color: StyleConstants.Colors.CHARCOAL,
          fontSize: StyleConstants.FontSizes.LARGE,
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
          padding: StyleConstants.Spacing.SMALL
        },

        children: {
          alignItems: 'center',
          color: StyleConstants.Colors.CHARCOAL,
          display: 'flex',
          fontSize: StyleConstants.FontSizes.LARGE,
          height: StyleConstants.Spacing.LARGE,
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
          color: _this.props.primaryColor
        },

        wrapper: _extends({
          borderBottom: _this.props.valid ? '1px solid ' + StyleConstants.Colors.FOG : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
          boxSizing: 'border-box',
          paddingBottom: StyleConstants.Spacing.XSMALL,
          marginLeft: isLargeOrMediumWindowSize ? 0 : -10,
          marginRight: isLargeOrMediumWindowSize ? 0 : -10,
          paddingTop: StyleConstants.Spacing.XSMALL,
          transition: 'all .2s ease-in',
          WebkitAppearance: 'none',
          whiteSpace: 'nowrap',

          ':focus': wrapperFocus
        }, _this.props.style),

        wrapperFocus: wrapperFocus
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DisplayInput, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._labelId = _uniqueId('DI');
      this._inputId = this.props.elementProps.id || _uniqueId('DI');
    }
  }, {
    key: 'render',
    value: function render() {
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
                'label',
                { htmlFor: this._inputId, id: this._labelId, style: _extends({}, styles.labelText, this.props.labelStyle) },
                this.props.label
              )
            ) : null,
            React.createElement(
              Column,
              { relative: !hasChildren, span: inputColumn },
              hasChildren ? React.createElement(
                'div',
                { style: _extends({}, styles.children, this.props.childrenStyle) },
                this.props.children
              ) : React.createElement(
                'div',
                { style: styles.inputWrapper },
                React.createElement('input', _extends({}, elementProps, {
                  'aria-labelledby': this.props.label ? this._labelId : null,
                  id: this._inputId,
                  key: 'input',
                  style: styles.input
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
    }
  }]);

  return DisplayInput;
}(React.Component);

DisplayInput.propTypes = {
  childrenStyle: PropTypes.object,
  elementProps: PropTypes.object,
  hint: PropTypes.string,
  isFocused: PropTypes.bool,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  placeholder: PropTypes.string,
  primaryColor: PropTypes.string,
  showHint: PropTypes.bool,
  status: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string
  }),
  valid: PropTypes.bool
};
DisplayInput.defaultProps = {
  elementProps: {
    type: 'text'
  },
  isFocused: false,
  primaryColor: StyleConstants.Colors.PRIMARY,
  valid: true
};


module.exports = Radium(DisplayInput);