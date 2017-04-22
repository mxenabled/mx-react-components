'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Radium = require('radium');
var _merge = require('lodash/merge');

var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var SimpleSelect = React.createClass({
  displayName: 'SimpleSelect',

  propTypes: {
    hoverColor: React.PropTypes.string,
    iconSize: React.PropTypes.number,
    iconStyles: React.PropTypes.object,
    items: React.PropTypes.array.isRequired,
    itemStyles: React.PropTypes.object,
    menuStyles: React.PropTypes.object,
    onScrimClick: React.PropTypes.func,
    scrimClickOnSelect: React.PropTypes.bool,
    style: React.PropTypes.object,
    styles: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      scrimClickOnSelect: false,
      hoverColor: StyleConstants.Colors.PRIMARY,
      items: [],
      onScrimClick: function onScrimClick() {}
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.style) {
      console.warn('The style prop is deprecated and will be removed in a future release. Please use styles.');
    }

    if (this.props.iconStyles) {
      console.warn('The iconStyles prop is deprecated and will be removed in a future release. Please use styles.');
    }

    if (this.props.menuStyles) {
      console.warn('The menuStyles prop is deprecated and will be removed in a future release. Please use styles.');
    }
  },
  _handleItemClick: function _handleItemClick(item, e) {
    if (this.props.scrimClickOnSelect) {
      this.props.onScrimClick(e);
    }

    item.onClick(e);
  },
  render: function render() {
    var _this = this;

    var styles = this.styles();

    return React.createElement(
      'div',
      { style: styles.component },
      React.createElement(
        'div',
        { style: styles.menu },
        this.props.children ? this.props.children : this.props.items.map(function (item, i) {
          return React.createElement(
            'div',
            {
              key: i,
              onClick: _this._handleItemClick.bind(null, item),
              style: styles.item
            },
            item.icon ? React.createElement(Icon, { size: _this.props.iconSize || 20, style: styles.icon, type: item.icon }) : null,
            React.createElement(
              'div',
              { style: styles.text },
              item.text
            )
          );
        })
      ),
      React.createElement('div', { onClick: this.props.onScrimClick, style: styles.scrim })
    );
  },
  styles: function styles() {
    return _merge({}, {
      component: _extends({
        height: 0,
        position: 'relative'
      }, this.props.style),

      menu: _extends({}, {
        alignSelf: 'stretch',
        backgroundColor: StyleConstants.Colors.WHITE,
        borderRadius: 3,
        boxShadow: StyleConstants.ShadowHigh,
        boxSizing: 'border-box',
        color: StyleConstants.Colors.CHARCOAL,
        display: 'flex',
        flexDirection: 'column',
        fill: StyleConstants.Colors.CHARCOAL,
        fontFamily: StyleConstants.FontFamily,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        top: 10,
        position: 'absolute',
        zIndex: 10
      }, this.props.menuStyles),

      item: _extends({}, {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        height: 40,
        padding: StyleConstants.Spacing.MEDIUM,

        ':hover': {
          backgroundColor: this.props.hoverColor,
          color: StyleConstants.Colors.WHITE,
          cursor: 'pointer',
          fill: StyleConstants.Colors.WHITE
        }
      }, this.props.itemStyles),
      icon: _extends({}, {
        marginRight: StyleConstants.Spacing.SMALL
      }, this.props.iconStyles),
      text: {
        whiteSpace: 'nowrap'
      },
      scrim: {
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 9
      }
    }, this.props.styles);
  }
});

module.exports = Radium(SimpleSelect);