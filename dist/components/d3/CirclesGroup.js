'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var StyleConstants = require('../../constants/Style');

var CirclesGroup = function (_React$Component) {
  _inherits(CirclesGroup, _React$Component);

  function CirclesGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CirclesGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CirclesGroup.__proto__ || Object.getPrototypeOf(CirclesGroup)).call.apply(_ref, [this].concat(args))), _this), _this._animateCircles = function () {
      if (_this.props.shouldAnimate) {
        d3.select(_this.circleGroup).selectAll('.circle').data(_this.props.data).transition().attr('cy', function (d) {
          return _this.props.yScaleValueFunction(d.y);
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CirclesGroup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._animateCircles();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._animateCircles();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          adjustedHeight = _props.adjustedHeight,
          circleOverlayRadius = _props.circleOverlayRadius,
          circleRadius = _props.circleRadius,
          data = _props.data,
          shouldAnimate = _props.shouldAnimate,
          translation = _props.translation,
          useCircleOverlay = _props.useCircleOverlay,
          xScaleValueFunction = _props.xScaleValueFunction,
          yScaleValueFunction = _props.yScaleValueFunction;

      var preventCircleOverlapCutOff = 45;

      return React.createElement(
        'g',
        {
          className: 'circle-group',
          ref: function ref(_ref2) {
            return _this2.circleGroup = _ref2;
          },
          transform: translation
        },
        data.length <= preventCircleOverlapCutOff ? data.map(function (item, index) {
          var cx = xScaleValueFunction(item.x);
          var cy = shouldAnimate ? adjustedHeight : yScaleValueFunction(item.y);

          return React.createElement(
            'g',
            { key: index },
            React.createElement('circle', {
              className: 'circle',
              cx: cx,
              cy: cy,
              fill: StyleConstants.Colors.WHITE,
              onClick: function onClick() {
                if (!useCircleOverlay) {
                  _this2.props.onCircleClick(item);
                }
              },
              r: circleRadius,
              stroke: _this2.props.circleColor,
              style: { 'strokeWidth': _this2.props.strokeWidth }
            }),
            useCircleOverlay && React.createElement('circle', {
              className: 'circle-overlay',
              cx: cx,
              cy: yScaleValueFunction(item.y),
              fill: StyleConstants.Colors.WHITE,
              onClick: function onClick() {
                _this2.props.onCircleClick(item);
              },
              r: circleOverlayRadius,
              style: { 'fillOpacity': 0 }
            })
          );
        }) : null
      );
    }
  }]);

  return CirclesGroup;
}(React.Component);

CirclesGroup.propTypes = {
  adjustedHeight: PropTypes.number.isRequired,
  circleColor: PropTypes.string,
  circleOverlayRadius: PropTypes.number,
  circleRadius: PropTypes.number,
  data: PropTypes.array.isRequired,
  onCircleClick: PropTypes.func,
  shouldAnimate: PropTypes.bool,
  strokeWidth: PropTypes.number,
  translation: PropTypes.string,
  useCircleOverlay: PropTypes.bool,
  xScaleValueFunction: PropTypes.func.isRequired,
  yScaleValueFunction: PropTypes.func.isRequired
};
CirclesGroup.defaultProps = {
  circleColor: StyleConstants.Colors.CHARCOAL,
  circleOverlayRadius: 6,
  circleRadius: 3,
  onCircleClick: function onCircleClick() {},
  shouldAnimate: true,
  strokeWidth: 2,
  translation: 'translate(0,0)',
  useCircleOverlay: false
};


module.exports = CirclesGroup;