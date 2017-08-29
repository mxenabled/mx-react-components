const React = require('react');
const PropTypes = require('prop-types');
const _pick = require('lodash/pick');

const PillTabs = require('./tabs/PillTabs');
const StandardTabs = require('./tabs/StandardTabs');

const TabsTypes = {
  standard: StandardTabs,
  pill: PillTabs
};

const TabsFactory = ({ type = 'standard', useTabsInMobile, ...props }) => {
  if (typeof useTabsInMobile !== 'undefined') {
    console.warn('The useTabsInMobile prop is deprecated and will be removed in a future release.');
  }

  const tabsProps = _pick(props, Object.keys(StandardTabs.propTypes));
  const TabsComponent = TabsTypes[type];

  if (!TabsComponent) throw new Error(`Unknown Tabs type: ${type}`);

  return (
    <TabsComponent {...tabsProps} />
  );
};

TabsFactory.propTypes = {
  type: PropTypes.oneOf(Object.keys(TabsTypes)),
  useTabsInMobile: PropTypes.bool // deprecated
};

module.exports = TabsFactory;
