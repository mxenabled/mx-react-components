"use strict";

var React = require('react');

var Tab = require('./Tab');

var Tabbable = require('./Tabbable');

var StandardTabs = function StandardTabs(_ref) {
  var activeTabStyles = _ref.activeTabStyles,
      onTabSelect = _ref.onTabSelect,
      selectedTab = _ref.selectedTab,
      style = _ref.style,
      tabs = _ref.tabs,
      theme = _ref.theme;
  return React.createElement("div", {
    className: "mx-standard-tabs",
    style: style
  }, tabs.map(function (tab, index) {
    return React.createElement(Tab, {
      isActive: selectedTab === index,
      key: tab,
      onClick: onTabSelect.bind(null, index),
      styles: {
        activeTab: activeTabStyles
      },
      theme: theme
    }, tab);
  }));
};

StandardTabs.propTypes = Tabbable.propTypes;
module.exports = Tabbable(StandardTabs);