'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var StyleConstants = require('../constants/Style');

var RadioButton = function (_React$Component) {
  _inherits(RadioButton, _React$Component);

  function RadioButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RadioButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadioButton.__proto__ || Object.getPrototypeOf(RadioButton)).call.apply(_ref, [this].concat(args))), _this), _this.styles = function () {
      return {
        component: _extends({}, {
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }, _this.props.style),
        radioButton: _extends({}, {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 15,
          height: 15,
          marginRight: 5,
          border: '1px solid ' + StyleConstants.Colors.FOG,
          borderRadius: '100%',
          backgroundColor: StyleConstants.Colors.WHITE
        }, _this.props.buttonStyle),
        radioButtonActive: _extends({}, {
          width: '60%',
          height: '60%',
          borderRadius: '100%',
          backgroundColor: _this.props.color
        }, _this.props.activeButtonStyle)
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RadioButton, [{
    key: 'render',
    value: function render() {
      var styles = this.styles();

      return React.createElement(
        'div',
        { onClick: this.props.onClick, style: styles.component },
        React.createElement(
          'div',
          { style: styles.radioButton },
          this.props.checked ? React.createElement('div', { style: styles.radioButtonActive }) : null
        ),
        React.createElement(
          'div',
          { style: styles.children },
          this.props.children
        )
      );
    }
  }]);

  return RadioButton;
}(React.Component);

RadioButton.propTypes = {
  activeButtonStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  checked: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
};
RadioButton.defaultProps = {
  color: StyleConstants.Colors.PRIMARY,
  onClick: function onClick() {}
};


module.exports = RadioButton;