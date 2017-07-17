'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var Radium = require('radium');
var keycode = require('keycode');
var _merge = require('lodash/merge');

var Icon = require('./Icon');

var _require = require('./accessibility/Listbox'),
    Listbox = _require.Listbox,
    Option = _require.Option;

var StyleConstants = require('../constants/Style');

var SimpleSelect = function (_React$Component) {
  _inherits(SimpleSelect, _React$Component);

  function SimpleSelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SimpleSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SimpleSelect.__proto__ || Object.getPrototypeOf(SimpleSelect)).call.apply(_ref, [this].concat(args))), _this), _this._handleItemClick = function (item, e) {
      if (_this.props.scrimClickOnSelect) {
        _this.props.onScrimClick(e);
      }

      item.onClick(e, item);
    }, _this._handleKeyDown = function (e) {
      if (keycode(e) === 'esc') {
        e.preventDefault();
        _this.props.onScrimClick();
      }
    }, _this.styles = function () {
      return _merge({}, {
        component: _extends({
          height: 0,
          position: 'relative'
        }, _this.props.style),

        menu: _extends({}, {
          alignSelf: 'stretch',
          backgroundColor: StyleConstants.Colors.WHITE,
          borderRadius: 3,
          boxShadow: StyleConstants.ShadowHigh,
          boxSizing: 'border-box',
          color: StyleConstants.Colors.CHARCOAL,
          display: 'flex',
          flexDirection: 'column',
          fill: StyleConstants.Colors.CHARCOAL,
          fontFamily: StyleConstants.FontFamily,
          fontSize: StyleConstants.FontSizes.MEDIUM,
          top: 10,
          position: 'absolute',
          zIndex: 10
        }, _this.props.menuStyles),

        item: _extends({}, {
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          height: 40,
          padding: StyleConstants.Spacing.MEDIUM,

          ':hover': {
            backgroundColor: _this.props.hoverColor,
            color: StyleConstants.Colors.WHITE,
            cursor: 'pointer',
            fill: StyleConstants.Colors.WHITE
          }
        }, _this.props.itemStyles),
        icon: _extends({}, {
          marginRight: StyleConstants.Spacing.SMALL
        }, _this.props.iconStyles),
        text: {
          whiteSpace: 'nowrap'
        },
        scrim: {
          bottom: 0,
          left: 0,
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: 9
        }
      }, _this.props.styles);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SimpleSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('keydown', this._handleKeyDown);

      if (this.props.style) {
        console.warn('The style prop is deprecated and will be removed in a future release. Please use styles.');
      }

      if (this.props.iconStyles) {
        console.warn('The iconStyles prop is deprecated and will be removed in a future release. Please use styles.');
      }

      if (this.props.menuStyles) {
        console.warn('The menuStyles prop is deprecated and will be removed in a future release. Please use styles.');
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this._handleKeyDown);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles();

      return React.createElement(
        'div',
        { style: styles.component },
        React.createElement(
          Listbox,
          {
            'aria-label': this.props['aria-label'],
            style: styles.menu,
            useGlobalKeyHandler: true
          },
          this.props.children ? this.props.children : this.props.items.map(function (item, i) {
            return React.createElement(
              Option,
              {
                key: i,
                label: item.text,
                onClick: _this2._handleItemClick.bind(null, item),
                style: styles.item
              },
              item.icon ? React.createElement(Icon, { size: _this2.props.iconSize || 20, style: styles.icon, type: item.icon }) : null,
              React.createElement(
                'div',
                { style: styles.text },
                item.text
              )
            );
          })
        ),
        React.createElement('div', { onClick: this.props.onScrimClick, style: styles.scrim })
      );
    }
  }]);

  return SimpleSelect;
}(React.Component);

SimpleSelect.propTypes = {
  'aria-label': PropTypes.string,
  hoverColor: PropTypes.string,
  iconSize: PropTypes.number,
  iconStyles: PropTypes.object,
  items: PropTypes.array.isRequired,
  itemStyles: PropTypes.object,
  menuStyles: PropTypes.object,
  onScrimClick: PropTypes.func,
  scrimClickOnSelect: PropTypes.bool,
  style: PropTypes.object,
  styles: PropTypes.object
};
SimpleSelect.defaultProps = {
  'aria-label': '',
  scrimClickOnSelect: false,
  hoverColor: StyleConstants.Colors.PRIMARY,
  items: [],
  onScrimClick: function onScrimClick() {}
};


module.exports = Radium(SimpleSelect);