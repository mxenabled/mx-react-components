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
  const styles = {
    component: {
      padding: theme.Spacing.SMALL
    },
    tab: {
      backgroundColor: theme.Colors.GRAY_100,
      borderColor: theme.Colors.GRAY_300,
      outline: 'none',

      ':hover': {
        backgroundColor: theme.Colors.PRIMARY,
        color: theme.Colors.WHITE,
        fill: theme.Colors.WHITE
      },
      ':focus': {
        backgroundColor: theme.Colors.PRIMARY,
        color: theme.Colors.WHITE,
        fill: theme.Colors.WHITE
      },
      ':active': {
        backgroundColor: StyleUtils.adjustColor(theme.Colors.PRIMARY, -15)
      }
    },
    selected: Object.assign({
      backgroundColor: theme.Colors.WHITE,
      color: theme.Colors.PRIMARY,
      cursor: 'default',

      ':hover': {
        backgroundColor: 'transparent'
      },
      ':focus': {
        backgroundColor: theme.Colors.WHITE,
        color: theme.Colors.PRIMARY
      },
      ':active': {
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
