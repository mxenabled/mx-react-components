"use strict";

var _this = void 0;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var React = require('react');

var ButtonGroup = require('../ButtonGroup');

var Tabbable = require('./Tabbable');

var StyleUtils = require('../../utils/Style');

var PillTabs = function PillTabs(_ref) {
  var activeTabStyles = _ref.activeTabStyles,
      onTabSelect = _ref.onTabSelect,
      selectedTab = _ref.selectedTab,
      style = _ref.style,
      tabs = _ref.tabs,
      theme = _ref.theme;
  var mergedTheme = StyleUtils.mergeTheme(theme);
  var styles = {
    component: {
      padding: mergedTheme.Spacing.SMALL
    },
    tab: {
      backgroundColor: mergedTheme.Colors.GRAY_100,
      borderColor: mergedTheme.Colors.GRAY_300,
      outline: 'none',
      ':hover': {
        backgroundColor: mergedTheme.Colors.PRIMARY,
        color: mergedTheme.Colors.WHITE,
        fill: mergedTheme.Colors.WHITE
      },
      ':focus': {
        backgroundColor: mergedTheme.Colors.PRIMARY,
        color: mergedTheme.Colors.WHITE,
        fill: mergedTheme.Colors.WHITE
      },
      ':active': {
        backgroundColor: StyleUtils.adjustColor(mergedTheme.Colors.PRIMARY, -15)
      }
    },
    selected: _extends({
      backgroundColor: mergedTheme.Colors.WHITE,
      color: mergedTheme.Colors.PRIMARY,
      cursor: 'default',
      ':hover': {
        backgroundColor: 'transparent'
      },
      ':focus': {
        backgroundColor: mergedTheme.Colors.WHITE,
        color: mergedTheme.Colors.PRIMARY
      },
      ':active': {
        backgroundColor: 'transparent'
      }
    }, activeTabStyles)
  };
  return React.createElement("div", {
    className: "mx-pill-tabs",
    style: _extends({}, styles.component, style)
  }, React.createElement(ButtonGroup, {
    buttons: tabs.map(function (tab, index) {
      return {
        'aria-label': tab,
        onClick: selectedTab === index ? null : onTabSelect.bind(_this, index),
        style: _extends({}, styles.tab, selectedTab === index && styles.selected),
        text: tab
      };
    }),
    style: styles.buttonGroup,
    type: "neutral"
  }));
};

PillTabs.propTypes = Tabbable.propTypes;
module.exports = Tabbable(PillTabs);