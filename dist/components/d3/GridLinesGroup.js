'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var d3 = require('d3');

var ChartUtils = require('../../utils/Chart');

var GridLinesGroup = function (_React$Component) {
  _inherits(GridLinesGroup, _React$Component);

  function GridLinesGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GridLinesGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GridLinesGroup.__proto__ || Object.getPrototypeOf(GridLinesGroup)).call.apply(_ref, [this].concat(args))), _this), _this._renderGridLines = function () {
      var max = d3.max(_this.props.data, function (d) {
        return d[_this.props.axis];
      });
      var min = d3.min(_this.props.data, function (d) {
        return d[_this.props.axis];
      });

      var _ChartUtils$getAxisTi = ChartUtils.getAxisTickSpecification(min, max),
          tickValues = _ChartUtils$getAxisTi.tickValues;

      var gridLinesFunction = d3.svg.axis().scale(_this.props.scaleFunction()).orient(_this.props.orientation).tickSize(_this.props.tickSize, 0, 0).tickFormat('').ticks(tickValues.length).tickValues(tickValues);

      d3.select(_this.gridLines).call(gridLinesFunction);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GridLinesGroup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._renderGridLines();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._renderGridLines();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement('g', {
        className: this.props.axis + '-grid-line',
        ref: function ref(_ref2) {
          return _this2.gridLines = _ref2;
        },
        transform: this.props.translation
      });
    }
  }]);

  return GridLinesGroup;
}(React.Component);

GridLinesGroup.propTypes = {
  axis: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  orientation: PropTypes.string,
  scaleFunction: PropTypes.func.isRequired,
  tickSize: PropTypes.number.isRequired,
  translation: PropTypes.string
};
GridLinesGroup.defaultProps = {
  orientation: 'left',
  translation: 'translate(0,0)'
};


module.exports = GridLinesGroup;