const _isEqual = require('lodash/isEqual');
const React = require('react');
const ReactDOM = require('react-dom');
const Radium = require('radium');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const Select = React.createClass({
  propTypes: {
    dropdownStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    onChange: React.PropTypes.func,
    options: React.PropTypes.array,
    optionsStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    optionStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    optionTextStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    placeholderText: React.PropTypes.string,
    primaryColor: React.PropTypes.string,
    scrimStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    selected: React.PropTypes.object,
    selectedStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    valid: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      primaryColor: StyleConstants.Colors.PRIMARY,
      onChange () {},
      options: [],
      placeholderText: 'Select One',
      valid: true
    };
  },

  getInitialState () {
    return {
      highlightedValue: null,
      isOpen: false,
      selected: false,
      hoverItem: null
    };
  },

  getBackgroundColor (option) {
    if (option.value === this.state.hoverItem) {
      return {
        backgroundColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE,
        fill: StyleConstants.Colors.WHITE
      };
    } else {
      return null;
    }
  },

  _handleScrimClick () {
    this.setState({
      isOpen: false,
      highlightedValue: null,
      hoverItem: null
    });
  },

  _handleClick () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  _handleOptionClick (option) {
    this.setState({
      selected: option,
      isOpen: false,
      highlightedValue: option,
      hoverItem: null
    });

    this.props.onChange(option);
  },

  _handleOptionMouseOver (option) {
    this.setState({
      hoverItem: option.value
    });
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
    const ul = ReactDOM.findDOMNode(this.optionList);
    const activeLi = ul.children[nextIndex];
    const heightFromTop = nextIndex * activeLi.clientHeight;

    if (heightFromTop > ul.clientHeight) {
      ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
    }
  },

  _scrollListUp (prevIndex) {
    const ul = ReactDOM.findDOMNode(this.optionList);
    const activeLi = ul.children[prevIndex];
    const heightFromBottom = (this.props.options.length - prevIndex) * activeLi.clientHeight;

    if (heightFromBottom > ul.clientHeight) {
      ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
    }
  },

  _renderScrim () {
    if (this.state.isOpen) {
      const styles = this.styles();

      return (
        <div
          className='mx-select-scrim'
          onClick={this._handleScrimClick}
          style={[styles.scrim, this.props.scrimStyle]}
        />
      );
    } else {
      return null;
    }
  },

  _renderOptions () {
    if (this.state.isOpen) {
      const styles = this.styles();

      if (this.props.children) {
        return (
          <div className='mx-select-options' style={styles.options}>
            {this.props.children}
          </div>
        );
      } else {
        return (
          <ul className='mx-select-options' ref={(ref) => this.optionList = ref} style={styles.options}>
            {this.props.options.map(option => {
              return (
                <li
                  className='mx-select-option'
                  key={option.displayValue + option.value}
                  onClick={this._handleOptionClick.bind(null, option)}
                  onMouseOver={this._handleOptionMouseOver.bind(null, option)}
                  style={Object.assign({},
                    styles.option,
                    this.props.optionStyle,
                    _isEqual(option, this.state.highlightedValue) ? styles.activeItem : null,
                    this.getBackgroundColor(option)
                  )}
                >
                  {option.icon ? (
                    <Icon
                      size={20}
                      style={styles.optionIcon}
                      type={option.icon}
                    />
                  ) : null}
                  <div style={styles.optionText}>{option.displayValue}</div>
                  {_isEqual(option, this.state.highlightedValue) ? <Icon size={20} type='check' /> : null }
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
    const styles = this.styles();
    const selected = this.state.selected || this.props.selected || { displayValue: this.props.placeholderText, value: '' };

    return (
      <div className='mx-select' style={Object.assign({}, this.props.style, { position: 'relative' })}>
        <div className='mx-select-custom'
          onClick={this._handleClick}
          onKeyDown={this._handleInputKeyDown}
          style={styles.component}
          tabIndex='0'
        >
          {this._renderScrim()}
          <div className='mx-select-selected' key='selected' style={styles.selected}>
            {selected.icon ? (
              <Icon
                size={20}
                style={styles.optionIcon}
                type={selected.icon}
              />
            ) : null}
            <div style={styles.optionText}>{selected.displayValue}</div>
            <Icon
              size={20}
              type={this.state.isOpen ? 'caret-up' : 'caret-down'}
            />
          </div>
          {this.props.options.length || this.props.children ? this._renderOptions() : null}
        </div>
      </div>
    );
  },

  styles () {
    return {
      component: Object.assign({},
        {
          backgroundColor: StyleConstants.Colors.WHITE,
          borderRadius: 3,
          border: '1px solid ' + StyleConstants.Colors.FOG,
          cursor: 'pointer',
          fontFamily: StyleConstants.FontFamily,
          fontSize: StyleConstants.FontSizes.MEDIUM,
          padding: '8px 10px',
          position: 'relative',
          boxSizing: 'border-box',
          outline: 'none'
        }, this.props.dropdownStyle),
      select: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        opacity: 0
      },
      selected: Object.assign({},
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative'
        }, this.props.selectedStyle),
      activeItem: {
        fill: this.props.primaryColor,
        color: this.props.primaryColor
      },
      invalid: {
        borderColor: StyleConstants.Colors.STRAWBERRY
      },
      options: Object.assign({},
        {
          backgroundColor: StyleConstants.Colors.WHITE,
          border: '1px solid ' + StyleConstants.Colors.FOG,
          borderRadius: '0 0 3px 3px',
          left: -1,
          right: -1,
          marginTop: 10,
          padding: 0,
          minWidth: '100%',
          position: 'absolute',
          zIndex: 10,
          fontSize: 12,
          boxShadow: StyleConstants.ShadowHigh,
          boxSizing: 'border-box',
          maxHeight: 260,
          overflow: 'auto'
        }, this.props.optionsStyle),
      option: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: StyleConstants.Colors.WHITE,
        padding: 10,
        whiteSpace: 'nowrap'
      },
      optionIcon: {
        marginRight: 5
      },
      optionText: Object.assign({},
        {
          flex: '1 0 0%'
        }, this.props.optionTextStyle),
      scrim: {
        position: 'fixed',
        zIndex: 9,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    };
  }
});


module.exports = Radium(Select);
