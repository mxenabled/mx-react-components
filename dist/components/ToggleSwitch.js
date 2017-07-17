'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var Radium = require('radium');
var StyleConstants = require('../constants/Style');
var Icon = require('./Icon');

var ToggleSwitch = function (_React$Component) {
  _inherits(ToggleSwitch, _React$Component);

  function ToggleSwitch() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ToggleSwitch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToggleSwitch.__proto__ || Object.getPrototypeOf(ToggleSwitch)).call.apply(_ref, [this].concat(args))), _this), _this._handleToggle = function (event) {
      _this.props.onToggle(event);
    }, _this.styles = function () {
      return _extends({}, {
        component: {
          alignItems: 'center',
          display: 'flex',
          fontFamily: StyleConstants.Fonts.REGULAR,
          fontSize: StyleConstants.FontSizes.MEDIUM,
          position: 'relative'
        },
        icon: {
          fill: StyleConstants.Colors.WHITE,
          position: 'absolute',
          top: 0,
          zIndex: 2
        },
        trueIcon: {
          left: 0
        },
        falseIcon: {
          right: 0
        },
        label: {
          cursor: 'pointer',
          fontWeight: 'bold'
        },
        inactiveLabel: {
          color: StyleConstants.Colors.FOG
        },
        activeLabel: {
          color: StyleConstants.Colors.PRIMARY
        },
        toggle: {
          backgroundColor: StyleConstants.Colors.WHITE,
          borderRadius: '100%',
          height: 20,
          left: _this.props.checked ? 20 : 2,
          position: 'absolute',
          transition: 'all 0.5s ease',
          width: 20,
          zIndex: 3
        },
        track: {
          borderRadius: 20,
          boxSizing: 'border-box',
          cursor: 'pointer',
          height: 24,
          margin: '0 10px',
          padding: 2,
          position: 'relative',
          transition: 'all 0.5s ease',
          verticalAlign: 'middle',
          width: 42,
          zIndex: 1
        },
        trueTrack: {
          backgroundColor: StyleConstants.Colors.CHARCOAL
        },
        falseTrack: {
          backgroundColor: StyleConstants.Colors.ASH
        }
      }, _this.props.styles);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ToggleSwitch, [{
    key: 'render',
    value: function render() {
      var styles = this.styles();

      return React.createElement(
        'div',
        { className: 'toggle-switch-component', style: styles.component },
        this.props.showLabels ? React.createElement(
          'div',
          { className: 'left-label', onClick: this._handleToggle, style: _extends({}, styles.label, this.props.checked ? styles.inactiveLabel : styles.activeLabel) },
          this.props.leftLabel
        ) : null,
        React.createElement(
          'div',
          {
            className: 'toggle-switch-track',
            onClick: this._handleToggle,
            style: _extends({}, styles.track, styles[this.props.checked + 'Track'])
          },
          this.props.showIcons ? React.createElement(
            'span',
            null,
            React.createElement(Icon, { className: 'true-icon', style: _extends({}, styles.icon, styles.trueIcon), type: this.props.trueIcon }),
            React.createElement(Icon, { className: 'false-icon', style: _extends({}, styles.icon, styles.falseIcon), type: this.props.falseIcon })
          ) : null,
          React.createElement('div', { className: 'toggle-switch-toggle', style: styles.toggle })
        ),
        this.props.showLabels ? React.createElement(
          'div',
          { className: 'right-label', onClick: this._handleToggle, style: _extends({}, styles.label, this.props.checked ? styles.activeLabel : styles.inactiveLabel) },
          this.props.rightLabel
        ) : null
      );
    }
  }]);

  return ToggleSwitch;
}(React.Component);

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  falseIcon: PropTypes.string,
  leftLabel: PropTypes.string,
  onToggle: PropTypes.func,
  rightLabel: PropTypes.string,
  showIcons: PropTypes.bool,
  showLabels: PropTypes.bool,
  styles: PropTypes.object,
  trueIcon: PropTypes.string
};
ToggleSwitch.defaultProps = {
  checked: false,
  falseIcon: 'close-skinny',
  leftLabel: 'Off',
  onToggle: function onToggle() {},

  rightLabel: 'On',
  showLabels: false,
  showIcons: true,
  trueIcon: 'check-skinny'
};


module.exports = Radium(ToggleSwitch);