'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var Radium = require('radium');
var moment = require('moment');

var Calendar = require('./Calendar');
var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var DatePicker = function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DatePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentDate: _this.props.selectedDate || _this.props.defaultDate || moment().unix(),
      showCalendar: false
    }, _this._handleDateSelect = function (date) {
      if (_this.props.closeOnDateSelect) {
        _this._handleScrimClick();
      }

      _this.props.onDateSelect(date);
    }, _this._handleScrimClick = function () {
      _this.setState({
        showCalendar: false
      });
    }, _this._toggleCalendar = function () {
      _this.setState({
        showCalendar: !_this.state.showCalendar
      });
    }, _this.styles = function () {
      return {
        component: _extends({
          backgroundColor: StyleConstants.Colors.WHITE,
          borderColor: _this.state.showCalendar ? _this.props.primaryColor : StyleConstants.Colors.FOG,
          borderRadius: 3,
          borderStyle: 'solid',
          borderWidth: 1,
          boxSizing: 'border-box',
          color: StyleConstants.Colors.BLACK,
          display: 'inline-block',
          fontFamily: StyleConstants.FontFamily,
          fontSize: StyleConstants.FontSizes.MEDIUM,
          position: 'relative',
          width: '100%'
        }, _this.props.style),
        calendar: {
          boxShadow: StyleConstants.ShadowHigh
        },
        calendarWrapper: {
          boxSizing: 'border-box',
          display: _this.state.showCalendar ? 'block' : 'none',
          position: 'absolute',
          right: 0,
          width: 287,
          zIndex: 10
        },

        // Selected Date styles
        selectedDateWrapper: {
          alignItems: 'center',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 15px',
          position: 'relative'
        },
        selectedDateIcon: {
          fill: _this.props.primaryColor,
          marginRight: 5
        },
        selectedDateText: {
          color: _this.props.selectedDate || _this.props.defaultDate ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH,
          flex: 1
        },
        selectedDateCaret: {
          fill: _this.state.showCalendar ? _this.props.primaryColor : StyleConstants.Colors.ASH
        },
        scrim: {
          bottom: 0,
          left: 0,
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: 9
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DatePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.defaultDate) {
        console.warn('WARNING: defaultDate has been replaced with selectedDate and will be removed in a future release. Check usage of ' + this.constructor.displayName + '.');
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.selectedDate && newProps.selectedDate !== this.props.selectedDate) {
        this.setState({
          currentDate: newProps.selectedDate
        });
      }

      if (newProps.defaultDate && newProps.defaultDate !== this.props.defaultDate) {
        console.warn('WARNING: defaultDate has been replaced with selectedDate and will be removed in a future release. Check usage of ' + this.constructor.displayName + '.');
        this.setState({
          currentDate: newProps.defaultDate
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();

      return React.createElement(
        'div',
        { style: styles.component },
        React.createElement(
          'div',
          { onClick: this._toggleCalendar, style: styles.selectedDateWrapper },
          React.createElement(Icon, {
            size: 20,
            style: styles.selectedDateIcon,
            type: 'calendar'
          }),
          React.createElement(
            'div',
            { style: styles.selectedDateText },
            this.props.selectedDate || this.props.defaultDate ? moment.unix(this.props.selectedDate || this.props.defaultDate).format(this.props.format) : this.props.placeholderText
          ),
          React.createElement(Icon, {
            size: 20,
            style: styles.selectedDateCaret,
            type: this.state.showCalendar ? 'caret-up' : 'caret-down'
          })
        ),
        React.createElement(
          'div',
          { style: styles.calendarWrapper },
          React.createElement(Calendar, {
            onDateSelect: this._handleDateSelect,
            selectedDate: this.state.currentDate,
            style: styles.calendar
          })
        ),
        this.state.showCalendar ? React.createElement('div', { onClick: this._handleScrimClick, style: styles.scrim }) : null
      );
    }
  }]);

  return DatePicker;
}(React.Component);

DatePicker.propTypes = {
  closeOnDateSelect: PropTypes.bool,
  defaultDate: PropTypes.number,
  format: PropTypes.string,
  locale: PropTypes.string,
  minimumDate: PropTypes.number,
  onDateSelect: PropTypes.func,
  placeholderText: PropTypes.string,
  primaryColor: PropTypes.string,
  selectedDate: PropTypes.number,
  style: PropTypes.object
};
DatePicker.defaultProps = {
  closeOnDateSelect: false,
  format: 'MMM D, YYYY',
  locale: 'en',
  onDateSelect: function onDateSelect() {},

  placeholderText: 'Select A Date',
  primaryColor: StyleConstants.Colors.PRIMARY
};


module.exports = Radium(DatePicker);