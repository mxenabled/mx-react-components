'use strict';

var React = require('react');
var Radium = require('radium');

var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var SelectFullScreen = React.createClass({
  displayName: 'SelectFullScreen',

  propTypes: {
    closeIcon: React.PropTypes.string,
    isFixed: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    optionFormatter: React.PropTypes.func,
    options: React.PropTypes.array,
    optionsHeaderText: React.PropTypes.string,
    optionsStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    optionStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
    placeholderText: React.PropTypes.string,
    selected: React.PropTypes.object,
    selectedStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      closeIcon: 'close',
      isFixed: false,
      onChange: function onChange() {},
      optionFormatter: function optionFormatter(option) {
        return React.createElement(
          'div',
          { key: option.displayValue + option.value + '_value', style: styles.option },
          option.displayValue
        );
      },

      options: [],
      optionsHeaderText: 'Select An Option',
      placeholderText: 'Select One',
      selected: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      isOpen: false,
      selected: false
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    window.onkeyup = function (e) {
      if (e.keyCode === 27) {
        _this._handleCloseClick();
      }
    };
  },
  _handleClick: function _handleClick() {
    this.setState({
      isOpen: true
    });
  },
  _handleCloseClick: function _handleCloseClick() {
    this.setState({
      isOpen: false
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
    var _this2 = this;

    if (this.state.isOpen) {
      return React.createElement(
        'div',
        { style: [styles.optionsScrim, this.props.isFixed && { position: 'fixed' }] },
        React.createElement(
          'div',
          { onClick: this._handleCloseClick, style: styles.close },
          React.createElement(Icon, {
            size: 20,
            style: styles.closeIcon,
            type: this.props.closeIcon
          }),
          React.createElement(
            'div',
            { style: styles.closeText },
            'ESC'
          )
        ),
        React.createElement(
          'div',
          { style: styles.content },
          React.createElement(
            'div',
            { style: styles.optionsHeader },
            this.props.optionsHeaderText
          ),
          React.createElement(
            'div',
            { className: 'mx-select-full-screen-options', style: [styles.optionsWrapper, this.props.optionsStyle] },
            this.props.options.map(function (option) {
              return React.createElement(
                'div',
                {
                  className: 'mx-select-full-screen-option',
                  key: option.displayValue + option.value,
                  onClick: _this2._handleOptionClick.bind(null, option)
                },
                _this2.props.optionFormatter(option)
              );
            })
          )
        )
      );
    } else {
      return null;
    }
  },
  render: function render() {
    var selected = this.state.selected || this.props.selected || { displayValue: this.props.placeholderText, value: '' };

    return React.createElement(
      'div',
      { className: 'mx-select-full-screen', style: [styles.component, this.props.style] },
      React.createElement(
        'div',
        {
          className: 'mx-select-full-screen-selected',
          key: 'selected',
          onClick: this._handleClick,
          style: this.props.selectedStyle
        },
        selected.displayValue
      ),
      this._renderOptions()
    );
  }
});

var styles = {
  close: {
    position: 'absolute',
    right: 20,
    top: 15,
    textAlign: 'center',
    cursor: 'pointer',
    color: StyleConstants.Colors.ASH
  },
  closeIcon: {
    color: StyleConstants.Colors.ASH
  },
  closeText: {
    fontSize: StyleConstants.FontSizes.TINY
  },
  component: {
    cursor: 'pointer',
    fontFamily: StyleConstants.FontFamily,
    fontSize: StyleConstants.FontSizes.LARGE,
    color: StyleConstants.Colors.CHARCOAL,
    boxSizing: 'border-box',
    outline: 'none'
  },
  content: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300
  },
  optionsScrim: {
    backgroundColor: '#fff',
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999
  },
  optionsWrapper: {
    border: '1px solid ' + StyleConstants.Colors.FOG,
    height: 250,
    overflow: 'auto',
    width: 300
  },
  option: {
    cursor: 'pointer',
    backgroundColor: '#fff',
    padding: 10,
    whiteSpace: 'nowrap',
    fontSize: StyleConstants.FontSizes.MEDIUM,

    ':hover': {
      backgroundColor: StyleConstants.Colors.PRIMARY,
      color: StyleConstants.Colors.WHITE,
      opacity: 1
    }
  },
  optionsHeader: {
    color: StyleConstants.Colors.CHARCOAL,
    fontSize: StyleConstants.FontSizes.XXLARGE,
    fontWeight: 'bold',
    paddingBottom: 10
  }
};

module.exports = Radium(SelectFullScreen);