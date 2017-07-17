'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');
var _merge = require('lodash/merge');

var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var StylesUtil = require('../utils/Styles');

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focus: false
    }, _this._onFocus = function (e) {
      _this.setState({
        focus: true
      });

      if (_this.props.elementProps.onFocus) _this.props.elementProps.onFocus(e);
    }, _this._onBlur = function (e) {
      _this.setState({
        focus: false
      });

      if (_this.props.elementProps.onBlur) _this.props.elementProps.onBlur(e);
    }, _this.styles = function () {
      return _merge({}, {
        wrapper: _extends({}, {
          padding: StyleConstants.Spacing.SMALL,
          boxSizing: 'border-box',
          backgroundColor: StyleConstants.Colors.WHITE,
          border: _this.props.valid ? '1px solid ' + StyleConstants.Colors.FOG : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          outline: 'none',
          boxShadow: 'none'
        }, _this.props.style),
        activeWrapper: {
          border: '1px solid ' + _this.props.baseColor
        },
        icon: {
          paddingRight: 7,
          fill: _this.props.baseColor
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
      }, _this.props.styles);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Input, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      StylesUtil.checkForDeprecated(this.props);

      if (this.props.focusOnLoad && this.input) {
        this.input.focus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var elementProps = this.props.elementProps;

      var styles = this.styles();

      return React.createElement(
        'div',
        {
          style: _extends({}, styles.wrapper, this.state.focus ? styles.activeWrapper : null)
        },
        this.props.icon ? React.createElement(Icon, { size: 20, style: styles.icon, type: this.props.icon }) : null,
        React.createElement('input', _extends({}, elementProps, {
          onBlur: this._onBlur,
          onFocus: this._onFocus,
          ref: function ref(_ref2) {
            return _this2.input = _ref2;
          },
          style: styles.input,
          type: this.props.type
        })),
        this.props.rightIcon && this.props.handleResetClick ? React.createElement(Icon, {
          elementProps: {
            onClick: this.props.handleResetClick
          },
          size: 20,
          style: styles.rightIcon,
          type: this.props.rightIcon
        }) : null
      );
    }
  }]);

  return Input;
}(React.Component);

Input.propTypes = {
  baseColor: PropTypes.string,
  elementProps: PropTypes.object,
  focusOnLoad: PropTypes.bool,
  handleResetClick: PropTypes.func,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  rightIcon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  styles: PropTypes.object,
  type: PropTypes.string,
  valid: PropTypes.bool
};
Input.defaultProps = {
  baseColor: StyleConstants.Colors.PRIMARY,
  elementProps: {},
  focusOnLoad: false,
  type: 'text',
  valid: true
};


module.exports = Input;