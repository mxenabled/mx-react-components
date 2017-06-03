const React = require('react');
const PropTypes = require('prop-types');
const _pick = require('lodash/pick');

const PillTabs = require('./tabs/PillTabs');
const StandardTabs = require('./tabs/StandardTabs');

const StyleConstants = require('../constants/Style');

const TabsWrapper = ({ alignment = 'left', showBottomBorder = true, children, style }) => {
  const styles = Object.assign({
    borderBottom: showBottomBorder ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: alignment === 'left' ? 'flex-start' : 'center',
    overflowX: 'scroll',
    width: '100%'
  }, style);

  return <div style={styles}>{children}</div>;
};

TabsWrapper.propTypes = {
  alignment: PropTypes.oneOf(['left', 'center']),
  showBottomBorder: PropTypes.bool
};

const TabsTypes = {
  standard: StandardTabs,
  pill: PillTabs
};

const TabsFactory = ({ type = 'standard', useTabsInMobile, ...props }) => {
  if (typeof useTabsInMobile !== 'undefined') {
    console.warn('The useTabsInMobile prop is deprecated and will be removed in a future release.');
  }

  const wrapperProps = _pick(props, Object.keys(TabsWrapper.propTypes));
  const tabsProps = _pick(props, Object.keys(StandardTabs.propTypes));
  const TabsComponent = TabsTypes[type];

  if (!TabsComponent) throw new Error(`Unknown Tabs type: ${type}`);

  return (
    <TabsWrapper {...wrapperProps}>
      <TabsComponent {...tabsProps} />
    </TabsWrapper>
  );
};

TabsFactory.propTypes = {
  type: PropTypes.oneOf(Object.keys(TabsTypes)),
  useTabsInMobile: PropTypes.bool // deprecated
};

module.exports = TabsFactory;
