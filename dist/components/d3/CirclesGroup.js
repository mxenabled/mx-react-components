"use strict";

var _Theme = require("../Theme");

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

var d3 = require('d3');

var _require = require('../../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../../utils/Style');

var CirclesGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CirclesGroup, _React$Component);

  function CirclesGroup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CirclesGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CirclesGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_animateCircles", function () {
      if (_this.props.shouldAnimate) {
        d3.select(_this.circleGroup).selectAll('.circle').data(_this.props.data).transition().attr('cy', function (d) {
          return _this.props.yScaleValueFunction(d.y);
        });
      }
    });

    return _this;
  }

  _createClass(CirclesGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._animateCircles();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._animateCircles();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          adjustedHeight = _this$props.adjustedHeight,
          circleOverlayRadius = _this$props.circleOverlayRadius,
          circleRadius = _this$props.circleRadius,
          data = _this$props.data,
          shouldAnimate = _this$props.shouldAnimate,
          translation = _this$props.translation,
          useCircleOverlay = _this$props.useCircleOverlay,
          xScaleValueFunction = _this$props.xScaleValueFunction,
          yScaleValueFunction = _this$props.yScaleValueFunction;
      var preventCircleOverlapCutOff = 45;
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var circleColor = this.props.circleColor || theme.Colors.GRAY_700;
      return React.createElement("g", {
        className: "circle-group",
        ref: function ref(_ref) {
          return _this2.circleGroup = _ref;
        },
        transform: translation
      }, data.length <= preventCircleOverlapCutOff ? data.map(function (item, index) {
        var cx = xScaleValueFunction(item.x);
        var cy = shouldAnimate ? adjustedHeight : yScaleValueFunction(item.y);
        return React.createElement("g", {
          key: index
        }, React.createElement("circle", {
          className: "circle",
          cx: cx,
          cy: cy,
          fill: theme.Colors.WHITE,
          onClick: function onClick() {
            if (!useCircleOverlay) {
              _this2.props.onCircleClick(item);
            }
          },
          r: circleRadius,
          stroke: circleColor,
          style: {
            'strokeWidth': _this2.props.strokeWidth
          }
        }), useCircleOverlay && React.createElement("circle", {
          className: "circle-overlay",
          cx: cx,
          cy: yScaleValueFunction(item.y),
          fill: theme.Colors.WHITE,
          onClick: function onClick() {
            _this2.props.onCircleClick(item);
          },
          r: circleOverlayRadius,
          style: {
            'fillOpacity': 0
          }
        }));
      }) : null);
    }
  }]);

  return CirclesGroup;
}(React.Component);

_defineProperty(CirclesGroup, "propTypes", {
  adjustedHeight: PropTypes.number.isRequired,
  circleColor: PropTypes.string,
  circleOverlayRadius: PropTypes.number,
  circleRadius: PropTypes.number,
  data: PropTypes.array.isRequired,
  onCircleClick: PropTypes.func,
  shouldAnimate: PropTypes.bool,
  strokeWidth: PropTypes.number,
  theme: themeShape,
  translation: PropTypes.string,
  useCircleOverlay: PropTypes.bool,
  xScaleValueFunction: PropTypes.func.isRequired,
  yScaleValueFunction: PropTypes.func.isRequired
});

_defineProperty(CirclesGroup, "defaultProps", {
  circleOverlayRadius: 6,
  circleRadius: 3,
  onCircleClick: function onCircleClick() {},
  shouldAnimate: true,
  strokeWidth: 2,
  translation: 'translate(0,0)',
  useCircleOverlay: false
});

module.exports = (0, _Theme.withTheme)(CirclesGroup);