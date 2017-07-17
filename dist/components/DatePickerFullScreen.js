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

var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var DatePickerFullScreen = function (_React$Component) {
  _inherits(DatePickerFullScreen, _React$Component);

  function DatePickerFullScreen(props) {
    _classCallCheck(this, DatePickerFullScreen);

    var _this = _possibleConstructorReturn(this, (DatePickerFullScreen.__proto__ || Object.getPrototypeOf(DatePickerFullScreen)).call(this, props));

    _this._getInputValueByDate = function (date) {
      var inputValue = null;

      if (date) {
        var newDate = moment.unix(date);

        if (newDate.isValid()) {
          inputValue = newDate.format(_this.props.format);
        } else {
          inputValue = date;
        }
      }

      return inputValue;
    };

    _this._getSelectedDate = function () {
      var selectedDate = _this.state.selectedDate;

      return selectedDate && moment.unix(selectedDate).isValid() ? _this.state.selectedDate : moment().unix();
    };

    _this._handleCloseClick = function () {
      _this.setState({
        showCalendar: false
      });
    };

    _this._handleDateSelect = function (date) {
      if (_this.props.closeOnDateSelect) {
        _this._handleScrimClick();
      }

      _this.setState({
        inputValue: moment.unix(date).format(_this.props.format),
        isValid: true,
        selectedDate: date
      });

      _this.props.onDateSelect(date);
    };

    _this._handleInputBlur = function (evt) {
      if (evt.target.value.length === 0) {
        _this.props.onDateSelect(null);

        _this.setState({
          inputValue: null,
          selectedDate: null
        });
      } else {
        _this.setState({
          inputValue: moment.unix(_this.state.selectedDate).format(_this.props.format)
        });
      }
    };

    _this._handleInputChange = function (evt) {
      _this.setState({
        inputValue: evt.target.value
      });
    };

    _this._handlePreviousClick = function () {
      var selectedDate = moment.unix(_this._getSelectedDate()).locale(_this.props.locale);
      var currentDate = _this.state.currentDate ? _this.state.currentDate.locale(_this.props.locale) : selectedDate;

      currentDate = moment(currentDate.startOf('month').subtract(1, 'm'), _this.props.format);

      _this.setState({
        currentDate: currentDate
      });
    };

    _this._handleNextClick = function () {
      var selectedDate = moment.unix(_this._getSelectedDate()).locale(_this.props.locale);
      var currentDate = _this.state.currentDate ? _this.state.currentDate.locale(_this.props.locale) : selectedDate;

      currentDate = moment(currentDate.endOf('month').add(1, 'd'), _this.props.format);

      _this.setState({
        currentDate: currentDate
      });
    };

    _this._handleScrimClick = function () {
      _this.setState({
        showCalendar: false
      });
    };

    _this._toggleCalendar = function () {
      _this.setState({
        showCalendar: !_this.state.showCalendar
      });
    };

    _this._renderMonthTable = function (currentDate, selectedDate) {
      var days = [];
      var startDate = moment(currentDate, _this.props.format).startOf('month').startOf('week');
      var endDate = moment(currentDate, _this.props.format).endOf('month').endOf('week');
      var minimumDate = _this.props.minimumDate ? moment.unix(_this.props.minimumDate) : null;

      while (startDate.isBefore(endDate)) {
        var isCurrentMonth = startDate.month() === currentDate.month();
        var isCurrentDay = startDate.format(_this.props.format) === selectedDate.format(_this.props.format);
        var noSelectDay = startDate.isBefore(minimumDate);
        var day = React.createElement(
          'div',
          {
            key: startDate.month() + '-' + startDate.date(),
            onClick: !noSelectDay ? _this._handleDateSelect.bind(null, startDate.unix()) : null,
            style: [styles.calendarDay, !noSelectDay && isCurrentMonth && styles.currentMonth]
          },
          React.createElement(
            'div',
            {
              key: startDate.format('DDDD'),
              style: [styles.calendarDayContent, noSelectDay ? styles.calendarDayDisabled : isCurrentDay && styles.currentDay]
            },
            React.createElement(
              'div',
              { style: styles.calendarDayText },
              startDate.date()
            )
          )
        );

        if (_this.props.showDayBorders) {
          day.props.style.push([styles.borderRight, styles.borderBottom]);
        }

        days.push(day);
        startDate.add(1, 'd');
      }

      return days;
    };

    _this._renderSelectedDate = function () {
      if (_this.props.useInputForSelectedDate) {
        var hidePlaceholder = _this.state.inputValue && _this.state.inputValue.length;

        return React.createElement(
          'div',
          null,
          React.createElement('input', {
            key: 'input',
            onBlur: _this._handleInputBlur,
            onChange: _this._handleInputChange,
            onClick: _this._toggleCalendar,
            style: [styles.input, _this.props.inputStyle, hidePlaceholder && { backgroundColor: StyleConstants.Colors.WHITE }],
            type: 'text',
            value: _this.state.inputValue
          }),
          React.createElement(
            'div',
            { style: [styles.placeholderText, _this.props.placeholderTextStyle] },
            _this.props.placeholderText || 'Select A Date'
          )
        );
      } else {
        return React.createElement(
          'div',
          {
            key: 'selectedDate',
            onClick: _this._toggleCalendar,
            style: styles.selectedDate
          },
          _this.state.inputValue
        );
      }
    };

    _this._renderTitle = function (styles) {
      if (_this.props.title) {
        return React.createElement(
          'div',
          { key: 'title', style: styles.title },
          _this.props.title
        );
      } else {
        return null;
      }
    };

    _this.state = {
      currentDate: null,
      inputValue: _this._getInputValueByDate(props.defaultDate),
      isValid: true,
      selectedDate: props.defaultDate,
      showCalendar: false
    };
    return _this;
  }

  _createClass(DatePickerFullScreen, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      window.onkeyup = function (e) {
        if (e.keyCode === 27) {
          _this2._handleCloseClick();
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var selectedDate = moment.unix(this._getSelectedDate()).locale(this.props.locale);
      var currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;
      var leftNavIconStyle = _extends({}, styles.navIcon, styles.navLeft);
      var rightNavIconStyle = _extends({}, styles.navIcon, styles.navRight);

      if (this.props.showDayBorders) {
        leftNavIconStyle = _extends(leftNavIconStyle, styles.borderRight);
        rightNavIconStyle = _extends(rightNavIconStyle, styles.borderLeft);
      }

      return React.createElement(
        'div',
        {
          className: 'mx-date-picker-full-screen',
          style: [styles.component, styles.clearFix, this.props.style],
          tabIndex: '0'
        },
        React.createElement(
          'div',
          {
            className: 'mx-date-picker-full-screen-selected-date',
            key: 'selectedDateWrapper',
            style: [styles.selectedDateWrapper, this.props.selectedDateWrapperStyle]
          },
          this._renderSelectedDate()
        ),
        React.createElement(
          'div',
          {
            className: 'mx-date-picker-full-screen-calendar-scrim',
            key: 'calendarModal',
            style: [styles.calendarModal, this.state.showCalendar && styles.calendarShow, this.props.isFixed && { position: 'fixed' }]
          },
          React.createElement(
            'div',
            { onClick: this._handleCloseClick, style: styles.close },
            React.createElement(Icon, {
              size: 20,
              style: styles.closeIcon,
              type: this.props.closeIcon
            }),
            React.createElement(
              'div',
              { style: styles.closeText },
              'ESC'
            )
          ),
          React.createElement(
            'div',
            { className: 'mx-date-picker-full-screen-calendar-wrapper', style: styles.calendarWrapper },
            this._renderTitle(styles),
            React.createElement(
              'div',
              { className: 'mx-date-picker-full-screen-calendar-header', key: 'calendarHeader', style: [styles.calendarHeader, { borderBottomStyle: this.props.showDayBorders ? 'solid' : 'none' }, styles.clearFix] },
              React.createElement(Icon, {
                elementProps: {
                  onClick: this._handlePreviousClick
                },
                size: 32,
                style: leftNavIconStyle,
                type: 'caret-left'
              }),
              currentDate.format('MMMM YYYY'),
              React.createElement(Icon, {
                elementProps: {
                  onClick: this._handleNextClick
                },
                size: 32,
                style: rightNavIconStyle,
                type: 'caret-right'
              })
            ),
            React.createElement(
              'div',
              { style: styles.calendarContainer },
              this._renderMonthTable(currentDate, selectedDate)
            ),
            React.createElement('div', { style: styles.clearFix })
          )
        )
      );
    }
  }]);

  return DatePickerFullScreen;
}(React.Component);

DatePickerFullScreen.propTypes = {
  closeIcon: PropTypes.string,
  closeOnDateSelect: PropTypes.bool,
  defaultDate: PropTypes.number,
  format: PropTypes.string,
  inputStyle: PropTypes.object,
  isFixed: PropTypes.bool,
  locale: PropTypes.string,
  minimumDate: PropTypes.number,
  onDateSelect: PropTypes.func,
  placeholderText: PropTypes.string,
  placeholderTextStyle: PropTypes.object,
  selectedDateWrapperStyle: PropTypes.object,
  showDayBorders: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string,
  useInputForSelectedDate: PropTypes.bool
};
DatePickerFullScreen.defaultProps = {
  closeIcon: 'close',
  closeOnDateSelect: false,
  format: 'MMM D, YYYY',
  isFixed: false,
  locale: 'en',
  onDateSelect: function onDateSelect() {},

  showDayBorders: false,
  title: 'Select A Date',
  useInputForSelectedDate: true
};


var styles = {
  calendarDay: {
    color: StyleConstants.Colors.ASH,
    float: 'left',
    paddingBottom: '11%',
    position: 'relative',
    width: '13.5%'
  },
  borderBottom: {
    borderBottom: StyleConstants.Colors.FOG,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1
  },
  borderRight: {
    borderRight: StyleConstants.Colors.FOG,
    borderRightStyle: 'solid',
    borderRightWidth: 1
  },
  borderLeft: {
    borderLeft: StyleConstants.Colors.FOG,
    borderLeftStyle: 'solid',
    borderLeftWidth: 1
  },
  calendarContainer: {
    width: '100%',
    padding: '0px 2px 10px 6px'
  },
  calendarDayContent: {
    borderRadius: '50%',
    height: 32,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
    width: 32,

    ':hover': {
      backgroundColor: StyleConstants.Colors.PRIMARY,
      color: StyleConstants.Colors.WHITE,
      cursor: 'pointer'
    }
  },
  calendarDayText: {
    borderRadius: '100%',
    fontSize: StyleConstants.FontSizes.MEDIUM,
    fontWeight: 'normal',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%) translateX(-50%)'
  },
  calendarDayDisabled: {
    ':hover': {
      background: 'none',
      color: StyleConstants.Colors.PORCELAIN
    }
  },
  calendarHeader: {
    color: StyleConstants.Colors.CHARCOAL,
    borderBottom: StyleConstants.Colors.FOG,
    borderBottomWidth: 1,
    fontSize: StyleConstants.FontSizes.XLARGE,
    fontWeight: 'normal',
    padding: '5px 0px 7px 0px',
    position: 'relative',
    textAlign: 'center',
    textTransform: 'none'
  },
  calendarIcon: {
    color: StyleConstants.Colors.PORCELAIN,
    position: 'absolute',
    right: 12.8,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  calendarShow: {
    display: 'block'
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 15,
    textAlign: 'center',
    cursor: 'pointer',
    color: StyleConstants.Colors.ASH
  },
  closeIcon: {
    color: StyleConstants.Colors.ASH
  },
  closeText: {
    fontSize: StyleConstants.FontSizes.TINY
  },
  clearFix: {
    clear: 'both',
    marginBottom: 15
  },
  component: {
    backgroundColor: '#fff',
    fontFamily: StyleConstants.FontFamily,
    fontSize: StyleConstants.FontSizes.LARGE,
    width: '100%',

    ':focus': {
      boxShadow: 'none',
      outline: 'none'
    }
  },
  calendarModal: {
    backgroundColor: '#fff',
    bottom: 0,
    display: 'none',
    left: 0,
    margin: 0,
    padding: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999
  },
  calendarWrapper: {
    height: 300,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300
  },
  selectedDateWrapper: {
    position: 'relative',
    cursor: 'pointer'
  },
  currentDay: {
    backgroundColor: StyleConstants.Colors.PRIMARY,
    color: StyleConstants.Colors.WHITE
  },
  currentMonth: {
    color: StyleConstants.Colors.CHARCOAL
  },
  input: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: StyleConstants.FontSizes.MEDIUM,
    outline: 'none',
    paddingBottom: 10,
    paddingLeft: 5,
    position: 'relative',
    top: 5,
    WebkitAppearance: 'none',
    width: '80%',
    zIndex: 2,

    ':focus': {
      border: 'none',
      boxShadow: 'none',
      outline: 'none'
    }
  },
  navIcon: {
    cursor: 'pointer'
  },
  navLeft: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  navRight: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  placeholderText: {
    color: StyleConstants.Colors.CHARCOAL,
    fontSize: StyleConstants.FontSizes.MEDIUM,
    paddingLeft: 5,
    position: 'absolute',
    top: 10
  },
  selectedDate: {
    color: StyleConstants.Colors.CHARCOAL,
    cursor: 'pointer',
    fontSize: StyleConstants.FontSizes.MEDIUM,
    padding: '5px 0 5px 5px',
    verticalAlign: 'middle',
    width: '100%',

    ':hover': {
      color: StyleConstants.Colors.BLUE
    }
  },
  title: {
    boxSizing: 'border-box',
    color: StyleConstants.Colors.CHARCOAL,
    fontSize: StyleConstants.FontSizes.XXLARGE,
    fontWeight: 'bold',
    padding: '0px 0px 20px 10px'
  }
};

module.exports = Radium(DatePickerFullScreen);