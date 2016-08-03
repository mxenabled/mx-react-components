const React = require('react');
const Radium = require('radium');

const Button  = require('./Button');
const SimpleSelect = require('./SimpleSelect');
const StyleConstants = require('../constants/Style');

const Tabs = React.createClass({
  propTypes: {
    brandColor: React.PropTypes.string,
    onTabSelect: React.PropTypes.func.isRequired,
    selectedBottomBorderPadding: React.PropTypes.number,
    selectedTab: React.PropTypes.number,
    showBottomBorder: React.PropTypes.bool,
    tabs: React.PropTypes.array.isRequired
  },

  getDefaultProps () {
    return {
      brandColor: StyleConstants.Colors.PRIMARY,
      showBottomBorder: true,
      selectedBottomBorderPadding: 5
    };
  },

  getInitialState () {
    return {
      selectedTab: this.props.selectedTab || 1,
      showMenu: true
    };
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedTab !== this.state.selectedTab) {
      this.setState({
        selectedTab: nextProps.selectedTab
      });
    }
  },

  _handleTabClick (selectedTab) {
    this.props.onTabSelect(selectedTab);

    this.setState({
      selectedTab
    });
  },

  _handleMobileButtonClick () {
    this.setState({
      showMenu: !this.state.showMenu
    });
  },

  _isLargeOrMediumWindowSize () {
    const windowSize = StyleConstants.getWindowSize();

    return windowSize === 'medium' || windowSize === 'large';
  },

  _renderTabs () {
    const selectedTabStyle = {
      borderBottom: '2px solid ' + this.props.brandColor,
      paddingBottom: this.props.selectedBottomBorderPadding
    };
    const styles = this.styles();

    return this.props.tabs.map((tab, index) => {
      const _index = index + 1;

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
  },

  render () {
    const styles = this.styles();

    return (
      <div style={[styles.component, this.props.style]}>
        {this._isLargeOrMediumWindowSize() ? (
          <div style={styles.tabsContainer}>
            {this._renderTabs()}
          </div>
        ) : (
          <div>
            {this._renderTabList()}
          </div>
        )}
      </div>
    );
  },

  styles () {
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
        letterSpacing: '.75',
        marginRight: 30,
        marginTop: 30,
        padding: 5,
        textTransform: 'uppercase',

        ':hover': {
          color: StyleConstants.Colors.ASH
        }
      },
      tabsContainer: {
        borderBottom: this.props.showBottomBorder ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
        boxSizing: 'border-box',
        paddingBottom: 20,
        paddingLeft: 20,
        width: '100%'
      }
    };
  }
});

module.exports = Radium(Tabs);
