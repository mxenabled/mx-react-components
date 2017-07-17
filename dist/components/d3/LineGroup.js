'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var d3 = require('d3');

var StyleConstants = require('../../constants/Style');

var LineGroup = function (_React$Component) {
  _inherits(LineGroup, _React$Component);

  function LineGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LineGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LineGroup.__proto__ || Object.getPrototypeOf(LineGroup)).call.apply(_ref, [this].concat(args))), _this), _this._animateLine = function () {
      if (_this.props.shouldAnimate) {
        d3.select(_this.chartLine).transition().attr('d', _this.state.line(_this.props.data));
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LineGroup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var flatLine = d3.svg.line().x(function (d) {
        return _this2.props.xScaleValueFunction(d.x);
      }).y(function () {
        return _this2.props.adjustedHeight;
      });

      var line = d3.svg.line().x(function (d) {
        return _this2.props.xScaleValueFunction(d.x);
      }).y(function (d) {
        return _this2.props.yScaleValueFunction(d.y);
      });

      this.setState({
        flatLine: flatLine,
        line: line
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._animateLine();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._animateLine();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          data = _props.data,
          dashLine = _props.dashLine,
          lineColor = _props.lineColor,
          shouldAnimate = _props.shouldAnimate,
          strokeWidth = _props.strokeWidth,
          translation = _props.translation;


      return React.createElement(
        'g',
        { className: 'chart-line-group', transform: translation },
        React.createElement('path', {
          d: shouldAnimate ? this.state.flatLine(data) : this.state.line(data),
          fill: 'none',
          ref: function ref(_ref2) {
            return _this3.chartLine = _ref2;
          },
          stroke: lineColor,
          strokeDasharray: dashLine ? '4,4' : 'none',
          strokeWidth: strokeWidth
        })
      );
    }
  }]);

  return LineGroup;
}(React.Component);

LineGroup.propTypes = {
  adjustedHeight: PropTypes.number.isRequired,
  dashLine: PropTypes.bool,
  data: PropTypes.array.isRequired,
  lineColor: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  strokeWidth: PropTypes.number,
  translation: PropTypes.string,
  xScaleValueFunction: PropTypes.func.isRequired,
  yScaleValueFunction: PropTypes.func.isRequired
};
LineGroup.defaultProps = {
  dashLine: false,
  lineColor: StyleConstants.Colors.CHARCOAL,
  shouldAnimate: true,
  strokeWidth: 2,
  translation: 'translate(0,0)'
};


module.exports = LineGroup;