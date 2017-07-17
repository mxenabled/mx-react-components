'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var Radium = require('radium');

var Button = require('./Button');

var StyleConstants = require('../constants/Style');

var _require = require('../constants/App'),
    buttonTypes = _require.buttonTypes;

var ButtonGroup = function (_React$Component) {
  _inherits(ButtonGroup, _React$Component);

  function ButtonGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ButtonGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ButtonGroup.__proto__ || Object.getPrototypeOf(ButtonGroup)).call.apply(_ref, [this].concat(args))), _this), _this.styles = function () {
      return {
        component: _extends({
          boxSizing: 'border-box',
          borderRadius: 0,
          borderWidth: 1,
          borderRightWidth: _this.props.type === 'base' ? 1 : 0,
          margin: 0,
          verticalAlign: 'middle'
        }, _this.props.style),
        firstChild: {
          borderRadius: '2px 0 0 2px'
        },
        lastChild: {
          borderRadius: '0 2px 2px 0',
          borderRightWidth: 1
        },
        onlyChild: {
          borderRadius: 2,
          borderWidth: 1
        },
        disabled: {
          backgroundColor: 'transparent',
          color: StyleConstants.Colors.FOG,
          cursor: 'default',
          fill: StyleConstants.Colors.FOG,
          ':hover': {
            backgroundColor: 'transparent'
          },
          ':active': {
            backgroundColor: 'transparent'
          }
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ButtonGroup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles();

      return React.createElement(
        'div',
        null,
        this.props.buttons.map(function (button, i) {
          var isFirstChild = i === 0;
          var isLastChild = i === _this2.props.buttons.length - 1;
          var isOnlyChild = isFirstChild && isLastChild;
          var isDisabled = button.type === 'disabled';

          return React.createElement(
            Button,
            {
              'aria-label': button['aria-label'],
              icon: button.icon,
              key: i,
              onClick: isDisabled ? null : button.onClick,
              primaryColor: _this2.props.primaryColor,
              style: _extends({}, styles.component, isFirstChild && styles.firstChild, isLastChild && styles.lastChild, isOnlyChild && styles.onlyChild, isDisabled && styles.disabled, button.style),
              type: _this2.props.type
            },
            button.text
          );
        })
      );
    }
  }]);

  return ButtonGroup;
}(React.Component);

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    'aria-label': PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    text: PropTypes.string,
    type: PropTypes.oneOf(buttonTypes)
  }).isRequired),
  primaryColor: PropTypes.string,
  type: PropTypes.oneOf(buttonTypes)
};
ButtonGroup.defaultProps = {
  buttons: [],
  primaryColor: StyleConstants.Colors.PRIMARY,
  type: 'primaryOutline'
};


module.exports = Radium(ButtonGroup);