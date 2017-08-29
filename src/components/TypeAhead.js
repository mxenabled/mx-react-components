const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');
const Radium = require('radium');

const Icon = require('./Icon');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class TypeAhead extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    onItemRemove: PropTypes.func,
    onItemSelect: PropTypes.func,
    placeholderText: PropTypes.string,
    preSelectedItems: PropTypes.array,
    theme: themeShape
  };

  static defaultProps = {
    items: [],
    onItemRemove () {},
    onItemSelect () {},
    placeholderText: 'Select Filters',
    preSelectedItems: []
  };

  state = {
    highlightedValue: null,
    isOpen: false,
    searchString: '',
    selectedItems: this.props.preSelectedItems
  };

  _getFilteredItems = () => {
    return this.props.items.filter(item => {
      return this.state.selectedItems.indexOf(item) === -1 &&
             item.toLowerCase().indexOf(this.state.searchString.toLowerCase()) > -1;
    });
  };

  _handleBlur = () => {
    this.setState({
      highlightedValue: null,
      isOpen: false,
      searchString: ''
    });
  };

  _handleFocus = () => {
    this.setState({
      isOpen: true
    });

    ReactDOM.findDOMNode(this.input).focus();
  };

  _handleItemMouseOver = () => {
    this.setState({
      highlightedValue: null
    });
  };

  _handleSelectAll = () => {
    this.props.onItemSelect(null, this.props.items);

    this.setState({
      highlightedValue: null,
      searchString: '',
      selectedItems: this.props.items
    });
  };

  _handleClearAll = () => {
    this.props.onItemSelect(null, []);

    this.setState({
      highlightedValue: null,
      searchString: '',
      selectedItems: []
    });
  };

  _handleItemSelect = (item) => {
    //add to selectedItems
    const selectedItems = this.state.selectedItems;

    selectedItems.push(item);

    this.props.onItemSelect(item, selectedItems);

    this.setState({
      highlightedValue: null,
      searchString: '',
      selectedItems
    });

    ReactDOM.findDOMNode(this.input).focus();
  };

  _handleItemRemove = (item) => {
    const selectedItems = this.state.selectedItems.filter(selectedItem => {
      return selectedItem !== item;
    });

    this.props.onItemRemove(item, selectedItems);

    this.setState({
      selectedItems
    });

    ReactDOM.findDOMNode(this.input).focus();
  };

  _handleInputKeyDown = (e) => {
    const searchString = e.target.value;
    const highlightedValue = this.state.highlightedValue;
    const selectedItems = this.state.selectedItems;
    const filteredItems = this._getFilteredItems();

    //add item on enter
    if (e.keyCode === 13 && highlightedValue && selectedItems.indexOf(highlightedValue) === -1) {
      this._handleItemSelect(highlightedValue);
    }

    //add first returned item on tab
    if (e.keyCode === 9) {
      e.preventDefault();

      const item = filteredItems[0];

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

      ReactDOM.findDOMNode(this.input).blur();
    }
  };

  _scrollList = (nextIndex, scrollDirection) => {
    const filteredItems = this._getFilteredItems();
    const ul = ReactDOM.findDOMNode(this.optionList);
    const skipClearSelectAll = 2;
    const activeLi = ul.children[nextIndex + skipClearSelectAll];

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
  };

  _handleInputChange = (e) => {
    this.setState({
      searchString: e.target.value
    });
  };

  _renderSelectedItems = (styles) => {
    return this.state.selectedItems.map((item, index) => {
      return (
        <div className='mx-typeahead-selected' key={index} style={styles.itemTag}>
          {item}
          <Icon
            elementProps={{
              onClick: this._handleItemRemove.bind(null, item)
            }}
            size={15}
            style={styles.removeIcon}
            type='close'
          />
        </div>);
    });
  };

  _renderItemList = (styles) => {
    return (
      <div
        className='mx-typeahead-option-list'
        ref={(ref) => this.optionList = ref}
        style={styles.itemList}
      >
        {this.state.selectedItems.length !== this.props.items.length ? (
          <div
            className='mx-typeahead-select-all'
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
            className='mx-typeahead-clear-all'
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
              className='mx-typeahead-option'
              key={index}
              onMouseDown={this._handleItemSelect.bind(null, item)}
              onMouseOver={this._handleItemMouseOver}
              style={Object.assign({}, styles.item, (item === this.state.highlightedValue) && styles.activeItem)}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);

    return (
      <div
        className='mx-typeahead'
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        style={Object.assign({}, styles.component, this.props.style)}
        tabIndex='0'
      >
        {this._renderSelectedItems(styles)}

        <input
          className='mx-typeahead-input'
          key='input'
          onChange={this._handleInputChange}
          onKeyDown={this._handleInputKeyDown}
          placeholder={!this.state.selectedItems.length ? this.props.placeholderText : null}
          ref={(ref) => this.input = ref}
          style={styles.input}
          type='text'
          value={this.state.searchString}
        />

        <div className='mx-typeahead-option-list-container' style={Object.assign({}, styles.itemListContainer, !this.state.isOpen && { display: 'none' })}>
          {this._renderItemList(styles)}
        </div>
      </div>
    );
  }

  styles = (theme) => {
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
  };
}

module.exports = Radium(TypeAhead);
