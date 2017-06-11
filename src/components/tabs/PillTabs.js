const React = require('react');

const ButtonGroup = require('../ButtonGroup');
const Tabbable = require('./Tabbable');

const StyleConstants = require('../../constants/Style');

const PillTabs = Tabbable(({
  activeTabStyles,
  brandColor = StyleConstants.Colors.PRIMARY,
  onTabSelect,
  selectedTab,
  style,
  tabs
}) => {
  const styles = {
    component: {
      padding: StyleConstants.Spacing.SMALL
    },
    tab: {
      backgroundColor: StyleConstants.Colors.PORCELAIN,
      borderColor: StyleConstants.Colors.FOG,
      outline: 'none',

      ':hover': {
        backgroundColor: brandColor,
        color: StyleConstants.Colors.WHITE,
        fill: StyleConstants.Colors.WHITE
      },
      ':focus': {
        backgroundColor: brandColor,
        color: StyleConstants.Colors.WHITE,
        fill: StyleConstants.Colors.WHITE
      },
      ':active': {
        backgroundColor: StyleConstants.adjustColor(brandColor, -15)
      }
    },
    selected: Object.assign({
      backgroundColor: StyleConstants.Colors.WHITE,
      color: brandColor,
      cursor: 'default',

      ':hover': {
        backgroundColor: 'transparent'
      },
      ':focus': {
        backgroundColor: StyleConstants.Colors.WHITE,
        color: brandColor
      },
      ':active': {
        backgroundColor: 'transparent'
      }
    }, activeTabStyles)
  };

  return (
    <div style={Object.assign({}, styles.component, style)}>
      <ButtonGroup
        buttons={tabs.map((tab, index) => ({
          'aria-label': tab,
          onClick: (selectedTab === index ? null : onTabSelect.bind(this, index)),
          style: Object.assign({}, styles.tab, selectedTab === index && styles.selected),
          text: tab
        }))}
        style={styles.buttonGroup}
        type='neutral'
      />
    </div>
  );
});

module.exports = PillTabs;
