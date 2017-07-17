'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');
var _merge = require('lodash/merge');

var StyleConstants = require('../constants/Style');

var ProgressBar = function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ProgressBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call.apply(_ref, [this].concat(args))), _this), _this.styles = function () {
      return _merge({}, {
        component: {
          backgroundColor: _this.props.baseColor,
          borderRadius: _this.props.height / 4,
          height: _this.props.height
        },
        progress: {
          backgroundColor: _this.props.progressColor,
          borderRadius: _this.props.height / 4,
          height: _this.props.height,
          width: _this.props.percentage > 100 ? '100%' : _this.props.percentage + '%'
        }
      }, _this.props.styles);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ProgressBar, [{
    key: 'render',
    value: function render() {
      var styles = this.styles();

      return React.createElement(
        'div',
        { style: styles.component },
        React.createElement(
          'div',
          { style: styles.progress },
          this.props.children
        )
      );
    }
  }]);

  return ProgressBar;
}(React.Component);

ProgressBar.propTypes = {
  baseColor: PropTypes.string,
  height: PropTypes.number,
  percentage: PropTypes.number,
  progressColor: PropTypes.string,
  styles: PropTypes.object
};
ProgressBar.defaultProps = {
  baseColor: StyleConstants.Colors.FOG,
  height: 10,
  progressColor: StyleConstants.Colors.PRIMARY
};


module.exports = ProgressBar;