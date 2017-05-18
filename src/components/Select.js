const _isEqual = require('lodash/isEqual');
const keycode = require('keycode');
const PropTypes = require('prop-types');
const Radium = require('radium');
const React = require('react');
const ReactDOM = require('react-dom');

const Icon = require('./Icon');
const { Listbox, Option } = require('./accessibility/Listbox');

const StyleConstants = require('../constants/Style');

class Select extends React.Component {
  static propTypes = {
    dropdownStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    options: PropTypes.array,
    optionsStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    optionStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    optionTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    placeholderText: PropTypes.string,
    primaryColor: PropTypes.string,
    scrimStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    selected: PropTypes.object,
    selectedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valid: PropTypes.bool
  };

  static defaultProps = {
    primaryColor: StyleConstants.Colors.PRIMARY,
    onChange () {},
    options: [],
    placeholderText: 'Select One',
    valid: true
  };

  constructor (props) {
    super(props);

    this.state = {
      isOpen: false,
      selected: props.selected
    };
  }

  _handleKeyDown = (e) => {
    switch (keycode(e)) {
      case 'esc':
        e.preventDefault();
        e.stopPropagation();
        this._close();
        break;
      case 'enter':
      case 'space':
        if (this.state.isOpen) return;
        e.preventDefault();
        e.stopPropagation();
        this._open();
        break;
    }
  };

  _close = () => {
    this.setState({ isOpen: false });
    this.component.focus();
  };

  _open = () => {
    this.setState({ isOpen: true });
  };

  _handleOptionClick = (option, e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ selected: option }, () => {
      this._close();
      this.props.onChange(option);
    });
  };

  _scrollListDown = (nextIndex) => {
    const ul = ReactDOM.findDOMNode(this.optionList);
    const activeLi = ul.children[nextIndex];
    const heightFromTop = nextIndex * activeLi.clientHeight;

    if (heightFromTop > ul.clientHeight) {
      ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
    }
  };

  _scrollListUp = (prevIndex) => {
    const ul = ReactDOM.findDOMNode(this.optionList);
    const activeLi = ul.children[prevIndex];
    const heightFromBottom = (this.props.options.length - prevIndex) * activeLi.clientHeight;

    if (heightFromBottom > ul.clientHeight) {
      ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
    }
  };

  _renderScrim = () => {
    if (this.state.isOpen) {
      const styles = this.styles();

      return (
        <div
          className='mx-select-scrim'
          onClick={this._close}
          style={[styles.scrim, this.props.scrimStyle]}
        />
      );
    } else {
      return null;
    }
  };

  _renderOptions = () => {
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
          <Listbox
            aria-label={this.props.placeholderText}
            className='mx-select-options'
            ref={(ref) => this.optionList = ref}
            style={styles.options}
            useGlobalKeyHandler={true}
          >
            {this.props.options.map(option => {
              return (
                <Option
                  className='mx-select-option'
                  isSelected={option === this.state.selected}
                  key={option.displayValue + option.value}
                  label={option.displayValue}
                  onClick={this._handleOptionClick.bind(null, option)}
                  style={Object.assign({},
                    styles.option,
                    this.props.optionStyle,
                    _isEqual(option, this.state.selected) ? styles.activeOption : null
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
                  {_isEqual(option, this.state.selected) ? <Icon size={20} type='check' /> : null }
                </Option>
              );
            })}
          </Listbox>
        );
      }
    } else {
      return null;
    }
  };

  render () {
    const styles = this.styles();
    const selected = this.state.selected || this.props.selected || { displayValue: this.props.placeholderText, value: '' };

    return (
      <div className='mx-select' style={Object.assign({}, this.props.style, { position: 'relative' })}>
        <div className='mx-select-custom'
          onClick={this._open}
          onKeyDown={this._handleKeyDown}
          ref={ref => this.component = ref}
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
  }

  styles = () => {
    const focusedOption = {
      backgroundColor: this.props.primaryColor,
      color: StyleConstants.Colors.WHITE,
      fill: StyleConstants.Colors.WHITE
    };

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
          boxSizing: 'border-box'
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
          margin: '8px 0 0 0',
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
      activeOption: {
        fill: this.props.primaryColor,
        color: this.props.primaryColor
      },
      option: {
        display: 'flex',
        alignItems: 'center',
        color: StyleConstants.Colors.CHARCOAL,
        cursor: 'pointer',
        backgroundColor: StyleConstants.Colors.WHITE,
        outline: 'none',
        padding: 10,
        whiteSpace: 'nowrap',

        ':focus': focusedOption,
        ':hover': focusedOption
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
  };
}


module.exports = Radium(Select);
