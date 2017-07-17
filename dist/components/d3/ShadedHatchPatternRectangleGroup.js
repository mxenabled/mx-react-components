'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var StyleConstants = require('../../constants/Style');

var ShadedHatchPatternRectangleGroup = function (_React$Component) {
  _inherits(ShadedHatchPatternRectangleGroup, _React$Component);

  function ShadedHatchPatternRectangleGroup() {
    _classCallCheck(this, ShadedHatchPatternRectangleGroup);

    return _possibleConstructorReturn(this, (ShadedHatchPatternRectangleGroup.__proto__ || Object.getPrototypeOf(ShadedHatchPatternRectangleGroup)).apply(this, arguments));
  }

  _createClass(ShadedHatchPatternRectangleGroup, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'g',
        { className: 'shaded-hatch-pattern' },
        React.createElement(
          'pattern',
          {
            height: 4,
            id: 'diagonalHatch',
            patternUnits: 'userSpaceOnUse',
            width: 4
          },
          React.createElement('path', {
            d: 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2',
            stroke: this.props.fillColor,
            strokeWidth: 1
          })
        ),
        React.createElement('rect', {
          fill: 'url(#diagonalHatch)',
          height: this.props.height,
          transform: this.props.translation,
          width: this.props.width,
          x: this.props.x,
          y: this.props.y
        })
      );
    }
  }]);

  return ShadedHatchPatternRectangleGroup;
}(React.Component);

ShadedHatchPatternRectangleGroup.propTypes = {
  fillColor: PropTypes.string,
  height: PropTypes.number.isRequired,
  translation: PropTypes.string,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};
ShadedHatchPatternRectangleGroup.defaultProps = {
  fillColor: StyleConstants.Colors.FOG,
  translation: 'translate(0,0)'
};


module.exports = ShadedHatchPatternRectangleGroup;