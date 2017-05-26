const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');

const ButtonGroup = require('./ButtonGroup');
const Button = require('./Button');
const Icon = require('./Icon');
const SimpleSelect = require('./SimpleSelect');
const StyleConstants = require('../constants/Style');

class StandardTabs extends React.Component {
  static propTypes = {
    activeTabStyles: PropTypes.object,
    brandColor: PropTypes.string,
    onTabSelect: PropTypes.func.isRequired,
    selectedTab: PropTypes.number,
    tabs: PropTypes.array.isRequired
  };

  static defaultProps = {
    brandColor: StyleConstants.Colors.PRIMARY
  };

  constructor (props) {
    super(props);

    this.state = {
      selectedTab: this.props.selectedTab || 0
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
    return (
      <div>
        {this.props.tabs.map((tab, index) =>
          <Tab
            isActive={this.state.selectedTab === index}
            key={tab}
            onClick={this.handleTabSelect.bind(this, index)}
            styles={{ activeTab: this.props.activeTabStyles }}
          >
            {tab}
          </Tab>
        )}
      </div>
    );
  }
}

class TabWithoutRadium extends React.Component {
  static propTypes = {
    activeTabStyles: PropTypes.object,
    brandColor: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    styles: PropTypes.object
  }

  static defaultProps = {
    brandColor: StyleConstants.Colors.PRIMARY,
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

class MenuTabs extends StandardTabs {
  constructor (props) {
    super(props);
    this.state.showMenu = false;
  }

  _toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    }, () => {
      if (!this.state.showMenu) this.component.focus();
    });
  };

  _buildTabItems = () => {
    const tabItems = [];

    this.props.tabs.map((tab, index) => {
      tabItems.push({
        onClick: () => {
          this.handleTabSelect(index);
        },
        text: tab
      });
    });

    return tabItems;
  };

  handleTabSelect (selectedTab) {
    super.handleTabSelect(selectedTab);
    this._toggleMenu();
  }

  render () {
    const selectedTabName = this.props.tabs[this.state.selectedTab];
    const styles = this.styles();
    const tabItems = this._buildTabItems();

    return (
      <Button
        buttonRef={ref => this.component = ref}
        onClick={this._toggleMenu}
        role='button'
        style={styles.menuWrapper}
        tabIndex={0}
        type='neutral'
      >
        {selectedTabName}
        <Icon
          size={20}
          style={{ fill: this.props.brandColor }}
          type={!this.state.showMenu ? 'caret-down' : 'caret-up' }
        />
        {this.state.showMenu ? (
          <SimpleSelect
            hoverColor={this.props.brandColor}
            items={tabItems}
            onScrimClick={this._toggleMenu}
            showItems={this.state.showMenu}
          />
        ) : null}
      </Button>
    );
  }

  styles = () => {
    return {
      menuWrapper: {
        borderColor: 'transparent',
        padding: StyleConstants.Spacing.SMALL,

        ':hover': {
          backgroundColor: 'transparent'
        }
      }
    };
  };
}

class PillTabs extends StandardTabs {
  render () {
    const styles = this.styles();

    return (
      <div style={styles.component}>
        <ButtonGroup
          buttons={this.props.tabs.map((tab, index) => ({
            'aria-label': tab,
            onClick: (this.state.selectedTab === index ? null : this.handleTabSelect.bind(this, index)),
            style: Object.assign({}, styles.tab, this.state.selectedTab === index && styles.selected),
            text: tab
          }))}
          style={styles.buttonGroup}
          type='neutral'
        />
      </div>
    );
  }

  styles = () => {
    return {
      component: {
        margin: StyleConstants.Spacing.SMALL
      },
      tab: {
        backgroundColor: StyleConstants.Colors.PORCELAIN,
        borderColor: StyleConstants.Colors.FOG,
        outline: 'none',

        ':hover': {
          backgroundColor: this.props.brandColor,
          color: StyleConstants.Colors.WHITE,
          fill: StyleConstants.Colors.WHITE
        },
        ':focus': {
          backgroundColor: this.props.brandColor,
          color: StyleConstants.Colors.WHITE,
          fill: StyleConstants.Colors.WHITE
        },
        ':active': {
          backgroundColor: StyleConstants.adjustColor(this.props.brandColor, -15)
        }
      },
      selected: {
        backgroundColor: StyleConstants.Colors.WHITE,
        color: this.props.brandColor,
        cursor: 'default',

        ':hover': {
          backgroundColor: 'transparent'
        },
        ':focus': {
          backgroundColor: StyleConstants.Colors.WHITE,
          color: this.props.brandColor
        },
        ':active': {
          backgroundColor: 'transparent'
        }
      }
    };
  }
}

const TabsTypes = {
  standard: StandardTabs,
  pill: PillTabs,
  menu: Radium(MenuTabs)
};

const Tabs = ({
  alignment = 'left',
  showBottomBorder = true,
  style,
  type = 'standard',
  useTabsInMobile,
  ...props
}) => {
  if (typeof useTabsInMobile !== 'undefined') {
    console.warn('The useTabsInMobile prop is deprecated and will be removed in a future release. Please use `type=\'menu\'`.');
  }

  const componentStyle = Object.assign({
    display: 'flex',
    justifyContent: alignment === 'left' ? 'flex-start' : 'center',
    borderBottom: showBottomBorder ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
    width: '100%'
  }, style);
  const TabsComponent = TabsTypes[type];

  if (!TabsComponent) throw new Error(`Unknown Tabs type: ${type}`);

  return (
    <div style={componentStyle}>
      <TabsComponent {...props} />
    </div>
  );
};

Tabs.propTypes = {
  alignment: PropTypes.oneOf(['left', 'center']),
  showBottomBorder: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(TabsTypes)),
  useTabsInMobile: PropTypes.bool
};

module.exports = Tabs;
