const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');

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

const TabsTypes = {
  standard: StandardTabs
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
    borderBottom: showBottomBorder ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: alignment === 'left' ? 'flex-start' : 'center',
    overflowX: 'scroll',
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
