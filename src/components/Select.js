const React = require('react');
const Radium = require('radium');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const Select = React.createClass({
  propTypes: {
    isMobile: React.PropTypes.bool,
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
      isMobile: false,
      onChange () {},
      options: [],
      placeholderText: 'Select One',
      selected: false,
      valid: true
    };
  },

  getInitialState () {
    return {
      isOpen: false,
      selected: false
    };
  },

  _handleBlur () {
    this.setState({
      isOpen: false
    });
  },

  _handleToggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  _handleOptionClick (option) {
    this.setState({
      selected: option,
      isOpen: false
    });

    this.props.onChange(option);
  },

  _handleSelectChange (e) {
    const selectedOption = this.props.options.filter(option => {
      return option.value + '' === e.target.value;
    })[0];

    this._handleOptionClick(selectedOption);
  },

  _renderOptions () {
    if (this.state.isOpen) {
      if (this.props.children) {
        return (
          <div style={[styles.options, this.props.optionsStyle]}>
            {this.props.children}
          </div>
        );
      } else {
        return (
          <ul style={[styles.options, this.props.optionsStyle]}>
            {this.props.options.map(option => {
              return (
                <li
                  key={option.displayValue + option.value}
                  onClick={this._handleOptionClick.bind(null, option)}
                  ref={option.displayValue + option.value}
                  style={[styles.option, this.props.optionStyle]}
                >
                {option.displayValue}
                </li>
              );
            })}
          </ul>
        );
      }
    }
  },

  _renderScrim () {
    if (this.state.isOpen) {
      return (
        <div onClick={this._handleBlur} style={[styles.scrim, this.props.scrimStyle]} />
      );
    }
  },

  _renderSelect () {
    const selected = this.state.selected || this.props.selected || { displayValue: this.props.placeholderText, value: '' };

    if (this.props.isMobile) {
      //TODO: We should always have a select present, just hidden. If mobile, we just utilize it to display the native select options
      return (
        <select name='select' onChange={this._handleSelectChange} style={styles.select} value={selected.value}>
          {this.props.options.map(option => {
            return (<option key={option.displayValue + option.value} value={option.value}>{option.displayValue}</option>);
          })}
        </select>
      );
    } else {
      return (
        <div
          onBlur={this._handleBlur}
          onClick={this._handleToggle}
          style={[styles.component, this.props.style]}
          tabIndex='0'
        >
          {this._renderScrim()}
          <div key='selected' style={[styles.selected, this.props.selectedStyle]}>
            {selected.displayValue}
            <Icon
              size='20'
              style={[styles.downArrow, this.props.selectedStyle && { color: this.props.selectedStyle.color }]}
              type={this.state.isOpen ? 'caret-up' : 'caret-down'}
            />
          </div>
          {this._renderOptions()}
        </div>
      );
    }
  },

  render () {
    return (
      <div>
        {this._renderSelect()}
      </div>
    );
  }
});

const styles = {
  component: {
    backgroundColor: '#FFFFFF',
    borderRadius: '3px',
    border: '1px solid #E5E5E5',
    cursor: 'pointer',
    fontFamily: StyleConstants.FontFamily,
    fontSize: StyleConstants.FontSize,
    padding: '11px 10px 12px',
    position: 'relative',
    WebkitAppearance: 'none',
    boxSizing: 'border-box',
    outline: 'none'
  },
  select: {
    outline: 'none !important'
  },
  selected: {
    position: 'relative'
  },
  downArrow: {
    color: StyleConstants.Colors.FONT,
    position: 'absolute',
    right: '-5px',
    top: '50%',
    marginTop: '-10px'
  },
  invalid: {
    borderColor: StyleConstants.Colors.RED
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
    opacity: 0.4,

    ':hover': {
      backgroundColor: StyleConstants.Colors.PRIMARY,
      color: StyleConstants.Colors.INVERSE_PRIMARY,
      opacity: 1
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