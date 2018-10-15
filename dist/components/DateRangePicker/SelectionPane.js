"use strict";

var _Theme = require("../Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');

var moment = require('moment');

var PropTypes = require('prop-types');

var DefaultRanges = require('../DateRangePicker/DefaultRanges');

var _require = require('../../constants/DateRangePicker'),
    SelectedBox = _require.SelectedBox;

var _require2 = require('../../constants/App'),
    themeShape = _require2.themeShape;

var StyleUtils = require('../../utils/Style');

var SelectionPane =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SelectionPane, _React$Component);

  function SelectionPane() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SelectionPane);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SelectionPane)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDateBoxClick", function (date, selectedBox) {
      _this.props.onDateBoxClick(date, selectedBox);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      var isLargeOrMediumWindowSize = ['large', 'medium'].indexOf(StyleUtils.getWindowSize(theme.BreakPoints)) !== -1;
      return {
        container: {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRight: isLargeOrMediumWindowSize ? '1px solid ' + theme.Colors.GRAY_300 : 'none',
          padding: theme.Spacing.MEDIUM,
          boxSizing: 'border-box',
          width: 275
        },
        calendarHeaderNav: {
          width: 35,
          cursor: 'pointer'
        },
        boxLabel: {
          fontFamily: theme.FontFamily,
          fontSize: theme.FontSizes.MEDIUM,
          color: theme.Colors.GRAY_700,
          display: 'inline-block',
          marginTop: theme.Spacing.SMALL
        },
        dateSelectBox: {
          backgroundColor: 'transparent',
          borderColor: theme.Colors.GRAY_300,
          borderRadius: 3,
          borderStyle: 'solid',
          borderWidth: 1,
          boxSizing: 'border-box',
          color: theme.Colors.GRAY_700,
          cursor: 'pointer',
          display: 'block',
          fontFamily: theme.FontFamily,
          fontSize: theme.FontSizes.MEDIUM,
          marginBottom: theme.Spacing.SMALL,
          marginTop: theme.Spacing.XSMALL,
          padding: '10px 15px',
          textAlign: 'left',
          width: '100%'
        },
        selectedDateSelectBox: {
          borderColor: theme.Colors.PRIMARY,
          cursor: 'pointer',
          color: theme.Colors.PRIMARY
        },
        //Default Ranges
        defaultRangesTitle: {
          color: theme.Colors.PRIMARY,
          fontFamily: theme.Fonts.SEMIBOLD,
          fontSize: theme.FontSizes.SMALL,
          padding: "".concat(theme.Spacing.LARGE, "px 0px ").concat(theme.Spacing.SMALL, "px 0px")
        },
        rangeOptions: {
          boxSizing: 'border-box',
          color: theme.Colors.GRAY_700,
          display: 'flex',
          flexWrap: 'wrap',
          fontSize: theme.FontSizes.MEDIUM,
          width: '100%'
        },
        rangeOption: {
          alignItems: 'center',
          backgroundColor: 'transparent',
          border: 'none',
          boxSizing: 'border-box',
          color: theme.Colors.GRAY_700,
          cursor: 'pointer',
          display: 'flex',
          padding: "".concat(theme.Spacing.SMALL, "px ").concat(theme.Spacing.SMALL, "px"),
          width: '50%',
          fontSize: theme.FontSizes.SMALL,
          ':hover': {
            backgroundColor: theme.Colors.GRAY_100
          },
          ':focus': {
            backgroundColor: theme.Colors.GRAY_100,
            outline: 'none'
          }
        },
        rangeOptionIcon: {
          paddingRight: theme.Spacing.SMALL
        }
      };
    });

    return _this;
  }

  _createClass(SelectionPane, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      var _this$props = this.props,
          selectedStartDate = _this$props.selectedStartDate,
          selectedEndDate = _this$props.selectedEndDate;
      return React.createElement("div", {
        className: "mx-selection-pane",
        style: styles.container
      }, React.createElement("div", null, React.createElement("label", {
        style: styles.boxLabel
      }, "From"), React.createElement("button", {
        "aria-label": "Select Start Date, ".concat(selectedStartDate ? 'Current start date is ' + moment.unix(selectedStartDate).format('MMM D, YYYY') : ''),
        className: "mx-selection-pane-from-field",
        onClick: function onClick() {
          return _this2._handleDateBoxClick(selectedStartDate, SelectedBox.FROM);
        },
        ref: this.props.getFromButtonRef,
        style: _extends({}, styles.dateSelectBox, this.props.selectedBox === SelectedBox.FROM ? styles.selectedDateSelectBox : null)
      }, selectedStartDate ? moment.unix(selectedStartDate).format('MMM D, YYYY') : 'Select Start Date'), React.createElement("label", {
        style: styles.boxLabel
      }, "To"), React.createElement("button", {
        "aria-label": "Select End Date, ".concat(selectedEndDate ? 'Current end date is ' + moment.unix(selectedEndDate).format('MMM D, YYYY') : ''),
        className: "mx-selection-pane-to-field",
        onClick: function onClick() {
          return _this2._handleDateBoxClick(selectedEndDate, SelectedBox.TO);
        },
        ref: this.props.getToButtonRef,
        style: _extends({}, styles.dateSelectBox, this.props.selectedBox === SelectedBox.TO ? styles.selectedDateSelectBox : null)
      }, selectedEndDate ? moment.unix(selectedEndDate).format('MMM D, YYYY') : 'Select End Date')), React.createElement("div", null, React.createElement("div", {
        style: _extends({}, styles.defaultRangesTitle, {
          color: theme.Colors.PRIMARY
        })
      }, "Select a Range"), React.createElement(DefaultRanges, _extends({}, this.props, {
        styles: styles,
        theme: theme
      }))));
    }
  }]);

  return SelectionPane;
}(React.Component);

_defineProperty(SelectionPane, "propTypes", {
  currentDate: PropTypes.string,
  defaultRanges: PropTypes.array,
  getFromButtonRef: PropTypes.func,
  getToButtonRef: PropTypes.func,
  onDateBoxClick: PropTypes.func,
  selectedBox: PropTypes.string,
  selectedEndDate: PropTypes.number,
  selectedStartDate: PropTypes.number,
  setCurrentDate: PropTypes.func,
  theme: themeShape
});

module.exports = (0, _Theme.withTheme)(SelectionPane);