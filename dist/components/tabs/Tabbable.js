"use strict";

var _Theme = require("../Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PropTypes = require('prop-types');

var React = require('react');

var _require = require('../../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../../utils/Style');
/**
 * Common state and prop management and outer styling for Tabs components.
 */


var Tabbable = function Tabbable(TabsComponent) {
  var _class, _temp;

  var TabbableComponent = (_temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(TabbableComponent, _React$Component);

    function TabbableComponent(props) {
      var _this;

      _classCallCheck(this, TabbableComponent);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(TabbableComponent).call(this, props));
      _this.state = {
        selectedTab: _this.props.selectedTab
      };
      return _this;
    }

    _createClass(TabbableComponent, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTab !== this.state.selectedTab) {
          this.setState({
            selectedTab: nextProps.selectedTab
          });
        }
      }
    }, {
      key: "handleTabSelect",
      value: function handleTabSelect(selectedTab) {
        this.props.onTabSelect(selectedTab);
        this.setState({
          selectedTab: selectedTab
        });
      }
    }, {
      key: "render",
      value: function render() {
        var theme = StyleUtils.mergeTheme(this.props.theme);
        var styles = this.styles(theme);

        var tabsProps = _extends({}, this.props, {
          onTabSelect: this.handleTabSelect.bind(this),
          // delegate for keeping state
          selectedTab: this.props.selectedTab
        });

        return React.createElement(TabsComponent, _extends({}, tabsProps, {
          style: styles
        }));
      }
    }, {
      key: "styles",
      value: function styles(theme) {
        return _extends({
          borderBottom: this.props.showBottomBorder ? '1px solid ' + theme.Colors.GRAY_300 : 'none',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: this.props.alignment === 'left' ? 'flex-start' : 'center',
          overflowX: 'auto',
          width: '100%'
        }, this.props.style);
      }
    }]);

    return TabbableComponent;
  }(React.Component), _defineProperty(_class, "propTypes", Tabbable.propTypes), _defineProperty(_class, "defaultProps", {
    alignment: 'left',
    selectedTab: 0,
    showBottomBorder: true
  }), _temp);
  return (0, _Theme.withTheme)(TabbableComponent);
};

Tabbable.propTypes = {
  activeTabStyles: PropTypes.object,
  alignment: PropTypes.oneOf(['left', 'center']),
  onTabSelect: PropTypes.func.isRequired,
  selectedTab: PropTypes.number,
  showBottomBorder: PropTypes.bool,
  style: PropTypes.object,
  tabs: PropTypes.array.isRequired,
  theme: themeShape
};
module.exports = Tabbable;