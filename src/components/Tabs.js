const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const _pick = require('lodash/pick');

const ButtonGroup = require('./ButtonGroup');
const StyleConstants = require('../constants/Style');

const TabsPropTypes = {
  activeTabStyles: PropTypes.object,
  brandColor: PropTypes.string,
  onTabSelect: PropTypes.func.isRequired,
  selectedTab: PropTypes.number,
  tabs: PropTypes.array.isRequired
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

const StandardTabs = (props) => (
  <div>
    {props.tabs.map((tab, index) =>
      <Tab
        isActive={props.selectedTab === index}
        key={tab}
        onClick={props.onTabSelect.bind(this, index)}
        styles={{ activeTab: props.activeTabStyles }}
      >
        {tab}
      </Tab>
     )}
  </div>
);

StandardTabs.propTypes = TabsPropTypes;

const PillTabs = (props) => {
  const styles = {
    component: {
      margin: StyleConstants.Spacing.SMALL
    },
    tab: {
      backgroundColor: StyleConstants.Colors.PORCELAIN,
      borderColor: StyleConstants.Colors.FOG,
      outline: 'none',

      ':hover': {
        backgroundColor: props.brandColor,
        color: StyleConstants.Colors.WHITE,
        fill: StyleConstants.Colors.WHITE
      },
      ':focus': {
        backgroundColor: props.brandColor,
        color: StyleConstants.Colors.WHITE,
        fill: StyleConstants.Colors.WHITE
      },
      ':active': {
        backgroundColor: StyleConstants.adjustColor(props.brandColor, -15)
      }
    },
    selected: {
      backgroundColor: StyleConstants.Colors.WHITE,
      color: props.brandColor,
      cursor: 'default',

      ':hover': {
        backgroundColor: 'transparent'
      },
      ':focus': {
        backgroundColor: StyleConstants.Colors.WHITE,
        color: props.brandColor
      },
      ':active': {
        backgroundColor: 'transparent'
      }
    }
  };

  return (
    <div style={styles.component}>
      <ButtonGroup
        buttons={props.tabs.map((tab, index) => ({
          'aria-label': tab,
          onClick: (props.selectedTab === index ? null : props.onTabSelect.bind(this, index)),
          style: Object.assign({}, styles.tab, props.selectedTab === index && styles.selected),
          text: tab
        }))}
        style={styles.buttonGroup}
        type='neutral'
      />
    </div>
  );
};

PillTabs.propTypes = TabsPropTypes;

const TabsTypes = {
  standard: StandardTabs,
  pill: PillTabs
};

class TabsWrapper extends React.Component {
  static propTypes = Object.assign({
    alignment: PropTypes.oneOf(['left', 'center']),
    showBottomBorder: PropTypes.bool,
    type: PropTypes.oneOf(Object.keys(TabsTypes)),
    useTabsInMobile: PropTypes.bool
  }, TabsPropTypes);

  static defaultProps = {
    alignment: 'left',
    brandColor: StyleConstants.Colors.PRIMARY,
    showBottomBorder: true,
    type: 'standard'
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
    const componentStyle = Object.assign({
      borderBottom: this.props.showBottomBorder ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: this.props.alignment === 'left' ? 'flex-start' : 'center',
      overflowX: 'scroll',
      width: '100%'
    }, this.props.style);
    const TabsComponent = TabsTypes[this.props.type];

    if (!TabsComponent) throw new Error(`Unknown Tabs type: ${this.props.type}`);

    const tabsProps = Object.assign(
      _pick(this.props, Object.keys(TabsPropTypes)),
      {
        onTabSelect: this.handleTabSelect.bind(this), // delegate for keeping state
        selectedTab: this.props.selectedTab
      }
    );


    return (
      <div style={componentStyle}>
        <TabsComponent {...tabsProps} />
      </div>
    );
  }
}

module.exports = TabsWrapper;
