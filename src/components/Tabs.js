const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');

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
    showBottomBorder: true
  };

  state = {
    selectedTab: this.props.selectedTab || 0
  };

  componentWillMount () {
    if (this.props.hasOwnProperty('useTabsInMobile')) {
      console.warn('The useTabsInMobile prop is deprecated and will be removed in a future release.');
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedTab !== this.state.selectedTab) {
      this.setState({
        selectedTab: nextProps.selectedTab
      });
    }
  }

  _handleTabClick = (selectedTab) => {
    this.props.onTabSelect(selectedTab);

    this.setState({
      selectedTab
    });
  };

  render () {
    const styles = this.styles();
    const componentStyles = Object.assign({}, styles.component, styles.tabsContainer, this.props.style);

    return (
      <div style={componentStyles}>
        {this.props.tabs.map((tab, index) =>
          <Tab
            isActive={this.state.selectedTab === index}
            key={tab}
            onClick={this._handleTabClick.bind(null, index)}
            styles={{ activeTab: this.props.activeTabStyles }}
          >
            {tab}
          </Tab>
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
      tabsContainer: {
        borderBottom: this.props.showBottomBorder ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: this.props.alignment === 'left' ? 'flex-start' : 'center',
        overflowX: 'scroll',
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

module.exports = Tabs;
