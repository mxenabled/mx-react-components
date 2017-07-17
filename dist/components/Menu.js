'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var Icon = require('../components/Icon');

var StyleConstants = require('../constants/Style');

var Menu = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Menu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Menu.__proto__ || Object.getPrototypeOf(Menu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hoverItemIndex: null
    }, _this._handleMouseOver = function (hoverItemIndex) {
      _this.setState({
        hoverItemIndex: hoverItemIndex
      });
    }, _this._handleMouseOut = function () {
      _this.setState({
        hoverItemIndex: null
      });
    }, _this._renderItems = function () {
      var styles = _this.styles();

      return _this.props.items.map(function (item, index) {
        return React.createElement(
          'div',
          {
            key: item.label,
            onClick: item.onClick,
            onMouseOut: _this._handleMouseOut,
            onMouseOver: _this._handleMouseOver.bind(null, index),
            style: _extends({}, styles.menuItem, {
              backgroundColor: index === _this.state.hoverItemIndex ? _this.props.primaryColor : 'transparent',
              color: index === _this.state.hoverItemIndex ? StyleConstants.Colors.WHITE : StyleConstants.Colors.ASH
            })
          },
          React.createElement(Icon, {
            size: 20,
            style: _extends({}, styles.itemIcon, { fill: index === _this.state.hoverItemIndex ? StyleConstants.Colors.WHITE : StyleConstants.Colors.CHARCOAL }),
            type: item.icon
          }),
          React.createElement(
            'span',
            { style: styles.itemLabel },
            item.label
          )
        );
      });
    }, _this.styles = function () {
      return {
        component: {
          display: 'block',
          position: 'relative',
          width: 40
        },
        dotsWrapper: {
          backgroundColor: _this.props.isOpen ? StyleConstants.Colors.PORCELAIN : 'transparent',
          border: '1px solid ' + StyleConstants.Colors.FOG,
          borderRadius: 3,
          cursor: 'pointer',
          margin: 3,
          padding: 6
        },
        menu: {
          backgroundColor: StyleConstants.Colors.WHITE,
          border: '1px solid ' + StyleConstants.Colors.FOG,
          borderRadius: 3,
          boxShadow: StyleConstants.ShadowHigh,
          position: 'absolute',
          top: 40,
          padding: 10,
          maxWidth: 260,
          zIndex: 10
        },
        menuIcon: {
          fill: _this.props.primaryColor
        },
        menuItem: {
          color: StyleConstants.Colors.ASH,
          cursor: 'pointer',
          marginRight: 5,
          whiteSpace: 'nowrap'
        },
        itemIcon: {
          padding: '10px 5px',
          opacity: 0.5
        },
        itemLabel: {
          paddingRight: 10,
          position: 'relative',
          top: 3
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Menu, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.isOpen) {
        this.setState({
          hoverItemIndex: null
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isOpen = _props.isOpen,
          alignItems = _props.alignItems;

      var styles = this.styles();

      return React.createElement(
        'div',
        {
          onClick: this.props.onClick,
          style: _extends({}, styles.component, this.props.style)
        },
        React.createElement(
          'div',
          { style: styles.dotsWrapper },
          React.createElement(Icon, {
            size: 20,
            style: styles.menuIcon,
            type: 'kabob_horizontal'
          })
        ),
        isOpen ? React.createElement(
          'div',
          { style: _extends({}, styles.menu, alignItems === 'right' ? { right: 3 } : { left: 3 }) },
          this._renderItems()
        ) : null
      );
    }
  }]);

  return Menu;
}(React.Component);

Menu.propTypes = {
  alignItems: PropTypes.oneOf(['left', 'right']),
  isOpen: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func
  })).isRequired,
  onClick: PropTypes.func,
  primaryColor: PropTypes.string
};
Menu.defaultProps = {
  alignItems: 'left',
  primaryColor: StyleConstants.Colors.PRIMARY,
  isOpen: false,
  onClick: function onClick() {}
};


module.exports = Menu;