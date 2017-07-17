'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');
var ReactDOM = require('react-dom');

var Spin = function (_React$Component) {
  _inherits(Spin, _React$Component);

  function Spin() {
    _classCallCheck(this, Spin);

    return _possibleConstructorReturn(this, (Spin.__proto__ || Object.getPrototypeOf(Spin)).apply(this, arguments));
  }

  _createClass(Spin, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var el = ReactDOM.findDOMNode(this);
      var speed = this.props.speed;
      var spinDirection = this.props.direction === 'clockwise' ? -1 : 1;
      var rotation = 0;

      setInterval(function () {
        el.style.transform = 'rotate(' + rotation * spinDirection + 'deg)';

        if (rotation < 360) {
          rotation += 1;
        } else {
          rotation = 0;
        }
      }, speed / 360);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'mx-spin', style: { display: 'inline-block' } },
        this.props.children
      );
    }
  }]);

  return Spin;
}(React.Component);

Spin.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.oneOf(['counterclockwise', 'clockwise']),
  speed: PropTypes.number //milliseconds, time it takes to make 1 full rotation
};
Spin.defaultProps = {
  direction: 'clockwise',
  speed: 1000
};


module.exports = Spin;