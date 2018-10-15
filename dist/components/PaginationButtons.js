"use strict";

var _Theme = require("./Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var PropTypes = require('prop-types');

var React = require('react');

var ButtonGroup = require('./ButtonGroup');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var _require2 = require('../constants/App'),
    buttonTypes = _require2.buttonTypes;

var PaginationButtons =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PaginationButtons, _React$Component);

  function PaginationButtons() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PaginationButtons);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PaginationButtons)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleButtonClick", function (buttonClicked) {
      var _this$props = _this.props,
          currentPage = _this$props.currentPage,
          totalPages = _this$props.totalPages;
      var goToPage = buttonClicked;

      if (buttonClicked === 'prev') {
        goToPage = currentPage > 1 ? currentPage - 1 : 1;
      } else if (buttonClicked === 'next') {
        goToPage = currentPage < totalPages ? currentPage + 1 : totalPages;
      }

      _this.props.onClick(goToPage);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getPrevButton", function (styles) {
      var type = _this.props.currentPage <= 1 ? 'disabled' : null;
      var style = styles.component;
      return {
        className: 'mx-pagination-previous',
        icon: 'caret-left',
        onClick: _this._handleButtonClick.bind(null, 'prev'),
        style: style,
        type: type
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getNextButton", function (styles) {
      var type = _this.props.currentPage >= _this.props.totalPages ? 'disabled' : null;
      var style = styles.component;
      return {
        className: 'mx-pagination-next',
        icon: 'caret-right',
        onClick: _this._handleButtonClick.bind(null, 'next'),
        style: style,
        type: type
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getStartingPage", function (currentPage, maxStartingPage, staticSet, startingSet, middleSet) {
      var startingPage = 1;

      if (!staticSet && !startingSet) {
        if (middleSet) {
          startingPage = currentPage;
        } else {
          startingPage = maxStartingPage;
        }
      }

      return startingPage;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getEndingPage", function (totalPages, pageRange, startingSet, staticSet, middleSet, startingPage) {
      var endingPage = totalPages;

      if (!staticSet) {
        if (startingSet) {
          endingPage = pageRange - 2;
        } else if (middleSet) {
          endingPage = startingPage + pageRange - 5;
        }
      }

      return endingPage;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_addFirstPageButtons", function (styles) {
      var style = styles.component;
      return [{
        onClick: _this._handleButtonClick.bind(null, 1),
        style: style,
        text: '1'
      }, {
        icon: 'kabob_horizontal',
        style: style,
        type: 'disabled'
      }];
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_addLastPageButtons", function (styles, totalPages) {
      var style = styles.component;
      return [{
        icon: 'kabob_horizontal',
        style: style,
        type: 'disabled'
      }, {
        onClick: _this._handleButtonClick.bind(null, totalPages),
        style: style,
        text: totalPages.toString()
      }];
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getPageButtons", function (styles) {
      var _this$props2 = _this.props,
          currentPage = _this$props2.currentPage,
          pageRange = _this$props2.pageRange,
          totalPages = _this$props2.totalPages;
      var pages = [];
      var maxStartingPage = totalPages - pageRange + 3;
      var staticSet = totalPages <= pageRange;
      var startingSet = !staticSet && currentPage <= pageRange - 2;
      var endingSet = !staticSet && !startingSet && currentPage + pageRange - 3 >= totalPages;
      var middleSet = !staticSet && !startingSet && !endingSet;

      var startingPage = _this._getStartingPage(currentPage, maxStartingPage, staticSet, startingSet, middleSet);

      var endingPage = _this._getEndingPage(totalPages, pageRange, startingSet, staticSet, middleSet, startingPage);

      for (var i = startingPage; i <= endingPage; i++) {
        var activeStyle = i === currentPage && styles.active;

        var buttonStyle = _extends({}, styles.component, activeStyle);

        pages.push({
          onClick: _this._handleButtonClick.bind(null, i),
          text: i.toString(),
          style: buttonStyle
        });
      }

      if (!staticSet) {
        if (!startingSet) {
          pages.unshift.apply(pages, _toConsumableArray(_this._addFirstPageButtons(styles)));
        }

        if (!endingSet) {
          pages.push.apply(pages, _toConsumableArray(_this._addLastPageButtons(styles, totalPages)));
        }
      }

      return pages;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return {
        component: _extends({
          padding: '4px 8px',
          width: 35
        }, _this.props.style),
        active: {
          backgroundColor: StyleUtils.adjustHexOpacity(theme.Colors.PRIMARY, 0.15)
        }
      };
    });

    return _this;
  }

  _createClass(PaginationButtons, [{
    key: "render",
    value: function render() {
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      return React.createElement(ButtonGroup, {
        buttons: [this._getPrevButton(styles)].concat(_toConsumableArray(this._getPageButtons(styles)), [this._getNextButton(styles)]),
        theme: theme,
        type: this.props.type
      });
    }
  }]);

  return PaginationButtons;
}(React.Component);

_defineProperty(PaginationButtons, "propTypes", {
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  pageRange: PropTypes.number,
  style: PropTypes.object,
  theme: themeShape,
  totalPages: PropTypes.number.isRequired,
  type: PropTypes.oneOf(buttonTypes)
});

_defineProperty(PaginationButtons, "defaultProps", {
  currentPage: 1,
  pageRange: 9,
  totalPages: 1,
  type: 'primaryOutline'
});

module.exports = (0, _Theme.withTheme)(PaginationButtons);