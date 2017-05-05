const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');

const Icon = require('./Icon');
const SimpleSelect = require('./SimpleSelect');
const StyleConstants = require('../constants/Style');

class Tabs extends React.Component {
  static propTypes = {
    activeTabStyles: PropTypes.object,
    brandColor: PropTypes.string,
    onTabSelect: PropTypes.func.isRequired,
    selectedTab: PropTypes.number,
    showBottomBorder: PropTypes.bool,
    tabs: PropTypes.array.isRequired,
    useTabsInMobile: PropTypes.bool
  };

  static defaultProps = {
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

  _renderTabs = () => {
    const styles = this.styles();
    const selectedTabStyle = Object.assign({}, styles.activeTab, this.props.activeTabStyles);

    return this.props.tabs.map((tab, index) => {
      const _index = index;

      return (
        <span
          key={_index}
          onClick={this._handleTabClick.bind(null, _index)}
          style={[styles.tab, this.state.selectedTab === _index && selectedTabStyle]}
        >
          {tab}
        </span>
      );
    });
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
            items={tabItems}
            menuStyles={styles.menu}
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

    return (
      <div style={[styles.component, this.props.style]}>
        {this._isLargeOrMediumWindowSize() || this.props.useTabsInMobile ? (
          <div style={styles.tabsContainer}>
            {this._renderTabs()}
          </div>
        ) : (
          <div>
            {this._renderTabMenu()}
          </div>
        )}
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
      buttonStyles: {
        backgroundColor: 'transparent'
      },
      tab: {
        boxSizing: 'border-box',
        color: StyleConstants.Colors.CHARCOAL,
        cursor: 'pointer',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        fontStyle: StyleConstants.Fonts.SEMIBOLD,
        letterSpacing: 0.75,
        marginRight: 30,
        marginTop: 30,
        padding: 5,
        textTransform: 'uppercase',

        ':hover': !this._isLargeOrMediumWindowSize() ? null : {
          color: StyleConstants.Colors.ASH
        }
      },
      menuWrapper: {
        alignItems: 'center',
        boxSizing: 'border-box',
        color: this.props.brandColor,
        lineHeight: '20px',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        fontStyle: StyleConstants.Fonts.SEMIBOLD,
        letterSpacing: 0.75,
        textTransform: 'uppercase'
      },
      menu: {
        boxSizing: 'border-box',
        color: StyleConstants.Colors.CHARCOAL,
        cursor: 'pointer',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        fontStyle: StyleConstants.Fonts.SEMIBOLD,
        letterSpacing: 0.75,
        position: 'absolute',
        textTransform: 'uppercase'
      },
      activeTab: {
        borderBottom: '2px solid ' + this.props.brandColor
      },
      tabsContainer: {
        borderBottom: this.props.showBottomBorder ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
        boxSizing: 'border-box',
        padding: `0 0 ${StyleConstants.Spacing.LARGE}px ${StyleConstants.Spacing.LARGE}px`,
        width: '100%'
      }
    };
  };
}

module.exports = Radium(Tabs);
