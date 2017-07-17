'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var Radium = require('radium');

var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var TypeAhead = function (_React$Component) {
  _inherits(TypeAhead, _React$Component);

  function TypeAhead() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TypeAhead);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TypeAhead.__proto__ || Object.getPrototypeOf(TypeAhead)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      highlightedValue: null,
      isOpen: false,
      searchString: '',
      selectedItems: _this.props.preSelectedItems
    }, _this._getFilteredItems = function () {
      return _this.props.items.filter(function (item) {
        return _this.state.selectedItems.indexOf(item) === -1 && item.toLowerCase().indexOf(_this.state.searchString.toLowerCase()) > -1;
      });
    }, _this._handleBlur = function () {
      _this.setState({
        highlightedValue: null,
        isOpen: false,
        searchString: ''
      });
    }, _this._handleFocus = function () {
      _this.setState({
        isOpen: true
      });

      ReactDOM.findDOMNode(_this.input).focus();
    }, _this._handleItemMouseOver = function () {
      _this.setState({
        highlightedValue: null
      });
    }, _this._handleSelectAll = function () {
      _this.props.onItemSelect(null, _this.props.items);

      _this.setState({
        highlightedValue: null,
        searchString: '',
        selectedItems: _this.props.items
      });
    }, _this._handleClearAll = function () {
      _this.props.onItemSelect(null, []);

      _this.setState({
        highlightedValue: null,
        searchString: '',
        selectedItems: []
      });
    }, _this._handleItemSelect = function (item) {
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
    }, _this._handleItemRemove = function (item) {
      var selectedItems = _this.state.selectedItems.filter(function (selectedItem) {
        return selectedItem !== item;
      });

      _this.props.onItemRemove(item, selectedItems);

      _this.setState({
        selectedItems: selectedItems
      });

      ReactDOM.findDOMNode(_this.input).focus();
    }, _this._handleInputKeyDown = function (e) {
      var searchString = e.target.value;
      var highlightedValue = _this.state.highlightedValue;
      var selectedItems = _this.state.selectedItems;
      var filteredItems = _this._getFilteredItems();

      //add item on enter
      if (e.keyCode === 13 && highlightedValue && selectedItems.indexOf(highlightedValue) === -1) {
        _this._handleItemSelect(highlightedValue);
      }

      //add first returned item on tab
      if (e.keyCode === 9) {
        e.preventDefault();

        var item = filteredItems[0];

        if (item) {
          _this._handleItemSelect(item);
        }
      }

      //remove tag on backspace
      if (e.keyCode === 8 && !searchString && selectedItems.length) {
        _this._handleItemRemove(selectedItems[selectedItems.length - 1]);
      }

      //highlight next item on down
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
      }

      //highlight previous item on up
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
      }

      //lose foucus on esc
      if (e.keyCode === 27) {
        e.preventDefault();

        _this.setState({
          searchString: '',
          isOpen: false,
          highlightedValue: null
        });

        ReactDOM.findDOMNode(_this.input).blur();
      }
    }, _this._scrollList = function (nextIndex, scrollDirection) {
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
    }, _this._handleInputChange = function (e) {
      _this.setState({
        searchString: e.target.value
      });
    }, _this._renderSelectedItems = function () {
      return _this.state.selectedItems.map(function (item, index) {
        return React.createElement(
          'div',
          { className: 'mx-typeahead-selected', key: index, style: styles.itemTag },
          item,
          React.createElement(Icon, {
            elementProps: {
              onClick: _this._handleItemRemove.bind(null, item)
            },
            size: 15,
            style: styles.removeIcon,
            type: 'close'
          })
        );
      });
    }, _this._renderItemList = function () {
      return React.createElement(
        'div',
        {
          className: 'mx-typeahead-option-list',
          ref: function ref(_ref2) {
            return _this.optionList = _ref2;
          },
          style: styles.itemList
        },
        _this.state.selectedItems.length !== _this.props.items.length ? React.createElement(
          'div',
          {
            className: 'mx-typeahead-select-all',
            key: 'selectAllItem',
            onMouseDown: _this._handleSelectAll,
            onMouseOver: _this._handleItemMouseOver,
            style: styles.item
          },
          'Select All'
        ) : null,
        _this.state.selectedItems.length > 0 ? React.createElement(
          'div',
          {
            className: 'mx-typeahead-clear-all',
            key: 'clearAllItem',
            onMouseDown: _this._handleClearAll,
            onMouseOver: _this._handleItemMouseOver,
            style: styles.item
          },
          'Clear'
        ) : null,
        _this._getFilteredItems().map(function (item, index) {
          return React.createElement(
            'div',
            {
              className: 'mx-typeahead-option',
              key: index,
              onMouseDown: _this._handleItemSelect.bind(null, item),
              onMouseOver: _this._handleItemMouseOver,
              style: [styles.item, item === _this.state.highlightedValue && styles.activeItem]
            },
            item
          );
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TypeAhead, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        {
          className: 'mx-typeahead',
          onBlur: this._handleBlur,
          onFocus: this._handleFocus,
          style: [styles.component, this.props.style],
          tabIndex: '0'
        },
        this._renderSelectedItems(),
        React.createElement('input', {
          className: 'mx-typeahead-input',
          key: 'input',
          onChange: this._handleInputChange,
          onKeyDown: this._handleInputKeyDown,
          placeholder: !this.state.selectedItems.length ? this.props.placeholderText : null,
          ref: function ref(_ref3) {
            return _this2.input = _ref3;
          },
          style: styles.input,
          type: 'text',
          value: this.state.searchString
        }),
        React.createElement(
          'div',
          { className: 'mx-typeahead-option-list-container', style: [styles.itemListContainer, !this.state.isOpen && { display: 'none' }] },
          this._renderItemList()
        )
      );
    }
  }]);

  return TypeAhead;
}(React.Component);

TypeAhead.propTypes = {
  items: PropTypes.array,
  onItemRemove: PropTypes.func,
  onItemSelect: PropTypes.func,
  placeholderText: PropTypes.string,
  preSelectedItems: PropTypes.array
};
TypeAhead.defaultProps = {
  items: [],
  onItemRemove: function onItemRemove() {},
  onItemSelect: function onItemSelect() {},

  placeholderText: 'Select Filters',
  preSelectedItems: []
};


var styles = {
  component: {
    backgroundColor: '#FFFFFF',
    borderColor: '#e5e5e5',
    borderRadius: '3px',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    fontFamily: StyleConstants.FontFamily,
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
      color: StyleConstants.Colors.CHARCOAL,
      outline: 'none'
    }
  },
  activeItem: {
    backgroundColor: StyleConstants.Colors.PRIMARY,
    color: StyleConstants.Colors.WHITE
  },
  clearFix: {
    clear: 'both'
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    color: StyleConstants.Colors.CHARCOAL,
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
    boxShadow: StyleConstants.ShadowHigh,
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
    color: StyleConstants.Colors.ASH,
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
      backgroundColor: StyleConstants.Colors.PRIMARY,
      color: StyleConstants.Colors.WHITE
    }
  },
  removeIcon: {
    color: StyleConstants.Colors.ASH,
    marginLeft: '5px',
    cursor: 'pointer'
  }
};

module.exports = Radium(TypeAhead);