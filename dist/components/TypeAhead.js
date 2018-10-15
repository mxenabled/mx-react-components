"use strict";

var _Theme = require("./Theme");

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

var ReactDOM = require('react-dom');

var PropTypes = require('prop-types');

var Radium = require('radium');

var Icon = require('./Icon');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var TypeAhead =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TypeAhead, _React$Component);

  function TypeAhead() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TypeAhead);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TypeAhead)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      highlightedValue: null,
      isOpen: false,
      searchString: '',
      selectedItems: _this.props.preSelectedItems
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getFilteredItems", function () {
      return _this.props.items.filter(function (item) {
        return _this.state.selectedItems.indexOf(item) === -1 && item.toLowerCase().indexOf(_this.state.searchString.toLowerCase()) > -1;
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleBlur", function () {
      _this.setState({
        highlightedValue: null,
        isOpen: false,
        searchString: ''
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleFocus", function () {
      _this.setState({
        isOpen: true
      });

      ReactDOM.findDOMNode(_this.input).focus();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleItemMouseOver", function () {
      _this.setState({
        highlightedValue: null
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleSelectAll", function () {
      _this.props.onItemSelect(null, _this.props.items);

      _this.setState({
        highlightedValue: null,
        searchString: '',
        selectedItems: _this.props.items
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleClearAll", function () {
      _this.props.onItemSelect(null, []);

      _this.setState({
        highlightedValue: null,
        searchString: '',
        selectedItems: []
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleItemSelect", function (item) {
      //add to selectedItems
      var selectedItems = _this.state.selectedItems;
      selectedItems.push(item);

      _this.props.onItemSelect(item, selectedItems);

      _this.setState({
        highlightedValue: null,
        searchString: '',
        selectedItems: selectedItems
      });

      ReactDOM.findDOMNode(_this.input).focus();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleItemRemove", function (item) {
      var selectedItems = _this.state.selectedItems.filter(function (selectedItem) {
        return selectedItem !== item;
      });

      _this.props.onItemRemove(item, selectedItems);

      _this.setState({
        selectedItems: selectedItems
      });

      ReactDOM.findDOMNode(_this.input).focus();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleInputKeyDown", function (e) {
      var searchString = e.target.value;
      var highlightedValue = _this.state.highlightedValue;
      var selectedItems = _this.state.selectedItems;

      var filteredItems = _this._getFilteredItems(); //add item on enter


      if (e.keyCode === 13 && highlightedValue && selectedItems.indexOf(highlightedValue) === -1) {
        _this._handleItemSelect(highlightedValue);
      } //add first returned item on tab


      if (e.keyCode === 9) {
        e.preventDefault();
        var item = filteredItems[0];

        if (item) {
          _this._handleItemSelect(item);
        }
      } //remove tag on backspace


      if (e.keyCode === 8 && !searchString && selectedItems.length) {
        _this._handleItemRemove(selectedItems[selectedItems.length - 1]);
      } //highlight next item on down


      if (e.keyCode === 40) {
        e.preventDefault();
        var nextIndex = filteredItems.indexOf(highlightedValue) + 1;

        if (nextIndex < filteredItems.length) {
          _this.setState({
            highlightedValue: filteredItems[nextIndex]
          });
        }

        _this._scrollList(nextIndex, 'up');

        _this.setState({
          selectedValue: filteredItems[nextIndex]
        });
      } //highlight previous item on up


      if (e.keyCode === 38) {
        e.preventDefault();
        var previousIndex = filteredItems.indexOf(highlightedValue) - 1;

        if (previousIndex > -1) {
          _this.setState({
            highlightedValue: filteredItems[previousIndex]
          });
        }

        _this._scrollList(previousIndex, 'down');

        _this.setState({
          selectedValue: filteredItems[previousIndex]
        });
      } //lose foucus on esc


      if (e.keyCode === 27) {
        e.preventDefault();

        _this.setState({
          searchString: '',
          isOpen: false,
          highlightedValue: null
        });

        ReactDOM.findDOMNode(_this.input).blur();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_scrollList", function (nextIndex, scrollDirection) {
      var filteredItems = _this._getFilteredItems();

      var ul = ReactDOM.findDOMNode(_this.optionList);
      var skipClearSelectAll = 2;
      var activeLi = ul.children[nextIndex + skipClearSelectAll];

      if (scrollDirection === 'up' && activeLi) {
        var heightFromTop = (nextIndex + skipClearSelectAll) * activeLi.clientHeight + activeLi.clientHeight;

        if (heightFromTop > ul.clientHeight || nextIndex === 0) {
          ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight * skipClearSelectAll;
        }
      } else if (scrollDirection === 'down' && activeLi) {
        var heightFromBottom = (filteredItems.length - nextIndex) * activeLi.clientHeight;

        if (heightFromBottom > ul.clientHeight) {
          ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight * skipClearSelectAll;
        }

        if (nextIndex === filteredItems.length - 1) {
          ul.scrollTop = filteredItems.length * activeLi.clientHeight;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleInputChange", function (e) {
      _this.setState({
        searchString: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderSelectedItems", function (styles) {
      return _this.state.selectedItems.map(function (item, index) {
        return React.createElement("div", {
          className: "mx-typeahead-selected",
          key: index,
          style: styles.itemTag
        }, item, React.createElement(Icon, {
          elementProps: {
            onClick: _this._handleItemRemove.bind(null, item)
          },
          size: 15,
          style: styles.removeIcon,
          type: "close"
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderItemList", function (styles) {
      return React.createElement("div", {
        className: "mx-typeahead-option-list",
        ref: function ref(_ref) {
          return _this.optionList = _ref;
        },
        style: styles.itemList
      }, _this.state.selectedItems.length !== _this.props.items.length ? React.createElement("div", {
        className: "mx-typeahead-select-all",
        key: "selectAllItem",
        onMouseDown: _this._handleSelectAll,
        onMouseOver: _this._handleItemMouseOver,
        style: styles.item
      }, "Select All") : null, _this.state.selectedItems.length > 0 ? React.createElement("div", {
        className: "mx-typeahead-clear-all",
        key: "clearAllItem",
        onMouseDown: _this._handleClearAll,
        onMouseOver: _this._handleItemMouseOver,
        style: styles.item
      }, "Clear") : null, _this._getFilteredItems().map(function (item, index) {
        return React.createElement("div", {
          className: "mx-typeahead-option",
          key: index,
          onMouseDown: _this._handleItemSelect.bind(null, item),
          onMouseOver: _this._handleItemMouseOver,
          style: _extends({}, styles.item, item === _this.state.highlightedValue && styles.activeItem)
        }, item);
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return {
        component: {
          backgroundColor: '#FFFFFF',
          borderColor: '#e5e5e5',
          borderRadius: '3px',
          borderStyle: 'solid',
          borderWidth: '1px',
          boxSizing: 'border-box',
          fontFamily: theme.FontFamily,
          fontSize: '12px',
          paddingTop: '10px',
          paddingRight: '10px',
          paddingBottom: '10px',
          paddingLeft: '10px',
          position: 'relative',
          WebkitAppearance: 'none',
          width: '100%',
          minHeight: '35px',
          ':focus': {
            backgroundColor: '#FFFFFF',
            boxShadow: 'none',
            color: theme.Colors.GRAY_700,
            outline: 'none'
          }
        },
        activeItem: {
          backgroundColor: theme.Colors.PRIMARY,
          color: theme.Colors.WHITE
        },
        clearFix: {
          clear: 'both'
        },
        input: {
          backgroundColor: '#FFFFFF',
          borderWidth: 0,
          color: theme.Colors.GRAY_700,
          fontSize: '13px',
          minWidth: '33%',
          outline: 'none',
          WebkitAppearance: 'none',
          ':focus': {
            borderWidth: 0,
            boxShadow: 'none',
            outline: 'none'
          }
        },
        itemList: {
          minHeight: '20px',
          maxHeight: '200px',
          overflow: 'auto'
        },
        itemListContainer: {
          clear: 'both',
          backgroundColor: '#fff',
          position: 'absolute',
          left: -1,
          right: -1,
          marginTop: '7px',
          marginBottom: '20px',
          border: '1px solid #E5E5E5',
          borderRadius: '0 0 3px 3px',
          boxShadow: theme.ShadowHigh,
          zIndex: 10
        },
        itemTag: {
          backgroundColor: '#eee',
          borderColor: '#e5e5e5',
          borderRadius: '3px',
          borderStyle: 'solid',
          borderWidth: '1px',
          display: 'inline-block',
          lineHeight: '0.8em',
          marginTop: '1px',
          marginRight: '2px',
          marginBottom: '1px',
          paddingLeft: '3px',
          position: 'relative'
        },
        item: {
          color: theme.Colors.GRAY_500,
          cursor: 'pointer',
          paddingTop: '10px',
          paddingRight: '10px',
          paddingBottom: '10px',
          paddingLeft: '10px',
          lineHeight: '1em',
          ':focus': {
            border: 'none',
            boxShadow: 'none',
            outline: 'none'
          },
          ':hover': {
            backgroundColor: theme.Colors.PRIMARY,
            color: theme.Colors.WHITE
          }
        },
        removeIcon: {
          color: theme.Colors.GRAY_500,
          marginLeft: '5px',
          cursor: 'pointer'
        }
      };
    });

    return _this;
  }

  _createClass(TypeAhead, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      return React.createElement("div", {
        className: "mx-typeahead",
        onBlur: this._handleBlur,
        onFocus: this._handleFocus,
        ref: this.props.elementRef,
        style: _extends({}, styles.component, this.props.style),
        tabIndex: "0"
      }, this._renderSelectedItems(styles), React.createElement("input", {
        className: "mx-typeahead-input",
        key: "input",
        onChange: this._handleInputChange,
        onKeyDown: this._handleInputKeyDown,
        placeholder: !this.state.selectedItems.length ? this.props.placeholderText : null,
        ref: function ref(_ref2) {
          return _this2.input = _ref2;
        },
        style: styles.input,
        type: "text",
        value: this.state.searchString
      }), React.createElement("div", {
        className: "mx-typeahead-option-list-container",
        style: _extends({}, styles.itemListContainer, !this.state.isOpen && {
          display: 'none'
        })
      }, this._renderItemList(styles)));
    }
  }]);

  return TypeAhead;
}(React.Component);

_defineProperty(TypeAhead, "propTypes", {
  elementRef: PropTypes.func,
  items: PropTypes.array,
  onItemRemove: PropTypes.func,
  onItemSelect: PropTypes.func,
  placeholderText: PropTypes.string,
  preSelectedItems: PropTypes.array,
  theme: themeShape
});

_defineProperty(TypeAhead, "defaultProps", {
  items: [],
  onItemRemove: function onItemRemove() {},
  onItemSelect: function onItemSelect() {},
  placeholderText: 'Select Filters',
  preSelectedItems: []
});

module.exports = (0, _Theme.withTheme)(Radium(TypeAhead));