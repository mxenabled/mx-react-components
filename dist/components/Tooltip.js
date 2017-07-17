'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var Tooltip = function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      showTooltip: false
    }, _this._handleInfoMouseEnter = function () {
      _this.setState({
        showTooltip: true
      });
    }, _this._handleInfoMouseLeave = function () {
      _this.setState({
        showTooltip: false
      });
    }, _this._getPosition = function () {
      var offSet = _this.props.iconSize + 5;
      var width = _this.props.tooltipStyle.width || 200;

      switch (_this.props.placement) {
        case 'left':
          return {
            bottom: 0,
            margin: 'auto',
            right: offSet,
            top: 0
          };
        case 'right':
          return {
            bottom: 0,
            left: offSet,
            margin: 'auto',
            top: 0
          };
        case 'top':
          return {
            bottom: offSet,
            left: '50%',
            marginLeft: -(_this.props.iconSize / 2 + width / 2)
          };
        case 'bottom':
          return {
            top: offSet,
            left: '50%',
            marginLeft: -(_this.props.iconSize / 2 + width / 2)
          };
        default:
          return null;
      }
    }, _this.styles = function () {
      return {
        component: _extends({}, {
          display: 'inline-block',
          fill: StyleConstants.Colors.ASH,
          position: 'relative'
        }, _this.props.style),
        tooltip: _extends({}, {
          alignItems: 'center',
          backgroundColor: StyleConstants.Colors.WHITE,
          borderRadius: 3,
          boxShadow: StyleConstants.ShadowHigh,
          display: 'flex',
          fontSize: StyleConstants.FontSizes.MEDIUM,
          justifyContent: 'center',
          lineHeight: '1.3em',
          minHeight: '100%',
          padding: 10,
          position: 'absolute',
          textAlign: 'center',
          whiteSpace: 'normal',
          width: _this.props.tooltipStyle.width || 200,
          zIndex: '10'
        }, _this._getPosition(), _this.props.tooltipStyle)
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tooltip, [{
    key: 'render',
    value: function render() {
      var styles = this.styles();

      return React.createElement(
        'div',
        { style: styles.component },
        this.state.showTooltip ? React.createElement(
          'div',
          { style: styles.tooltip },
          this.props.children
        ) : null,
        React.createElement(Icon, {
          elementProps: {
            onMouseEnter: this._handleInfoMouseEnter,
            onMouseLeave: this._handleInfoMouseLeave
          },
          size: this.props.iconSize,
          type: this.props.icon
        })
      );
    }
  }]);

  return Tooltip;
}(React.Component);

Tooltip.propTypes = {
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  placement: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  style: PropTypes.object,
  tooltipStyle: PropTypes.object
};
Tooltip.defaultProps = {
  icon: 'info',
  iconSize: 20,
  placement: 'top',
  tooltipStyle: {}
};


module.exports = Tooltip;