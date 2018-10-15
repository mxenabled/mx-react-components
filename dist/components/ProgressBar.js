"use strict";

var _Theme = require("./Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PropTypes = require('prop-types');

var React = require('react');

var _merge = require('lodash/merge');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var ProgressBar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ProgressBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ProgressBar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      var baseColor = _this.props.baseColor || theme.Colors.GRAY_300;
      var progressColor = _this.props.progressColor || theme.Colors.PRIMARY;
      return _merge({}, {
        component: {
          backgroundColor: baseColor,
          borderRadius: _this.props.height / 4,
          height: _this.props.height
        },
        progress: {
          backgroundColor: progressColor,
          borderRadius: _this.props.height / 4,
          height: _this.props.height,
          width: _this.props.percentage > 100 ? '100%' : _this.props.percentage + '%'
        }
      }, _this.props.styles);
    });

    return _this;
  }

  _createClass(ProgressBar, [{
    key: "render",
    value: function render() {
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      return React.createElement("div", {
        className: "mx-progress-bar",
        style: styles.component
      }, React.createElement("div", {
        style: styles.progress
      }, this.props.children));
    }
  }]);

  return ProgressBar;
}(React.Component);

_defineProperty(ProgressBar, "propTypes", {
  baseColor: PropTypes.string,
  height: PropTypes.number,
  percentage: PropTypes.number,
  progressColor: PropTypes.string,
  styles: PropTypes.object,
  theme: themeShape
});

_defineProperty(ProgressBar, "defaultProps", {
  height: 10
});

module.exports = (0, _Theme.withTheme)(ProgressBar);