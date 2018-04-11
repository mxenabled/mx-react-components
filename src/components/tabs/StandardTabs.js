const React = require('react');

const Tab = require('./Tab');
const Tabbable = require('./Tabbable');

const StandardTabs = ({
  activeTabStyles,
  onTabSelect,
  selectedTab,
  style,
  tabs,
  theme
}) => (
  <div style={style}>
    {tabs.map((tab, index) => (
      <Tab
        isActive={selectedTab === index}
        key={tab}
        onClick={onTabSelect.bind(null, index)}
        styles={{ activeTab: activeTabStyles }}
        theme={theme}
      >
        {tab}
      </Tab>
    ))}
  </div>
);

StandardTabs.propTypes = Tabbable.propTypes;

module.exports = Tabbable(StandardTabs);
