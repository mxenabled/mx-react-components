const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');

const Icon = require('./Icon');
const SimpleSelect = require('./SimpleSelect');
const StyleConstants = require('../constants/Style');

class Tabs extends React.Component {
  static propTypes = {
    activeTabStyles: PropTypes.object,
    alignment: PropTypes.oneOf(['left', 'center']),
    brandColor: PropTypes.string,
    onTabSelect: PropTypes.func.isRequired,
    selectedTab: PropTypes.number,
    showBottomBorder: PropTypes.bool,
    tabs: PropTypes.array.isRequired,
    useTabsInMobile: PropTypes.bool
  };

  static defaultProps = {
    alignment: 'left',
    brandColor: StyleConstants.Colors.PRIMARY,
    showBottomBorder: true,
    useTabsInMobile: false
  };

  state = {
    selectedTab: this.props.selectedTab || 0,
    showMenu: false
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedTab !== this.state.selectedTab) {
      this.setState({
        selectedTab: nextProps.selectedTab
      });
    }
  }

  _toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  _handleTabClick = (selectedTab) => {
    this.props.onTabSelect(selectedTab);
    this._toggleMenu();

    this.setState({
      selectedTab
    });
  };

  _isLargeOrMediumWindowSize = () => {
    const windowSize = StyleConstants.getWindowSize();

    return windowSize === 'medium' || windowSize === 'large';
  };

  _renderTabMenu = () => {
    const selectedTabName = this.props.tabs[this.state.selectedTab];
    const styles = this.styles();
    const tabItems = this._buildTabItems();

    return (
      <div onClick={this._toggleMenu} style={styles.menuWrapper} >
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
      </div>
    );
  };

  _buildTabItems = () => {
    const tabItems = [];

    this.props.tabs.map((tab, index) => {
      tabItems.push({
        onClick: () => {
          this._handleTabClick(index);
        },
        text: tab
      });
    });

    return tabItems;
  };

  render () {
    const styles = this.styles();
    const useTabs = this._isLargeOrMediumWindowSize() || this.props.useTabsInMobile;
    const componentStyles = Object.assign({}, styles.component, (useTabs && styles.tabsContainer), this.props.style);

    return (
      <div style={componentStyles}>
        {useTabs ? this.props.tabs.map((tab, index) =>
          <Tab
            isActive={this.state.selectedTab === index}
            key={tab}
            onClick={this._handleTabClick.bind(null, index)}
            styles={{ activeTab: this.props.activeTabStyles }}
          >
            {tab}
          </Tab>
        ) : this._renderTabMenu()}
      </div>
    );
  }

  styles = () => {
    return {
      // Block styles
      component: {
        display: 'block',
        width: '100%'
      },
      menuWrapper: {
        alignItems: 'center',
        boxSizing: 'border-box',
        color: this.props.brandColor,
        lineHeight: '20px',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        fontStyle: StyleConstants.Fonts.SEMIBOLD
      },
      tabsContainer: {
        display: 'flex',
        justifyContent: this.props.alignment === 'left' ? 'flex-start' : 'center',
        borderBottom: this.props.showBottomBorder ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
        width: '100%'
      }
    };
  };
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

module.exports = Tabs;
