'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var Input = require('./SimpleInput');

var SearchInput = React.createClass({
  displayName: 'SearchInput',

  propTypes: {
    baseColor: React.PropTypes.string,
    focusOnLoad: React.PropTypes.bool,
    handleResetClick: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    searchKeyword: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onBlur: function onBlur() {},
      onChange: function onChange() {},
      placeholder: 'Search'
    };
  },
  render: function render() {
    var styles = this.styles();

    return React.createElement(
      'div',
      { style: _extends({}, styles.component, this.props.style) },
      React.createElement(Input, {
        baseColor: this.props.baseColor,
        elementProps: {
          onBlur: this.props.onBlur,
          onChange: this.props.onChange,
          placeholder: this.props.placeholder,
          type: 'text',
          value: this.props.searchKeyword
        },
        focusOnLoad: this.props.focusOnLoad,
        handleResetClick: this.props.handleResetClick,
        icon: 'search',
        resetClick: this.props.handleResetClick,
        rightIcon: 'close-solid'
      })
    );
  },
  styles: function styles() {
    return {
      component: {
        display: 'inline-block',
        width: '100%'
      }
    };
  }
});

module.exports = SearchInput;