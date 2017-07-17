'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var moment = require('moment');
var PropTypes = require('prop-types');

var Icon = require('../Icon');

var YearSelector = function (_React$Component) {
  _inherits(YearSelector, _React$Component);

  function YearSelector() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, YearSelector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YearSelector.__proto__ || Object.getPrototypeOf(YearSelector)).call.apply(_ref, [this].concat(args))), _this), _this._handlePreviousClick = function () {
      var currentDate = moment.unix(_this.props.currentDate).startOf('month').subtract(1, 'y').unix();

      _this.props.setCurrentDate(currentDate);
    }, _this._handleNextClick = function () {
      var currentDate = moment.unix(_this.props.currentDate).endOf('month').add(1, 'y').unix();

      _this.props.setCurrentDate(currentDate);
    }, _this.styles = function () {
      return {
        container: {
          display: 'flex'
        },
        calendarHeaderNav: {
          width: 35,
          cursor: 'pointer'
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(YearSelector, [{
    key: 'render',
    value: function render() {
      var styles = this.styles();

      return React.createElement(
        'div',
        { style: styles.container },
        React.createElement(Icon, {
          elementProps: {
            onClick: this._handlePreviousClick
          },
          size: 20,
          style: styles.calendarHeaderNav,
          type: 'caret-left'
        }),
        React.createElement(
          'div',
          null,
          moment(this.props.currentDate, 'X').format('YYYY')
        ),
        React.createElement(Icon, {
          elementProps: {
            onClick: this._handleNextClick
          },
          size: 20,
          style: styles.calendarHeaderNav,
          type: 'caret-right'
        })
      );
    }
  }]);

  return YearSelector;
}(React.Component);

YearSelector.propTypes = {
  currentDate: PropTypes.number,
  setCurrentDate: PropTypes.func
};


module.exports = YearSelector;