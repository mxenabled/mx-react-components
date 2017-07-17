'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var ButtonGroup = require('./ButtonGroup');

var StyleConstants = require('../constants/Style');

var _require = require('../constants/App'),
    buttonTypes = _require.buttonTypes;

var PaginationButtons = function (_React$Component) {
  _inherits(PaginationButtons, _React$Component);

  function PaginationButtons() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PaginationButtons);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PaginationButtons.__proto__ || Object.getPrototypeOf(PaginationButtons)).call.apply(_ref, [this].concat(args))), _this), _this._handleButtonClick = function (buttonClicked) {
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
    }, _this._getPrevButton = function () {
      var type = _this.props.currentPage <= 1 ? 'disabled' : null;
      var style = _this.styles().component;

      return {
        icon: 'caret-left',
        onClick: _this._handleButtonClick.bind(null, 'prev'),
        style: style,
        type: type
      };
    }, _this._getNextButton = function () {
      var type = _this.props.currentPage >= _this.props.totalPages ? 'disabled' : null;
      var style = _this.styles().component;

      return {
        icon: 'caret-right',
        onClick: _this._handleButtonClick.bind(null, 'next'),
        style: style,
        type: type
      };
    }, _this._getStartingPage = function (currentPage, maxStartingPage, staticSet, startingSet, middleSet) {
      var startingPage = 1;

      if (!staticSet && !startingSet) {
        if (middleSet) {
          startingPage = currentPage;
        } else {
          startingPage = maxStartingPage;
        }
      }

      return startingPage;
    }, _this._getEndingPage = function (totalPages, pageRange, startingSet, staticSet, middleSet, startingPage) {
      var endingPage = totalPages;

      if (!staticSet) {
        if (startingSet) {
          endingPage = pageRange - 2;
        } else if (middleSet) {
          endingPage = startingPage + pageRange - 5;
        }
      }

      return endingPage;
    }, _this._addFirstPageButtons = function () {
      var style = _this.styles().component;

      return [{
        onClick: _this._handleButtonClick.bind(null, 1),
        style: style,
        text: '1'
      }, {
        icon: 'kabob_horizontal',
        style: style,
        type: 'disabled'
      }];
    }, _this._addLastPageButtons = function (totalPages) {
      var style = _this.styles().component;

      return [{
        icon: 'kabob_horizontal',
        style: style,
        type: 'disabled'
      }, {
        onClick: _this._handleButtonClick.bind(null, totalPages),
        style: style,
        text: totalPages.toString()
      }];
    }, _this._getPageButtons = function () {
      var style = _this.styles();
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
        var activeStyle = i === currentPage && style.active;
        var buttonStyle = _extends({}, style.component, activeStyle);

        pages.push({
          onClick: _this._handleButtonClick.bind(null, i),
          text: i.toString(),
          style: buttonStyle
        });
      }

      if (!staticSet) {
        if (!startingSet) {
          pages.unshift.apply(pages, _toConsumableArray(_this._addFirstPageButtons()));
        }

        if (!endingSet) {
          pages.push.apply(pages, _toConsumableArray(_this._addLastPageButtons(totalPages)));
        }
      }

      return pages;
    }, _this.styles = function () {
      return {
        component: _extends({
          padding: '4px 8px',
          width: 35
        }, _this.props.style),
        active: {
          backgroundColor: StyleConstants.adjustHexOpacity(_this.props.primaryColor, 0.15)
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PaginationButtons, [{
    key: 'render',
    value: function render() {
      return React.createElement(ButtonGroup, {
        buttons: [this._getPrevButton()].concat(_toConsumableArray(this._getPageButtons()), [this._getNextButton()]),
        type: this.props.type
      });
    }
  }]);

  return PaginationButtons;
}(React.Component);

PaginationButtons.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  pageRange: PropTypes.number,
  primaryColor: PropTypes.string,
  style: PropTypes.object,
  totalPages: PropTypes.number.isRequired,
  type: PropTypes.oneOf(buttonTypes)
};
PaginationButtons.defaultProps = {
  currentPage: 1,
  pageRange: 9,
  primaryColor: StyleConstants.Colors.PRIMARY,
  totalPages: 1,
  type: 'primaryOutline'
};


module.exports = PaginationButtons;