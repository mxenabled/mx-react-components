const React = require('react');
const Radium = require('radium');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const TypeAhead = React.createClass({
  propTypes: {
    items: React.PropTypes.array,
    onItemRemove: React.PropTypes.func,
    onItemSelect: React.PropTypes.func,
    placeholderText: React.PropTypes.string,
    preSelectedItems: React.PropTypes.array
  },

  getDefaultProps () {
    return {
      items: [],
      onItemRemove () {},
      onItemSelect () {},
      placeholderText: 'Select Filters',
      preSelectedItems: []
    };
  },

  getInitialState () {
    return {
      highlightedValue: null,
      isOpen: false,
      searchString: '',
      selectedItems: this.props.preSelectedItems
    };
  },

  _getFilteredItems () {
    return this.props.items.filter(item => {
      return this.state.selectedItems.indexOf(item) === -1 &&
             item.toLowerCase().indexOf(this.state.searchString.toLowerCase()) > -1;
    });
  },

  _handleBlur () {
    this.setState({
      highlightedValue: null,
      isOpen: false,
      searchString: ''
    });
  },

  _handleFocus () {
    this.setState({
      isOpen: true
    });

    React.findDOMNode(this.refs.input).focus();
  },

  _handleItemMouseOver () {
    this.setState({
      highlightedValue: null
    });
  },

  _handleSelectAll () {
    this.props.onItemSelect(null, this.props.items);

    this.setState({
      highlightedValue: null,
      searchString: '',
      selectedItems: this.props.items
    });
  },

  _handleClearAll () {
    this.props.onItemSelect(null, []);

    this.setState({
      highlightedValue: null,
      searchString: '',
      selectedItems: []
    });
  },

  _handleItemSelect (item) {
    //add to selectedItems
    const selectedItems = this.state.selectedItems;

    if (item) {
      selectedItems.push(item);
    }

    this.props.onItemSelect(item, selectedItems);

    this.setState({
      highlightedValue: null,
      searchString: '',
      selectedItems
    });

    React.findDOMNode(this.refs.input).focus();
  },

  _handleItemRemove (item) {
    const selectedItems = this.state.selectedItems.filter(selectedItem => {
      return selectedItem !== item;
    });

    this.props.onItemRemove(item, selectedItems);

    this.setState({
      selectedItems
    });

    React.findDOMNode(this.refs.input).focus();
  },

  _handleInputKeyDown (e) {
    const searchString = e.target.value;
    const highlightedValue = this.state.highlightedValue;
    const selectedItems = this.state.selectedItems;
    const filteredItems = this._getFilteredItems();

    //add item on enter
    if (e.keyCode === 13 && selectedItems.indexOf(highlightedValue) === -1) {
      this._handleItemSelect(highlightedValue);
    }

    //add first returned item on tab
    if (e.keyCode === 9) {
      e.preventDefault();

      this._handleItemSelect(filteredItems[0]);
    }

    //remove tag on backspace
    if (e.keyCode === 8 && !searchString && selectedItems.length) {
      this._handleItemRemove(selectedItems[selectedItems.length - 1]);
    }

    //highlight next item on down
    if (e.keyCode === 40) {
      e.preventDefault();
      const nextIndex = filteredItems.indexOf(highlightedValue) + 1;

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
      const previousIndex = filteredItems.indexOf(highlightedValue) - 1;

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

      React.findDOMNode(this.refs.input).blur();
    }
  },

  _scrollList (nextIndex, scrollDirection) {
    const filteredItems = this._getFilteredItems();
    const ul = React.findDOMNode(this.refs.optionList);
    const skipClearSelectAll = 2;
    const activeLi = this.refs.optionList.getDOMNode().children[nextIndex + skipClearSelectAll];

    if (scrollDirection === 'up' && activeLi) {
      const heightFromTop = (nextIndex + skipClearSelectAll) * activeLi.clientHeight + activeLi.clientHeight;

      if (heightFromTop > ul.clientHeight || nextIndex === 0) {
        ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight * skipClearSelectAll;
      }
    } else if (scrollDirection === 'down' && activeLi) {
      const heightFromBottom = (filteredItems.length - nextIndex) * activeLi.clientHeight;

      if (heightFromBottom > ul.clientHeight) {
        ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight * skipClearSelectAll;
      }

      if (nextIndex === filteredItems.length - 1) {
        ul.scrollTop = filteredItems.length * activeLi.clientHeight;
      }
    }
  },

  _handleInputChange (e) {
    this.setState({
      searchString: e.target.value
    });
  },

  _renderSelectedItems () {
    return this.state.selectedItems.map((item, index) => {
      return (
        <div key={index} style={styles.itemTag}>
          {item}
          <Icon
            onClick={this._handleItemRemove.bind(null, item)}
            size='15px'
            style={styles.removeIcon}
            type='close'
          />
        </div>);
    });
  },

  _renderItemList () {
    return (
      <div ref='optionList' style={styles.itemList}>
        {this.state.selectedItems.length !== this.props.items.length ? (
          <div
            key='selectAllItem'
            onMouseDown={this._handleSelectAll}
            onMouseOver={this._handleItemMouseOver}
            style={styles.item}
          >
            Select All
          </div>
        ) : (
          null
        )}

        {this.state.selectedItems.length > 0 ? (
          <div
            key='clearAllItem'
            onMouseDown={this._handleClearAll}
            onMouseOver={this._handleItemMouseOver}
            style={styles.item}
          >
            Clear
          </div>
        ) : (
          null
        )}

        {this._getFilteredItems().map((item, index) => {
          return (
            <div
              key={index}
              onMouseDown={this._handleItemSelect.bind(null, item)}
              onMouseOver={this._handleItemMouseOver}
              ref={index}
              style={[styles.item, (item === this.state.highlightedValue) && styles.activeItem]}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  },

  render () {
    return (
      <div
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        style={[styles.component, this.props.style]}
        tabIndex='0'
      >
        {this._renderSelectedItems()}

        <input
          key='input'
          onChange={this._handleInputChange}
          onKeyDown={this._handleInputKeyDown}
          placeholder={!this.state.selectedItems.length ? this.props.placeholderText : null}
          ref='input'
          style={styles.input}
          type='text'
          value={this.state.searchString}
        />

        <div key='testingOnClick' style={[styles.itemListContainer, !this.state.isOpen && { display: 'none' }]}>
          {this._renderItemList()}
        </div>
      </div>
    );
  }
});

const styles = {
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
      color: StyleConstants.Colors.FONT,
      outline: 'none'
    }
  },
  activeItem: {
    backgroundColor: StyleConstants.Colors.PRIMARY,
    color: StyleConstants.Colors.INVERSE_PRIMARY
  },
  clearFix: {
    clear: 'both'
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    color: StyleConstants.Colors.FONT,
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
    boxShadow: '0 30px 30px 10px rgba(0,0,0,0.1)',
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
    color: StyleConstants.Colors.LIGHT_FONT,
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
      color: StyleConstants.Colors.INVERSE_PRIMARY
    }
  },
  removeIcon: {
    color: StyleConstants.Colors.LIGHT_FONT,
    marginLeft: '5px',
    cursor: 'pointer'
  }
};

module.exports = Radium(TypeAhead);