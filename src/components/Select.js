const React = require('react');
const ReactDOM = require('react-dom');
const Radium = require('radium');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent);


const Select = React.createClass({
  propTypes: {
    color: React.PropTypes.string,
    dropdownStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    onChange: React.PropTypes.func,
    options: React.PropTypes.array,
    optionsStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    optionStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    placeholderText: React.PropTypes.string,
    scrimStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    selected: React.PropTypes.object,
    selectedStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    valid: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      color: null,
      onChange () {},
      options: [],
      placeholderText: 'Select One',
      selected: false,
      valid: true
    };
  },

  getInitialState () {
    return {
      highlightedValue: null,
      isOpen: false,
      selected: false
    };
  },

  componentDidMount () {
    styles.option[':hover'].backgroundColor = this.props.color || StyleConstants.Colors.PRIMARY;
  },

  _handleScrimClick () {
    this.setState({
      isOpen: false,
      highlightedValue: null
    });
  },

  _handleClick () {
    if (!isMobile) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  },

  _handleOptionClick (option) {
    this.setState({
      selected: option,
      isOpen: false,
      highlightedValue: null
    });

    this.props.onChange(option);
  },

  _handleSelectChange (e) {
    const selectedOption = this.props.options.filter(option => {
      return option.value + '' === e.target.value;
    })[0];

    this._handleOptionClick(selectedOption);
  },

  _handleInputKeyDown (e) {
    const highlightedValue = this.state.highlightedValue;

    if (e.keyCode === 13 && highlightedValue) {
      this._handleOptionClick(highlightedValue);
    }

    if (e.keyCode === 40) {
      e.preventDefault();

      const nextIndex = this.props.options.indexOf(highlightedValue) + 1;

      if (nextIndex < this.props.options.length) {
        this.setState({
          highlightedValue: this.props.options[nextIndex]
        });

        this._scrollListDown(nextIndex);
      }
    }

    if (e.keyCode === 38) {
      e.preventDefault();

      const previousIndex = this.props.options.indexOf(highlightedValue) - 1;

      if (previousIndex > -1) {
        this.setState({
          highlightedValue: this.props.options[previousIndex]
        });

        this._scrollListUp(previousIndex);
      }
    }
  },

  _scrollListDown (nextIndex) {
    const ul = ReactDOM.findDOMNode(this.refs.optionList);
    const activeLi = ul.children[nextIndex];
    const heightFromTop = nextIndex * activeLi.clientHeight;

    if (heightFromTop > ul.clientHeight) {
      ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
    }
  },

  _scrollListUp (prevIndex) {
    const ul = ReactDOM.findDOMNode(this.refs.optionList);
    const activeLi = ul.children[prevIndex];
    const heightFromBottom = (this.props.options.length - prevIndex) * activeLi.clientHeight;

    if (heightFromBottom > ul.clientHeight) {
      ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
    }
  },

  _renderScrim () {
    if (this.state.isOpen) {
      return (
        <div className='mx-select-scrim'
        onClick={this._handleScrimClick} style={[styles.scrim, this.props.scrimStyle]} />
      );
    } else {
      return null;
    }
  },

  _renderOptions () {
    if (this.state.isOpen) {
      if (this.props.children) {
        return (
          <div className='mx-select-options' style={[styles.options, this.props.optionsStyle]}>
            {this.props.children}
          </div>
        );
      } else {
        return (
          <ul className='mx-select-options' ref='optionList' style={[styles.options, this.props.optionsStyle]}>
            {this.props.options.map(option => {
              return (
                <li
                  className='mx-select-option'
                  key={option.displayValue + option.value}
                  onClick={this._handleOptionClick.bind(null, option)}
                  ref={option.displayValue + option.value}
                  style={[styles.option, this.props.optionStyle, option === this.state.highlightedValue && styles.activeItem]}
                >
                {option.displayValue}
                </li>
              );
            })}
          </ul>
        );
      }
    } else {
      return null;
    }
  },

  render () {
    const selected = this.state.selected || this.props.selected || { displayValue: this.props.placeholderText, value: '' };

    return (
      <div className='mx-select' style={[this.props.style, { position: 'relative' }]}>
        <div className='mx-select-custom'
        onClick={this._handleClick}
        onKeyDown={this._handleInputKeyDown}
        style={[styles.component, this.props.dropdownStyle]}
        tabIndex='0'
        >
          {this._renderScrim()}
          <div className='mx-select-selected' key='selected' style={[styles.selected, this.props.selectedStyle]}>
            {selected.displayValue}
            <Icon
              size='20'
              style={styles.caret}
              type={this.state.isOpen ? 'caret-up' : 'caret-down'}
            />
          </div>
          {this.props.options.length || this.props.children ? this._renderOptions() : null}
        </div>

        {isMobile ? (
          <select className='mx-select-default' onChange={this._handleSelectChange} ref='defaultSelect' style={styles.select} value={selected.value}>
            {this.props.options.map(option => {
              return (<option key={option.displayValue + option.value} value={option.value}>{option.displayValue}</option>);
            })}
          </select>
        ) : null }
      </div>
    );
  }
});

const styles = {
  caret: {
    color: '#CCCCCC',
    cursor: 'pointer',
    position: 'absolute',
    right: '-5px',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  component: {
    backgroundColor: '#FFFFFF',
    borderRadius: '3px',
    border: '1px solid #E5E5E5',
    cursor: 'pointer',
    fontFamily: StyleConstants.FontFamily,
    fontSize: StyleConstants.FontSizes.MEDIUM,
    padding: '11px 10px 12px',
    position: 'relative',
    appearance: 'none',
    WebkitAppearance: 'none',
    boxSizing: 'border-box',
    outline: 'none'
  },
  select: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    WebkitAppearance: 'none',
    opacity: 0
  },
  selected: {
    position: 'relative'
  },
  activeItem: {
    backgroundColor: StyleConstants.Colors.PRIMARY,
    color: StyleConstants.Colors.WHITE
  },
  invalid: {
    borderColor: StyleConstants.Colors.STRAWBERRY
  },
  options: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '0 0 3px 3px',
    left: '-1px',
    right: '-1px',
    margin: '10px 0 0 0',
    padding: '0',
    minWidth: '100%',
    position: 'absolute',
    zIndex: 10,
    fontSize: '12px',
    boxShadow: '0 30px 30px 10px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
    maxHeight: '260px',
    overflow: 'auto'
  },
  option: {
    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    padding: '10px',
    whiteSpace: 'nowrap',

    ':hover': {
      color: StyleConstants.Colors.WHITE
    }
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

module.exports = Radium(Select);
