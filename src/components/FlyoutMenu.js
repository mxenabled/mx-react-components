const React = require('react');
const ReactDOM = require('react-dom');
const Radium = require('radium');

const Icon = require('./Icon');
const StyleConstants = require('../constants/Style');

const FlyoutMenu = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func,
    selectedItem: React.PropTypes.object,
    title: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      onSelect () {},
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

  _flattenNestedArray (nestedArray) {
    const tempArray = [];

    for (let i = 0; i < nestedArray.length; i++) {
      tempArray.push({
        label: nestedArray[i].label,
        value: nestedArray[i].value
      });

      if (nestedArray[i].items) {
        for (let j = 0; j < nestedArray[i].items.length; j++) {
          tempArray.push({
            label: nestedArray[i].items[j].label,
            value: nestedArray[i].items[j].value
          });
        }
      }
    }
    return tempArray;
  },

  _getCategoriesByKeyword (searchKeyword) {
    const flatList = this._flattenNestedArray(this.props.data);
    const searchList = flatList.filter(option => {
      return option.label.toLowerCase().match(searchKeyword.toLowerCase());
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
    const marginBottom = 12;
    const li = ReactDOM.findDOMNode(e.target);
    const liPosRelativeToViewport = li.getBoundingClientRect();
    let topOffset = liPosRelativeToViewport.top - marginTop;
    const childListCount = hoverItem.items.length;
    const totalHeight = topOffset + (childListCount + 1) * li.offsetHeight;
    const pageHeight = e.target.offsetParent.clientHeight;

    if (totalHeight >= pageHeight) {
      topOffset -= totalHeight - pageHeight - marginBottom;
    } else {
      topOffset -= marginBottom;
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
    this.props.onSelect(selectedItem);

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
        <ul style={styles.ulStyle}>
        {item.items.map(child => {
          return (
            <li
              key={child.label + child.value}
              onClick={this._handleClick.bind(null, child)}
              style={[styles.optionStyle, styles.optionChildStyle]}
            >
              {child.label}
            </li>
          );
        })}
        </ul>
      );
    }
  },

  _renderCategories () {
    if (this.state.showingOptions) {
      const itemList = this.state.searchKeyword ? this.state.searchList : this.props.data;

      return (
         <ul style={styles.ulStyle}>
           {itemList.map(item => {
             return (
               <li
                key={item.label + item.value}
                onClick={this._handleClick.bind(null, item)}
                onMouseOver={!this.state.searchKeyword ? this._handleMouseOver.bind(null, item) : null}
                style={[styles.optionStyle, item === this.state.highlightedItem && styles.activeItem]}>
                  {item.label}
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
              {this.state.selectedItem ? this.state.selectedItem.label : this.props.title}
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
  component: {
    display: 'inline-block',
    boxSizing: 'border-box',
    width: '240px'
  },
  wrapper: {
    fontFamily: StyleConstants.BaseFontFamily,
    margin: '10px 0 10px 5px',
    position: 'relative'
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
  optionsStyle: {
    border: '1px solid #E5E5E5',
    boxShadow: '0 30px 30px 10px rgba(0,0,0,0.1)',
    maxHeight: '500px',
    width: '100%'
  },
  optionsChildStyle: {
    backgroundColor: '#ffffff',
    left: '240px'
  },
  ulStyle: {
    margin: '10px 0 10px 0',
    padding: '0px'
  },
  optionStyle: {
    paddingLeft: '35px',
    fontSize: '15px',
    lineHeight: '35px',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',

    ':hover': {
      backgroundColor: '#ffffff',
      cursor: 'pointer'
    }
  },
  optionChildStyle: {
    paddingLeft: '40px',

    ':hover': {
      backgroundColor: '#f7f9f9',
      cursor: 'pointer'
    }
  },
  caret: {
    color: '#CCCCCC',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  searchInput: {
    lineHeight: '45px',
    padding: '0px 0px',
    boxSizing: 'border-box',
    paddingLeft: '40px',
    position: 'relative',
    marginTop: '-2px',
    marginLeft: '1px',
    left: '-1px',
    right: '-2px',
    width: '100%',
    fontSize: '15px',

    ':focus': {
      border: '1px solid #E5E5E5'
    }
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    top: '12px',
    zIndex: 10
  },
  activeItem: {
    backgroundColor: '#ffffff',
    color: StyleConstants.Colors.PRIMARY
  },
  selectedText: {
    cursor: 'pointer',
    fontFamily: StyleConstants.BaseFontFamily,
    fontSize: '15px',
    paddingRight: '15px',
    paddingLeft: '15px',
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

module.exports = Radium(FlyoutMenu);