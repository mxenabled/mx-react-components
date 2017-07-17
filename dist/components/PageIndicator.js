'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var StyleConstants = require('../constants/Style');

var PageIndicator = function (_React$Component) {
  _inherits(PageIndicator, _React$Component);

  function PageIndicator() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PageIndicator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PageIndicator.__proto__ || Object.getPrototypeOf(PageIndicator)).call.apply(_ref, [this].concat(args))), _this), _this._handleDotClick = function () {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (_this.props.onClick) {
        _this.props.onClick(index);
      }
    }, _this._renderDots = function () {
      var styles = _this.styles();
      var dots = [];

      for (var i = 0; i < _this.props.count; i++) {
        var dotStyles = _this.props.activeIndex === i ? _extends({}, styles.dot, styles.dotActive) : styles.dot;

        dots.push(React.createElement('span', { key: 'dot' + i, onClick: _this._handleDotClick.bind(null, i), style: dotStyles }));
      }

      return dots;
    }, _this.styles = function () {
      return {
        component: {
          textAlign: 'center',
          padding: '15px 0'
        },
        dot: {
          width: 6,
          height: 6,
          margin: 10,
          borderRadius: '100%',
          display: 'inline-block',
          verticalAlign: 'middle',
          backgroundColor: StyleConstants.Colors.FOG,
          cursor: 'pointer'
        },
        dotActive: {
          backgroundColor: StyleConstants.Colors.CHARCOAL
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PageIndicator, [{
    key: 'render',
    value: function render() {
      var styles = this.styles();

      return React.createElement(
        'div',
        { style: styles.component },
        this._renderDots()
      );
    }
  }]);

  return PageIndicator;
}(React.Component);

PageIndicator.propTypes = {
  activeIndex: PropTypes.number,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func
};


module.exports = PageIndicator;