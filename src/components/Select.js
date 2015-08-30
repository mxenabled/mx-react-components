const React = require('react');
const Icon = require('./Icon');
const objectAssign = require('object-assign');

const Select = React.createClass({
  propTypes: {
    isMobile: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    optionHoverStyle: React.PropTypes.object,
    options: React.PropTypes.array,
    optionsStyle: React.PropTypes.object,
    optionStyle: React.PropTypes.object,
    placeholderText: React.PropTypes.string,
    scrimStyle: React.PropTypes.object,
    selected: React.PropTypes.object,
    selectedStyle: React.PropTypes.object,
    style: React.PropTypes.object,
    valid: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      isMobile: false,
      onChange () {},
      optionHoverStyle: {},
      options: [],
      optionsStyle: {},
      optionStyle: {},
      placeholderText: 'Select One',
      scrimStyle: {},
      selected: false,
      selectedStyle: {},
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

  _handleOptionMouseEnter (option) {
    const optionEl = React.findDOMNode(this.refs[option.displayValue + option.value]);
    const optionStyle = objectAssign(styles.optionHover, this.props.optionHoverStyle);

    for (const key in optionStyle) {
      if (optionStyle[key]) {
        optionEl.style[key] = optionStyle[key];
      }
    }
  },

  _handleOptionMouseLeave (option) {
    const optionEl = React.findDOMNode(this.refs[option.displayValue + option.value]);
    const optionStyle = objectAssign(styles.option, this.props.optionStyle);

    for (const key in optionStyle) {
      if (optionStyle[key]) {
        optionEl.style[key] = optionStyle[key];
      }
    }
  },

  _handleSelectChange (e) {
    const selectedOption = this.props.options.filter(option => {
      return option.value + '' === e.target.value;
    })[0];

    this._handleOptionClick(selectedOption);
  },

  _getComponentStyles () {
    let componentStyles = objectAssign(styles.component, this.props.style);

    if (!this.props.valid) {
      componentStyles = objectAssign(componentStyles, styles.invalid);
    }

    return componentStyles;
  },

  _getOptionListStyles () {
    const optionListStyles = objectAssign(styles.options, this.props.optionsStyle);

    return optionListStyles;
  },

  _renderOptions () {
    if (this.state.isOpen) {
      if (this.props.children) {
        return (
          <div style={this._getOptionListStyles()}>
            {this.props.children}
          </div>
        );
      } else {
        return (
          <ul style={this._getOptionListStyles()}>
            {this.props.options.map(option => {
              return (
                <li
                  key={option.displayValue + option.value}
                  onClick={this._handleOptionClick.bind(null, option)}
                  onMouseEnter={this._handleOptionMouseEnter.bind(null, option)}
                  onMouseLeave={this._handleOptionMouseLeave.bind(null, option)}
                  ref={option.displayValue + option.value}
                  style={objectAssign(styles.option, this.props.optionStyle)}
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
        <div onClick={this._handleBlur} style={objectAssign(styles.scrim, this.props.scrimStyle)} />
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
          style={this._getComponentStyles()}
          tabIndex='0'
        >
          {this._renderScrim()}
          <div key='selected' style={objectAssign(styles.selected, this.props.selectedStyle)}>
            {selected.displayValue}
            <Icon
              size='20'
              style={styles.downArrow}
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
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '13px',
    padding: '10px',
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
    color: '#999999',
    position: 'absolute',
    right: 0,
    top: '50%',
    marginTop: '-10px'
  },
  invalid: {
    borderColor: 'red'
  },
  options: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '0 0 3px 3px',
    left: '-1px',
    right: '-1px',
    margin: '8px 0 0 0',
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
    opacity: 0.4
  },
  optionHover: {
    backgroundColor: '#f9f9f9',
    opacity: 1
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

module.exports = Select;