const React = require('react');
const PropTypes = require('prop-types');
const _pick = require('lodash/pick');

const PillTabs = require('./tabs/PillTabs');
const StandardTabs = require('./tabs/StandardTabs');
const Tabbable = require('./tabs/Tabbable');

const TabsTypes = {
  standard: StandardTabs,
  pill: PillTabs
};

const TabsFactory = ({ type = 'standard', ...props }) => {
  const tabsProps = _pick(props, Object.keys(Tabbable.propTypes));
  const TabsComponent = TabsTypes[type];

  if (!TabsComponent) throw new Error(`Unknown Tabs type: ${type}`);

  return (
    <TabsComponent {...tabsProps} />
  );
};

TabsFactory.propTypes = Object.assign({
  type: PropTypes.oneOf(Object.keys(TabsTypes))
}, Tabbable.PropTypes);

module.exports = TabsFactory;
