const React = require('react');
const ReactDOM = require('react-dom');
const Radium = require('radium');

const Icon = require('./Icon');
const StyleConstants = require('../constants/Style');

const TwoLevelSelector = React.createClass({

  propTypes: {
    data: React.PropTypes.object,
    onChange: React.PropTypes.func,
    selectedItem: React.PropTypes.string,
    title: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      data: null,
      onChange () {},
      selectedItem: null,
      title: 'Choose an item'
    };
  },

  getInitialState () {
    return {
      childListTopOffset: 0,
      highlightedItem: null,
      searchKeyword: null,
      searchList: [],
      selectedItem: this.props.selectedItem || null,
      showingOptions: false
    };
  },

  _getChildItems (parentItem) {
    return this.props.data[parentItem];
  },

  _getParentItems () {
    const parentItems = [];
    const items = this.props.data;

    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        parentItems.push(key);
      }
    }
    return parentItems;
  },

  _flattenObjectToArray (obj) {
    const tempArray = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        tempArray.push(key);
      }

      obj[key].map(val => {
        tempArray.push(val);
      });
    }
    return tempArray;
  },

  _getCategoriesByKeyword (searchKeyword) {
    const flatList = this._flattenObjectToArray(this.props.data);
    const searchList = flatList.filter(option => {
      return option.toLowerCase().match(searchKeyword.toLowerCase());
    });

    this.setState({
      hoverItem: null,
      searchList: searchKeyword ? searchList : [],
      searchKeyword
    });
  },

  _toggleShowingCategories () {
    this.setState({
      showingOptions: !this.state.showingOptions
    });
  },

  _handleMouseOver (hoverItem, e) {
    const marginTop = ReactDOM.findDOMNode(this.refs.anchorDiv).getBoundingClientRect().top;
    const marginBottom = 25;
    const li = ReactDOM.findDOMNode(e.target);
    const liPosRelativeToViewport = li.getBoundingClientRect();
    let topOffset = liPosRelativeToViewport.top - marginTop;
    const childListCount = this._getChildItems(hoverItem).length;
    const totalHeight = topOffset + (childListCount + 1) * li.offsetHeight;
    const pageHeight = e.target.offsetParent.clientHeight;

    if (totalHeight >= pageHeight) {
      topOffset -= totalHeight - pageHeight - marginBottom;
    }

    this.setState({
      hoverItem,
      childListTopOffset: topOffset
    });
  },

  _handleBlur () {
    this.setState({
      showingOptions: false
    });
  },

  _handleClick (selectedItem) {
    this.props.onChange(selectedItem);

    this.setState({
      highlightedItem: null,
      searchKeyword: null,
      searchList: [],
      selectedItem,
      showingOptions: false
    });
  },

  _handleKeyup (e) {
    const highlightedItem = this.state.highlightedItem;

    if (e.which === 13 && this.state.searchList.indexOf(highlightedItem) > -1) {
      e.preventDefault();
      this._handleClick(highlightedItem);
    }

    if (e.which === 40) {
      e.preventDefault();
      const nextIndex = this.state.searchList.indexOf(highlightedItem) + 1;

      if (nextIndex < this.state.searchList.length) {
        this.setState({
          highlightedItem: this.state.searchList[nextIndex]
        });
      }
    }

    if (e.which === 38) {
      e.preventDefault();
      const nextIndex = this.state.searchList.indexOf(highlightedItem) - 1;

      if (nextIndex > -1) {
        this.setState({
          highlightedItem: this.state.searchList[nextIndex]
        });
      }
    }
  },

  _handleSearch (e) {
    this._getCategoriesByKeyword(e.target.value);
  },

  _renderScrim () {
    if (this.state.showingOptions) {
      return (
        <div onClick={this._handleBlur} style={styles.scrim} />
      );
    }
  },

  _renderChildCategories () {
    const item = this.state.hoverItem;

    if (this.state.hoverItem && this.state.showingOptions && this.state.searchList.length === 0) {
      return (
        <ul style={styles.listStyle}>
        {this._getChildItems(item).map(child => {
          return (
            <li
              key={child}
              onClick={this._handleClick.bind(null, child)}
              style={[styles.optionStyle, styles.optionChildStyle]}
            >
              {child}
            </li>
          );
        })}
        </ul>
      );
    }
  },

  _renderCategories () {
    if (this.state.showingOptions) {
      const itemList = this.state.searchKeyword ? this.state.searchList : this._getParentItems();

      return (
         <ul style={styles.listStyle}>
           {itemList.map(item => {
             return (
               <li
                key={item}
                onClick={this._handleClick.bind(null, item)}
                onMouseOver={!this.state.searchKeyword ? this._handleMouseOver.bind(null, item) : null}
                style={[styles.optionStyle, item === this.state.highlightedItem && styles.activeItem]}>
                  {item}
               </li>
             );
           })}
         </ul>
      );
    }
  },

  _renderSearchInput () {
    if (this.state.showingOptions) {
      return (
        <input
          autoFocus={true}
          name='search'
          onChange={this._handleSearch}
          onKeyUp={this._handleKeyup}
          placeholder='Search'
          ref='searchinput'
          style={styles.searchInput}
          type='text'
          value={this.state.searchKeyword}
      />);
    }
  },

  _renderCaret () {
    return (
     <Icon
      key='caret'
      size={20}
      style={styles.caret}
      type={this.state.showingOptions ? 'caret-down' : 'caret-right'}
     />
    );
  },

  render () {
    return (
      <div style={styles.component}>
        <div
          onClick={this._toggleShowingCategories}
          style={[styles.selectedText, styles.wrapper]}
        >
            <span>
              {this.state.selectedItem || this.props.title}
            </span>
            {this._renderCaret()}
        </div>
        {this._renderScrim()}
        <div style={{ position: 'relative' }}>
          <div ref='anchorDiv' style={[styles.options, this.state.showingOptions && styles.optionsStyle, styles.optionsParentStyle]}>
            <Icon
               key='searchicon'
               size={20}
               style={styles.searchIcon}
               type={'search'}
            />
            {this._renderSearchInput()}
            {this._renderCategories()}
          </div>
          <div style={[styles.options, (this.state.hoverItem && this.state.showingOptions) && styles.optionsStyle, styles.optionsChildStyle,
                  { top: this.state.childListTopOffset }]}>
            {this._renderChildCategories()}
          </div>
        </div>
      </div>
    );
  }
});

const styles = {
  activeItem: {
    backgroundColor: '#ffffff',
    color: StyleConstants.Colors.PRIMARY
  },
  caret: {
    color: '#CCCCCC',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  component: {
    border: '1px solid #e5e5e5',
    display: 'inline-block',
    boxSizing: 'border-box'
  },
  wrapper: {
    fontFamily: StyleConstants.FontFamily,
    lineHeight: '30px',
    marginTop: '5px',
    marginBottom: '5px',
    marginRight: '5px',
    position: 'relative',
    minWidth: '260px',
    width: 'auto'
  },
  listStyle: {
    margin: '0 0 15px 0',
    padding: '0px'
  },
  optionsStyle: {
    border: '1px solid #E5E5E5',
    boxShadow: '0 30px 30px 10px rgba(0,0,0,0.1)',
    maxHeight: '420px',
    minWidth: '260px',
    width: 'auto'
  },
  optionsChildStyle: {
    backgroundColor: '#ffffff',
    left: '285px'
  },
  searchInput: {
    borderRadius: '12px',
    height: '30px',
    paddingLeft: '30px',
    position: 'relative',
    marginTop: '10px',
    left: '10%',
    width: '80%',
    fontSize: '15px'
  },
  searchIcon: {
    position: 'absolute',
    left: '30px',
    top: '15px',
    zIndex: 10
  },
  options: {
    backgroundColor: '#f7f9f9',
    borderRadius: '0 0 3px 3px',
    left: '-1px',
    right: '-1px',
    minWidth: '100%',
    position: 'absolute',
    overflow: 'auto',
    zIndex: 10
  },
  optionStyle: {
    padding: '12px 12px 12px 50px',
    fontSize: '15px',
    whiteSpace: 'nowrap',
    listStyle: 'none',

    ':hover': {
      backgroundColor: '#ffffff',
      cursor: 'pointer'
    }
  },
  optionChildStyle: {
    ':hover': {
      backgroundColor: '#f7f9f9',
      cursor: 'pointer'
    }
  },
  selectedText: {
    cursor: 'pointer',
    fontFamily: StyleConstants.FontFamily,
    fontSize: '13px',
    paddingRight: '10px',
    paddingLeft: '10px',
    whiteSpace: 'nowrap'
  },
  scrim: {
    position: 'fixed',
    zIndex: 9,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};

module.exports = Radium(TwoLevelSelector);