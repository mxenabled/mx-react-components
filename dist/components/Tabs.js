'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Radium = require('radium');

var Icon = require('./Icon');
var SimpleSelect = require('./SimpleSelect');
var StyleConstants = require('../constants/Style');

var Tabs = React.createClass({
  displayName: 'Tabs',

  propTypes: {
    activeTabStyles: React.PropTypes.object,
    brandColor: React.PropTypes.string,
    onTabSelect: React.PropTypes.func.isRequired,
    selectedTab: React.PropTypes.number,
    showBottomBorder: React.PropTypes.bool,
    tabs: React.PropTypes.array.isRequired,
    useTabsInMobile: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      brandColor: StyleConstants.Colors.PRIMARY,
      showBottomBorder: true,
      useTabsInMobile: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      selectedTab: this.props.selectedTab || 0,
      showMenu: false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTab !== this.state.selectedTab) {
      this.setState({
        selectedTab: nextProps.selectedTab
      });
    }
  },
  _toggleMenu: function _toggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    });
  },
  _handleTabClick: function _handleTabClick(selectedTab) {
    this.props.onTabSelect(selectedTab);
    this._toggleMenu();

    this.setState({
      selectedTab: selectedTab
    });
  },
  _isLargeOrMediumWindowSize: function _isLargeOrMediumWindowSize() {
    var windowSize = StyleConstants.getWindowSize();

    return windowSize === 'medium' || windowSize === 'large';
  },
  _renderTabs: function _renderTabs() {
    var _this = this;

    var styles = this.styles();
    var selectedTabStyle = _extends({}, styles.activeTab, this.props.activeTabStyles);

    return this.props.tabs.map(function (tab, index) {
      var _index = index;

      return React.createElement(
        'span',
        {
          key: _index,
          onClick: _this._handleTabClick.bind(null, _index),
          style: [styles.tab, _this.state.selectedTab === _index && selectedTabStyle]
        },
        tab
      );
    });
  },
  _renderTabMenu: function _renderTabMenu() {
    var selectedTabName = this.props.tabs[this.state.selectedTab];
    var styles = this.styles();
    var tabItems = this._buildTabItems();

    return React.createElement(
      'div',
      { onClick: this._toggleMenu, style: styles.menuWrapper },
      selectedTabName,
      React.createElement(Icon, {
        size: 20,
        style: { fill: this.props.brandColor },
        type: !this.state.showMenu ? 'caret-down' : 'caret-up'
      }),
      this.state.showMenu ? React.createElement(SimpleSelect, {
        items: tabItems,
        menuStyles: styles.menu,
        onScrimClick: this._toggleMenu,
        showItems: this.state.showMenu
      }) : null
    );
  },
  _buildTabItems: function _buildTabItems() {
    var _this2 = this;

    var tabItems = [];

    this.props.tabs.map(function (tab, index) {
      tabItems.push({
        onClick: function onClick() {
          _this2._handleTabClick(index);
        },
        text: tab
      });
    });

    return tabItems;
  },
  render: function render() {
    var styles = this.styles();

    return React.createElement(
      'div',
      { style: [styles.component, this.props.style] },
      this._isLargeOrMediumWindowSize() || this.props.useTabsInMobile ? React.createElement(
        'div',
        { style: styles.tabsContainer },
        this._renderTabs()
      ) : React.createElement(
        'div',
        null,
        this._renderTabMenu()
      )
    );
  },
  styles: function styles() {
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
        paddingBottom: 20,
        paddingLeft: 20,
        width: '100%'
      }
    };
  }
});

module.exports = Radium(Tabs);