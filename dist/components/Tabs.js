'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var Radium = require('radium');

var Icon = require('./Icon');
var SimpleSelect = require('./SimpleSelect');
var StyleConstants = require('../constants/Style');

var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tabs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selectedTab: _this.props.selectedTab || 0,
      showMenu: false
    }, _this._toggleMenu = function () {
      _this.setState({
        showMenu: !_this.state.showMenu
      });
    }, _this._handleTabClick = function (selectedTab) {
      _this.props.onTabSelect(selectedTab);
      _this._toggleMenu();

      _this.setState({
        selectedTab: selectedTab
      });
    }, _this._isLargeOrMediumWindowSize = function () {
      var windowSize = StyleConstants.getWindowSize();

      return windowSize === 'medium' || windowSize === 'large';
    }, _this._renderTabs = function () {
      var styles = _this.styles();
      var selectedTabStyle = _extends({}, styles.activeTab, _this.props.activeTabStyles);

      return _this.props.tabs.map(function (tab, index) {
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
    }, _this._renderTabMenu = function () {
      var selectedTabName = _this.props.tabs[_this.state.selectedTab];
      var styles = _this.styles();
      var tabItems = _this._buildTabItems();

      return React.createElement(
        'div',
        { onClick: _this._toggleMenu, style: styles.menuWrapper },
        selectedTabName,
        React.createElement(Icon, {
          size: 20,
          style: { fill: _this.props.brandColor },
          type: !_this.state.showMenu ? 'caret-down' : 'caret-up'
        }),
        _this.state.showMenu ? React.createElement(SimpleSelect, {
          items: tabItems,
          menuStyles: styles.menu,
          onScrimClick: _this._toggleMenu,
          showItems: _this.state.showMenu
        }) : null
      );
    }, _this._buildTabItems = function () {
      var tabItems = [];

      _this.props.tabs.map(function (tab, index) {
        tabItems.push({
          onClick: function onClick() {
            _this._handleTabClick(index);
          },
          text: tab
        });
      });

      return tabItems;
    }, _this.styles = function () {
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

          ':hover': !_this._isLargeOrMediumWindowSize() ? null : {
            color: StyleConstants.Colors.ASH
          }
        },
        menuWrapper: {
          alignItems: 'center',
          boxSizing: 'border-box',
          color: _this.props.brandColor,
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
          borderBottom: '2px solid ' + _this.props.brandColor
        },
        tabsContainer: {
          borderBottom: _this.props.showBottomBorder ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
          boxSizing: 'border-box',
          padding: '0 0 ' + StyleConstants.Spacing.LARGE + 'px ' + StyleConstants.Spacing.LARGE + 'px',
          width: '100%'
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tabs, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selectedTab !== this.state.selectedTab) {
        this.setState({
          selectedTab: nextProps.selectedTab
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
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
    }
  }]);

  return Tabs;
}(React.Component);

Tabs.propTypes = {
  activeTabStyles: PropTypes.object,
  brandColor: PropTypes.string,
  onTabSelect: PropTypes.func.isRequired,
  selectedTab: PropTypes.number,
  showBottomBorder: PropTypes.bool,
  tabs: PropTypes.array.isRequired,
  useTabsInMobile: PropTypes.bool
};
Tabs.defaultProps = {
  brandColor: StyleConstants.Colors.PRIMARY,
  showBottomBorder: true,
  useTabsInMobile: false
};


module.exports = Radium(Tabs);