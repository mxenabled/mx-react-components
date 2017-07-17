'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var StyleConstants = require('../../constants/Style');

var ShadedAreaRectangleGroup = function (_React$Component) {
  _inherits(ShadedAreaRectangleGroup, _React$Component);

  function ShadedAreaRectangleGroup() {
    _classCallCheck(this, ShadedAreaRectangleGroup);

    return _possibleConstructorReturn(this, (ShadedAreaRectangleGroup.__proto__ || Object.getPrototypeOf(ShadedAreaRectangleGroup)).apply(this, arguments));
  }

  _createClass(ShadedAreaRectangleGroup, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'g',
        { className: 'shaded-area' },
        React.createElement('rect', {
          fill: this.props.fillColor,
          fillOpacity: this.props.fillOpacity,
          height: this.props.height,
          transform: this.props.translation,
          width: this.props.width,
          x: this.props.x,
          y: this.props.y
        })
      );
    }
  }]);

  return ShadedAreaRectangleGroup;
}(React.Component);

ShadedAreaRectangleGroup.propTypes = {
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  height: PropTypes.number.isRequired,
  translation: PropTypes.string,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};
ShadedAreaRectangleGroup.defaultProps = {
  fillColor: StyleConstants.Colors.FOG,
  fillOpacity: 0.1,
  translation: 'translate(0,0)'
};


module.exports = ShadedAreaRectangleGroup;