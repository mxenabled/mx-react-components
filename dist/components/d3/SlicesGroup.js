'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var SlicesGroup = function (_React$Component) {
  _inherits(SlicesGroup, _React$Component);

  function SlicesGroup() {
    _classCallCheck(this, SlicesGroup);

    return _possibleConstructorReturn(this, (SlicesGroup.__proto__ || Object.getPrototypeOf(SlicesGroup)).apply(this, arguments));
  }

  _createClass(SlicesGroup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'g',
        { className: 'slices' },
        this.props.data.map(function (dataPoint, index) {
          return React.createElement('rect', {
            height: _this2.props.adjustedHeight,
            key: 'slice-' + index,
            onMouseOver: _this2.props.handleChartMouseOver.bind(null, dataPoint),
            opacity: 0,
            transform: _this2.props.translation,
            width: _this2.props.sliceWidth,
            x: _this2.props.xScaleValueFunction(dataPoint.x) - _this2.props.sliceWidth / 2,
            y: 0
          });
        })
      );
    }
  }]);

  return SlicesGroup;
}(React.Component);

SlicesGroup.propTypes = {
  adjustedHeight: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  handleChartMouseOver: PropTypes.func.isRequired,
  sliceWidth: PropTypes.number.isRequired,
  translation: PropTypes.string.isRequired,
  xScaleValueFunction: PropTypes.func.isRequired
};


module.exports = SlicesGroup;