const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const _pick = require('lodash/pick');

const ButtonGroup = require('./ButtonGroup');
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

class TabWithoutRadium extends React.Component {
  static propTypes = {
    activeTabStyles: PropTypes.object,
    brandColor: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    styles: PropTypes.object
  }

  static defaultProps = {
    isActive: false,
    onClick: () => {},
    styles: {}
  }

  render () {
    const styles = this.styles();
    let style = Object.assign({}, styles.tab, this.props.styles.tab);

    if (this.props.isActive)
      style = Object.assign({}, style, styles.activeTab, this.props.styles.activeTab);

    return (
      <span onClick={this.props.onClick} style={style}>
        {this.props.children}
      </span>
    );
  }

  styles = () => {
    return {
      tab: {
        boxSizing: 'border-box',
        color: StyleConstants.Colors.ASH,
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        fontStyle: StyleConstants.Fonts.SEMIBOLD,
        padding: StyleConstants.Spacing.MEDIUM,
        whiteSpace: 'nowrap',

        ':hover': {
          color: StyleConstants.Colors.CHARCOAL
        }
      },
      activeTab: Object.assign({
        cursor: 'default',
        color: this.props.brandColor,
        borderBottom: '2px solid ' + this.props.brandColor,

        ':hover': {
          color: this.props.brandColor
        }
      }, this.props.activeTabStyles)
    };
  }
}

const Tab = Radium(TabWithoutRadium);

/**
 * Common state management and definition of props for Tabs components.
 */
const Tabbable = (TabsComponent) => {
  return class extends React.Component { // eslint-disable-line react/display-name
    static propTypes = {
      activeTabStyles: PropTypes.object,
      brandColor: PropTypes.string,
      onTabSelect: PropTypes.func.isRequired,
      selectedTab: PropTypes.number,
      tabs: PropTypes.array.isRequired
    };

    static defaultProps = {
      selectedTab: 0
    };

    constructor (props) {
      super(props);

      this.state = {
        selectedTab: this.props.selectedTab
      };
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.selectedTab !== this.state.selectedTab) {
        this.setState({
          selectedTab: nextProps.selectedTab
        });
      }
    }

    handleTabSelect (selectedTab) {
      this.props.onTabSelect(selectedTab);

      this.setState({
        selectedTab
      });
    }

    render () {
      return <TabsComponent {...this.props} />;
    }
  };
};

const StandardTabs = Tabbable(({
  activeTabStyles,
  brandColor = StyleConstants.Colors.PRIMARY,
  onTabSelect,
  selectedTab,
  tabs
}) => (
  <div>
    {tabs.map((tab, index) =>
      <Tab
        brandColor={brandColor}
        isActive={selectedTab === index}
        key={tab}
        onClick={onTabSelect.bind(null, index)}
        styles={{ activeTab: activeTabStyles }}
      >
        {tab}
      </Tab>
      )}
  </div>
));

const PillTabs = Tabbable(({
  activeTabStyles,
  brandColor = StyleConstants.Colors.PRIMARY,
  onTabSelect,
  selectedTab,
  tabs
}) => {
  const styles = {
    component: {
      margin: StyleConstants.Spacing.SMALL
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
    <div style={styles.component}>
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
