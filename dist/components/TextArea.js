'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var _merge = require('lodash/merge');

var StyleConstants = require('../constants/Style');

var TextArea = function (_React$Component) {
  _inherits(TextArea, _React$Component);

  function TextArea() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextArea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focus: false
    }, _this._onFocus = function () {
      _this.textarea.focus();

      _this.setState({
        focus: true
      });
    }, _this._onBlur = function () {
      _this.textarea.blur();

      _this.setState({
        focus: false
      });
    }, _this.styles = function () {
      return _merge({}, {
        component: {
          display: 'block'
        },
        wrapper: {
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
        },
        active: {
          border: '1px solid ' + _this.props.primaryColor
        },
        textarea: {
          flex: '1 0 0%',
          backgroundColor: StyleConstants.Colors.WHITE,
          border: 'none',
          outline: 'none',
          boxShadow: 'none'
        }
      }, _this.props.styles);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextArea, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          elementProps = _props.elementProps,
          rows = _props.rows;

      var styles = this.styles();

      return React.createElement(
        'div',
        {
          onBlur: this._onBlur,
          onFocus: this._onFocus,
          style: _extends({}, styles.wrapper, this.state.focus ? styles.active : null),
          tabIndex: 0
        },
        React.createElement('textarea', _extends({}, elementProps, {
          ref: function ref(_ref2) {
            _this2.textarea = _ref2;
          },
          rows: rows,
          style: styles.textarea
        }))
      );
    }
  }]);

  return TextArea;
}(React.Component);

TextArea.propTypes = {
  elementProps: PropTypes.object,
  primaryColor: PropTypes.string,
  rows: PropTypes.number,
  styles: PropTypes.object,
  valid: PropTypes.bool
};
TextArea.defaultProps = {
  elementProps: {},
  primaryColor: StyleConstants.Colors.PRIMARY,
  rows: 5,
  valid: true
};


module.exports = TextArea;