'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var moment = require('moment');
var PropTypes = require('prop-types');

// const Icon = require('../Icon');
var StyleConstants = require('../../constants/Style');

var DefaultRanges = require('../DateRangePicker/DefaultRanges');

var SelectionPane = function (_React$Component) {
  _inherits(SelectionPane, _React$Component);

  function SelectionPane() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectionPane);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectionPane.__proto__ || Object.getPrototypeOf(SelectionPane)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selectedBox: 'from'
    }, _this._handleDateBoxClick = function (date, selectedBox) {
      // console.log("XXX date", date)
      // this.setState({
      //   selectedBox
      // });

      _this.props.handleFromClick(date, selectedBox);
    }, _this.styles = function () {
      var isLargeOrMediumWindowSize = _this.props.isLargeOrMediumWindowSize;


      return {
        container: {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRight: isLargeOrMediumWindowSize ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
          padding: StyleConstants.Spacing.MEDIUM
        },
        calendarHeaderNav: {
          width: 35,
          cursor: 'pointer'
        },

        boxLabel: {
          fontFamily: StyleConstants.FontFamily,
          fontSize: StyleConstants.FontSizes.MEDIUM,
          color: StyleConstants.Colors.CHARCOAL
        },
        dateSelectBox: {
          // borderColor: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.FOG,
          borderColor: StyleConstants.Colors.FOG,
          borderRadius: 3,
          borderStyle: 'solid',
          borderWidth: 1,
          boxSizing: 'border-box',
          cursor: 'pointer',
          fontFamily: StyleConstants.FontFamily,
          fontSize: StyleConstants.FontSizes.MEDIUM,
          marginBottom: StyleConstants.Spacing.SMALL,
          marginTop: StyleConstants.Spacing.XSMALL,
          padding: '10px 15px'
        },
        selectedDateSelectBox: {
          borderColor: _this.props.primaryColor,
          cursor: 'pointer',
          color: _this.props.primaryColor
        },

        //Default Ranges
        defaultRangesTitle: {
          color: StyleConstants.Colors.PRIMARY,
          fontFamily: StyleConstants.Fonts.SEMIBOLD,
          fontSize: StyleConstants.FontSizes.SMALL,
          padding: StyleConstants.Spacing.LARGE + 'px 0px ' + StyleConstants.Spacing.SMALL + 'px ' + StyleConstants.Spacing.LARGE + 'px'
        },
        rangeOptions: {
          // borderRight: isLargeOrMediumWindowSize ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
          // borderTop: isLargeOrMediumWindowSize ? 'none' : '1px solid ' + StyleConstants.Colors.FOG,
          boxSizing: 'border-box',
          color: StyleConstants.Colors.CHARCOAL,
          display: 'flex',
          // flexDirection: 'row',
          flexWrap: 'wrap',
          fontSize: StyleConstants.FontSizes.MEDIUM,
          marginLeft: isLargeOrMediumWindowSize ? -10 : 0,
          marginRight: isLargeOrMediumWindowSize ? -10 : 0,
          // maxWidth: window.innerWidth > 450 ? 250 : 'inherit',
          width: '100%'
        },
        rangeOption: {
          alignItems: 'center',
          boxSizing: 'border-box',
          cursor: 'pointer',
          display: 'flex',
          padding: StyleConstants.Spacing.SMALL + 'px ' + StyleConstants.Spacing.MEDIUM + 'px',
          width: '50%',

          ':hover': {
            backgroundColor: StyleConstants.Colors.PORCELAIN
          }
        },
        rangeOptionIcon: {
          paddingRight: StyleConstants.Spacing.SMALL
        }

      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectionPane, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles();
      var _props = this.props,
          selectedStartDate = _props.selectedStartDate,
          selectedEndDate = _props.selectedEndDate,
          isLargeOrMediumWindowSize = _props.isLargeOrMediumWindowSize;


      return React.createElement(
        'div',
        { style: styles.container },
        React.createElement(
          'div',
          { style: { borderBottom: isLargeOrMediumWindowSize ? 'none' : '1px solid ' + StyleConstants.Colors.FOG } },
          React.createElement(
            'label',
            { style: styles.boxLabel },
            'From'
          ),
          React.createElement(
            'div',
            { onClick: function onClick() {
                return _this2._handleDateBoxClick(selectedStartDate, 'from');
              }, style: _extends({}, styles.dateSelectBox, this.props.selectedBox === 'from' ? styles.selectedDateSelectBox : null) },
            selectedStartDate ? moment.unix(selectedStartDate).format('MMM D, YYYY') : 'Select Start Date'
          ),
          React.createElement(
            'label',
            { style: styles.boxLabel },
            'To'
          ),
          React.createElement(
            'div',
            { onClick: function onClick() {
                return _this2._handleDateBoxClick(selectedEndDate, 'to');
              }, style: _extends({}, styles.dateSelectBox, this.props.selectedBox === 'to' ? styles.selectedDateSelectBox : null) },
            selectedEndDate ? moment.unix(selectedEndDate).format('MMM D, YYYY') : 'Select End Date'
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { style: _extends({}, styles.defaultRangesTitle, { color: this.props.primaryColor }) },
            'Select a Range'
          ),
          React.createElement(DefaultRanges, _extends({}, this.props, { styles: styles }))
        )
      );
    }
  }]);

  return SelectionPane;
}(React.Component);

SelectionPane.propTypes = {
  currentDate: PropTypes.string,
  defaultRanges: PropTypes.array,
  handleFromClick: PropTypes.func,
  handleToClick: PropTypes.func,
  isLargeOrMediumWindowSize: PropTypes.string,
  primaryColor: PropTypes.string,
  selectedBox: PropTypes.string,
  selectedEndDate: PropTypes.number,
  selectedStartDate: PropTypes.number,
  setCurrentDate: PropTypes.func
};


module.exports = SelectionPane;