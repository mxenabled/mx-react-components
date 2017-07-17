'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var Radium = require('radium');

var Spin = require('./Spin');

var StyleConstants = require('../constants/Style');

var Icon = require('../components/Icon');

var _require = require('../constants/App'),
    buttonTypes = _require.buttonTypes;

var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this._isLargeOrMediumWindowSize = function () {
      var windowSize = StyleConstants.getWindowSize();

      return windowSize === 'medium' || windowSize === 'large';
    }, _this._childIsVisible = function (child) {
      return !child.props || child.props.className !== 'visuallyHidden';
    }, _this._hasVisibleChildren = function () {
      if (!_this.props.children) {
        return false;
      }

      if (!Array.isArray(_this.props.children)) {
        return _this._childIsVisible(_this.props.children);
      }

      return _this.props.children.some(_this._childIsVisible);
    }, _this.styles = function () {
      return {
        component: _extends({
          borderRadius: 2,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: 'transparent',
          boxSizing: 'border-box',
          display: 'inline-block',
          padding: '4px 14px',
          fontSize: StyleConstants.FontSizes.MEDIUM,
          fontFamily: StyleConstants.Fonts.SEMIBOLD,
          cursor: _this.props.type === 'disabled' ? 'default' : 'pointer',
          transition: 'all .2s ease-in',
          minWidth: 16,
          position: 'relative'
        }, _this.props.style),
        children: {
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          lineHeight: '20px'
        },
        primary: {
          backgroundColor: _this.props.primaryColor,
          borderColor: _this.props.primaryColor,
          color: StyleConstants.Colors.WHITE,
          fill: StyleConstants.Colors.WHITE,
          transition: 'all .2s ease-in',

          ':hover': !_this._isLargeOrMediumWindowSize() ? null : {
            backgroundColor: StyleConstants.adjustColor(_this.props.primaryColor, -15),
            borderColor: StyleConstants.adjustColor(_this.props.primaryColor, -15),
            transition: 'all .2s ease-in'
          },
          ':active': {
            backgroundColor: StyleConstants.adjustColor(_this.props.primaryColor, -30),
            borderColor: StyleConstants.adjustColor(_this.props.primaryColor, -30),
            transition: 'all .2s ease-in'
          }
        },
        primaryOutline: {
          backgroundColor: 'transparent',
          borderColor: _this.props.primaryColor,
          color: _this.props.primaryColor,
          fill: _this.props.primaryColor,
          transition: 'all .2s ease-in',

          ':hover': !_this._isLargeOrMediumWindowSize() ? null : {
            backgroundColor: _this.props.primaryColor,
            color: StyleConstants.Colors.WHITE,
            fill: StyleConstants.Colors.WHITE,
            transition: 'all .2s ease-in'
          },
          ':active': {
            backgroundColor: StyleConstants.adjustColor(_this.props.primaryColor, -30),
            borderColor: StyleConstants.adjustColor(_this.props.primaryColor, -30),
            color: StyleConstants.Colors.WHITE,
            fill: StyleConstants.Colors.WHITE,
            transition: 'all .2s ease-in'
          }
        },
        primaryInverse: {
          backgroundColor: StyleConstants.Colors.WHITE,
          borderColor: StyleConstants.Colors.WHITE,
          color: _this.props.primaryColor,
          fill: _this.props.primaryColor,
          transition: 'all .2s ease-in',

          ':hover': !_this._isLargeOrMediumWindowSize() ? null : {
            backgroundColor: StyleConstants.adjustColor(StyleConstants.Colors.WHITE, -15),
            borderColor: StyleConstants.adjustColor(StyleConstants.Colors.WHITE, -15),
            transition: 'all .2s ease-in'
          },
          ':active': {
            backgroundColor: StyleConstants.adjustColor(StyleConstants.Colors.WHITE, -30),
            borderColor: StyleConstants.adjustColor(StyleConstants.Colors.WHITE, -30),
            transition: 'all .2s ease-in'
          }
        },
        secondary: {
          backgroundColor: 'transparent',
          borderColor: StyleConstants.Colors.ASH,
          color: StyleConstants.Colors.ASH,
          fill: StyleConstants.Colors.ASH,
          transition: 'all .2s ease-in',
          ':hover': !_this._isLargeOrMediumWindowSize() ? null : {
            backgroundColor: StyleConstants.Colors.ASH,
            borderColor: StyleConstants.Colors.ASH,
            color: StyleConstants.Colors.WHITE,
            fill: StyleConstants.Colors.WHITE,
            transition: 'all .2s ease-in'
          },
          ':active': {
            backgroundColor: StyleConstants.adjustColor(StyleConstants.Colors.ASH, -30),
            borderColor: StyleConstants.adjustColor(StyleConstants.Colors.ASH, -30),
            color: StyleConstants.Colors.WHITE,
            fill: StyleConstants.Colors.WHITE,
            transition: 'all .2s ease-in'
          }
        },
        base: {
          backgroundColor: 'transparent',
          color: _this.props.primaryColor,
          fill: _this.props.primaryColor,
          transition: 'all .2s ease-in',
          borderColor: 'transparent',
          borderRadius: 2,
          borderWidth: 1,
          ':hover': !_this._isLargeOrMediumWindowSize() ? null : {
            color: StyleConstants.adjustColor(_this.props.primaryColor, -8),
            fill: StyleConstants.adjustColor(_this.props.primaryColor, -8),
            transition: 'all .2s ease-in',
            borderColor: StyleConstants.Colors.FOG
          },
          ':active': {
            color: StyleConstants.adjustColor(_this.props.primaryColor, -16),
            fill: StyleConstants.adjustColor(_this.props.primaryColor, -16),
            transition: 'all .2s ease-in',
            backgroundColor: StyleConstants.Colors.PORCELAIN
          }
        },
        neutral: {
          backgroundColor: 'transparent',
          borderColor: StyleConstants.Colors.FOG,
          borderRadius: 2,
          borderWidth: 1,
          color: _this.props.primaryColor,
          fill: _this.props.primaryColor,
          ':hover': !_this._isLargeOrMediumWindowSize() ? null : {
            backgroundColor: StyleConstants.Colors.PORCELAIN
          },
          ':active': {
            backgroundColor: StyleConstants.adjustColor(StyleConstants.Colors.PORCELAIN, -15)
          }
        },
        disabled: {
          backgroundColor: 'transparent',
          borderColor: StyleConstants.Colors.FOG,
          color: StyleConstants.Colors.FOG,
          fill: StyleConstants.Colors.FOG
        },
        icon: {
          marginLeft: _this._hasVisibleChildren() ? -4 : 0,
          marginRight: _this._hasVisibleChildren() ? 5 : 0
        },
        buttonText: {
          marginLeft: _this.props.isActive && _this.props.actionText ? 10 : 0
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var styles = this.styles();

      return React.createElement(
        'button',
        {
          'aria-label': this.props['aria-label'],
          onClick: this.props.type === 'disabled' ? null : this.props.onClick,
          ref: this.props.buttonRef,
          style: _extends({}, styles.component, styles[this.props.type], this.props.style)
        },
        React.createElement(
          'div',
          { style: styles.children },
          this.props.icon && !this.props.isActive && React.createElement(Icon, {
            size: 20,
            style: styles.icon,
            type: this.props.icon
          }),
          this.props.isActive && React.createElement(
            Spin,
            { direction: 'counterclockwise' },
            React.createElement(Icon, { size: 20, type: 'spinner' })
          ),
          React.createElement(
            'div',
            { style: styles.buttonText },
            this.props.isActive ? this.props.actionText : this.props.children
          )
        )
      );
    }
  }]);

  return Button;
}(React.Component);

Button.propTypes = {
  'aria-label': PropTypes.string,
  actionText: PropTypes.string,
  buttonRef: PropTypes.func,
  icon: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  primaryColor: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.oneOf(buttonTypes)
};
Button.defaultProps = {
  onClick: function onClick() {},

  isActive: false,
  primaryColor: StyleConstants.Colors.PRIMARY,
  type: 'primary'
};


module.exports = Radium(Button);