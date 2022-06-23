const React = require('react');

const ButtonGroup = require('../ButtonGroup');
const Tabbable = require('./Tabbable');

const StyleUtils = require('../../utils/Style');

const PillTabs = ({
  activeTabStyles,
  onTabSelect,
  selectedTab,
  style,
  tabs,
  theme
}) => {
  const mergedTheme = StyleUtils.mergeTheme(theme);
  const styles = {
    component: {
      padding: mergedTheme.Spacing.SMALL
    },
    tab: {
      backgroundColor: mergedTheme.Colors.GRAY_100,
      borderColor: mergedTheme.Colors.GRAY_300,
      outline: 'none',

      '&:hover': {
        backgroundColor: mergedTheme.Colors.PRIMARY,
        color: mergedTheme.Colors.WHITE,
        fill: mergedTheme.Colors.WHITE
      },
      '&:focus': {
        backgroundColor: mergedTheme.Colors.PRIMARY,
        color: mergedTheme.Colors.WHITE,
        fill: mergedTheme.Colors.WHITE
      },
      '&:active': {
        backgroundColor: StyleUtils.adjustColor(mergedTheme.Colors.PRIMARY, -15)
      }
    },
    selected: Object.assign({
      backgroundColor: mergedTheme.Colors.WHITE,
      color: mergedTheme.Colors.PRIMARY,
      cursor: 'default',

      '&:hover': {
        backgroundColor: 'transparent'
      },
      '&:focus': {
        backgroundColor: mergedTheme.Colors.WHITE,
        color: mergedTheme.Colors.PRIMARY
      },
      '&:active': {
        backgroundColor: 'transparent'
      }
    }, activeTabStyles)
  };

  return (
    <div className='mx-pill-tabs' style={Object.assign({}, styles.component, style)}>
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
};

PillTabs.propTypes = Tabbable.propTypes;

module.exports = Tabbable(PillTabs);
