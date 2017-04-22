'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Radium = require('radium');

var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var TypeAhead = React.createClass({
  displayName: 'TypeAhead',

  propTypes: {
    items: React.PropTypes.array,
    onItemRemove: React.PropTypes.func,
    onItemSelect: React.PropTypes.func,
    placeholderText: React.PropTypes.string,
    preSelectedItems: React.PropTypes.array
  },

  getDefaultProps: function getDefaultProps() {
    return {
      items: [],
      onItemRemove: function onItemRemove() {},
      onItemSelect: function onItemSelect() {},

      placeholderText: 'Select Filters',
      preSelectedItems: []
    };
  },
  getInitialState: function getInitialState() {
    return {
      highlightedValue: null,
      isOpen: false,
      searchString: '',
      selectedItems: this.props.preSelectedItems
    };
  },
  _getFilteredItems: function _getFilteredItems() {
    var _this = this;

    return this.props.items.filter(function (item) {
      return _this.state.selectedItems.indexOf(item) === -1 && item.toLowerCase().indexOf(_this.state.searchString.toLowerCase()) > -1;
    });
  },
  _handleBlur: function _handleBlur() {
    this.setState({
      highlightedValue: null,
      isOpen: false,
      searchString: ''
    });
  },
  _handleFocus: function _handleFocus() {
    this.setState({
      isOpen: true
    });

    ReactDOM.findDOMNode(this.input).focus();
  },
  _handleItemMouseOver: function _handleItemMouseOver() {
    this.setState({
      highlightedValue: null
    });
  },
  _handleSelectAll: function _handleSelectAll() {
    this.props.onItemSelect(null, this.props.items);

    this.setState({
      highlightedValue: null,
      searchString: '',
      selectedItems: this.props.items
    });
  },
  _handleClearAll: function _handleClearAll() {
    this.props.onItemSelect(null, []);

    this.setState({
      highlightedValue: null,
      searchString: '',
      selectedItems: []
    });
  },
  _handleItemSelect: function _handleItemSelect(item) {
    //add to selectedItems
    var selectedItems = this.state.selectedItems;

    selectedItems.push(item);

    this.props.onItemSelect(item, selectedItems);

    this.setState({
      highlightedValue: null,
      searchString: '',
      selectedItems: selectedItems
    });

    ReactDOM.findDOMNode(this.input).focus();
  },
  _handleItemRemove: function _handleItemRemove(item) {
    var selectedItems = this.state.selectedItems.filter(function (selectedItem) {
      return selectedItem !== item;
    });

    this.props.onItemRemove(item, selectedItems);

    this.setState({
      selectedItems: selectedItems
    });

    ReactDOM.findDOMNode(this.input).focus();
  },
  _handleInputKeyDown: function _handleInputKeyDown(e) {
    var searchString = e.target.value;
    var highlightedValue = this.state.highlightedValue;
    var selectedItems = this.state.selectedItems;
    var filteredItems = this._getFilteredItems();

    //add item on enter
    if (e.keyCode === 13 && highlightedValue && selectedItems.indexOf(highlightedValue) === -1) {
      this._handleItemSelect(highlightedValue);
    }

    //add first returned item on tab
    if (e.keyCode === 9) {
      e.preventDefault();

      var item = filteredItems[0];

      if (item) {
        this._handleItemSelect(item);
      }
    }

    //remove tag on backspace
    if (e.keyCode === 8 && !searchString && selectedItems.length) {
      this._handleItemRemove(selectedItems[selectedItems.length - 1]);
    }

    //highlight next item on down
    if (e.keyCode === 40) {
      e.preventDefault();
      var nextIndex = filteredItems.indexOf(highlightedValue) + 1;

      if (nextIndex < filteredItems.length) {
        this.setState({
          highlightedValue: filteredItems[nextIndex]
        });
      }

      this._scrollList(nextIndex, 'up');

      this.setState({
        selectedValue: filteredItems[nextIndex]
      });
    }

    //highlight previous item on up
    if (e.keyCode === 38) {
      e.preventDefault();
      var previousIndex = filteredItems.indexOf(highlightedValue) - 1;

      if (previousIndex > -1) {
        this.setState({
          highlightedValue: filteredItems[previousIndex]
        });
      }

      this._scrollList(previousIndex, 'down');
      this.setState({
        selectedValue: filteredItems[previousIndex]
      });
    }

    //lose foucus on esc
    if (e.keyCode === 27) {
      e.preventDefault();

      this.setState({
        searchString: '',
        isOpen: false,
        highlightedValue: null
      });

      ReactDOM.findDOMNode(this.input).blur();
    }
  },
  _scrollList: function _scrollList(nextIndex, scrollDirection) {
    var filteredItems = this._getFilteredItems();
    var ul = ReactDOM.findDOMNode(this.optionList);
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
  },
  _handleInputChange: function _handleInputChange(e) {
    this.setState({
      searchString: e.target.value
    });
  },
  _renderSelectedItems: function _renderSelectedItems() {
    var _this2 = this;

    return this.state.selectedItems.map(function (item, index) {
      return React.createElement(
        'div',
        { className: 'mx-typeahead-selected', key: index, style: styles.itemTag },
        item,
        React.createElement(Icon, {
          elementProps: {
            onClick: _this2._handleItemRemove.bind(null, item)
          },
          size: 15,
          style: styles.removeIcon,
          type: 'close'
        })
      );
    });
  },
  _renderItemList: function _renderItemList() {
    var _this3 = this;

    return React.createElement(
      'div',
      {
        className: 'mx-typeahead-option-list',
        ref: function ref(_ref) {
          return _this3.optionList = _ref;
        },
        style: styles.itemList
      },
      this.state.selectedItems.length !== this.props.items.length ? React.createElement(
        'div',
        {
          className: 'mx-typeahead-select-all',
          key: 'selectAllItem',
          onMouseDown: this._handleSelectAll,
          onMouseOver: this._handleItemMouseOver,
          style: styles.item
        },
        'Select All'
      ) : null,
      this.state.selectedItems.length > 0 ? React.createElement(
        'div',
        {
          className: 'mx-typeahead-clear-all',
          key: 'clearAllItem',
          onMouseDown: this._handleClearAll,
          onMouseOver: this._handleItemMouseOver,
          style: styles.item
        },
        'Clear'
      ) : null,
      this._getFilteredItems().map(function (item, index) {
        return React.createElement(
          'div',
          {
            className: 'mx-typeahead-option',
            key: index,
            onMouseDown: _this3._handleItemSelect.bind(null, item),
            onMouseOver: _this3._handleItemMouseOver,
            style: [styles.item, item === _this3.state.highlightedValue && styles.activeItem]
          },
          item
        );
      })
    );
  },
  render: function render() {
    var _this4 = this;

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
        ref: function ref(_ref2) {
          return _this4.input = _ref2;
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
});

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