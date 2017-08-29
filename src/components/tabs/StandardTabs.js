const React = require('react');

const Tab = require('./Tab');
const Tabbable = require('./Tabbable');

const StyleConstants = require('../../constants/Style');

const StandardTabs = ({
  activeTabStyles,
  brandColor = StyleConstants.Colors.PRIMARY,
  onTabSelect,
  selectedTab,
  style,
  tabs
}) => (
  <div style={style}>
    {tabs.map((tab, index) => (
      <Tab
        brandColor={brandColor}
        isActive={selectedTab === index}
        key={tab}
        onClick={onTabSelect.bind(null, index)}
        styles={{ activeTab: activeTabStyles }}
      >
        {tab}
      </Tab>
    ))}
  </div>
);

StandardTabs.propTypes = Tabbable.propTypes;

module.exports = Tabbable(StandardTabs);
