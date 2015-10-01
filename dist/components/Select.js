'use strict';

var React = require('react');
var Radium = require('radium');

var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var Select = React.createClass({
  displayName: 'Select',

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

  getDefaultProps: function getDefaultProps() {
    return {
      isMobile: false,
      onChange: function onChange() {},
      options: [],
      placeholderText: 'Select One',
      selected: false,
      valid: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      isOpen: false,
      selected: false
    };
  },

  _handleBlur: function _handleBlur() {
    this.setState({
      isOpen: false
    });
  },

  _handleToggle: function _handleToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  _handleOptionClick: function _handleOptionClick(option) {
    this.setState({
      selected: option,
      isOpen: false
    });

    this.props.onChange(option);
  },

  _handleSelectChange: function _handleSelectChange(e) {
    var selectedOption = this.props.options.filter(function (option) {
      return option.value + '' === e.target.value;
    })[0];

    this._handleOptionClick(selectedOption);
  },

  _renderOptions: function _renderOptions() {
    var _this = this;

    if (this.state.isOpen) {
      if (this.props.children) {
        return React.createElement(
          'div',
          { style: [styles.options, this.props.optionsStyle] },
          this.props.children
        );
      } else {
        return React.createElement(
          'ul',
          { style: [styles.options, this.props.optionsStyle] },
          this.props.options.map(function (option) {
            return React.createElement(
              'li',
              {
                key: option.displayValue + option.value,
                onClick: _this._handleOptionClick.bind(null, option),
                ref: option.displayValue + option.value,
                style: [styles.option, _this.props.optionStyle]
              },
              option.displayValue
            );
          })
        );
      }
    }
  },

  _renderScrim: function _renderScrim() {
    if (this.state.isOpen) {
      return React.createElement('div', { onClick: this._handleBlur, style: [styles.scrim, this.props.scrimStyle] });
    }
  },

  _renderSelect: function _renderSelect() {
    var selected = this.state.selected || this.props.selected || { displayValue: this.props.placeholderText, value: '' };

    if (this.props.isMobile) {
      //TODO: We should always have a select present, just hidden. If mobile, we just utilize it to display the native select options
      return React.createElement(
        'select',
        { name: 'select', onChange: this._handleSelectChange, style: styles.select, value: selected.value },
        this.props.options.map(function (option) {
          return React.createElement(
            'option',
            { key: option.displayValue + option.value, value: option.value },
            option.displayValue
          );
        })
      );
    } else {
      return React.createElement(
        'div',
        {
          onBlur: this._handleBlur,
          onClick: this._handleToggle,
          style: [styles.component, this.props.style],
          tabIndex: '0'
        },
        this._renderScrim(),
        React.createElement(
          'div',
          { key: 'selected', style: [styles.selected, this.props.selectedStyle] },
          selected.displayValue,
          React.createElement(Icon, {
            size: '20',
            style: [styles.downArrow, this.props.selectedStyle && { color: this.props.selectedStyle.color }],
            type: this.state.isOpen ? 'caret-up' : 'caret-down'
          })
        ),
        this._renderOptions()
      );
    }
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      this._renderSelect()
    );
  }
});

var styles = {
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