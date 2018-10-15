"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var React = require('react');

var PropTypes = require('prop-types');

var _pick = require('lodash/pick');

var PillTabs = require('./tabs/PillTabs');

var StandardTabs = require('./tabs/StandardTabs');

var Tabbable = require('./tabs/Tabbable');

var TabsTypes = {
  standard: StandardTabs,
  pill: PillTabs
};

var TabsFactory = function TabsFactory(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'standard' : _ref$type,
      props = _objectWithoutProperties(_ref, ["type"]);

  var tabsProps = _pick(props, Object.keys(Tabbable.propTypes));

  var TabsComponent = TabsTypes[type];
  if (!TabsComponent) throw new Error("Unknown Tabs type: ".concat(type));
  return React.createElement(TabsComponent, tabsProps);
};

TabsFactory.propTypes = _extends({
  type: PropTypes.oneOf(Object.keys(TabsTypes))
}, Tabbable.PropTypes);
module.exports = TabsFactory;