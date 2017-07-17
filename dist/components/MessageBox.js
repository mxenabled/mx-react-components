'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');
var _merge = require('lodash/merge');

var StyleConstants = require('../constants/Style');
var Icon = require('../components/Icon');

var MessageBox = function (_React$Component) {
  _inherits(MessageBox, _React$Component);

  function MessageBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MessageBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MessageBox.__proto__ || Object.getPrototypeOf(MessageBox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isOpen: true
    }, _this._toggleMessageBox = function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      });
    }, _this.styles = function () {
      return _merge({}, {
        component: {
          color: StyleConstants.Colors.WHITE,
          boxSizing: 'border-box'
        },
        header: {
          background: _this.props.color,
          display: 'flex',
          cursor: _this.props.children ? 'pointer' : 'auto',
          padding: StyleConstants.Spacing.XSMALL,
          alignItems: 'center'
        },
        leftHeader: {
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        },
        title: {
          fontFamily: StyleConstants.Fonts.SEMIBOLD,
          fontSize: StyleConstants.FontSizes.MEDIUM
        },
        icon: {
          fill: StyleConstants.Colors.WHITE
        },
        children: {
          backgroundColor: StyleConstants.adjustHexOpacity(_this.props.color, 0.1),
          padding: _this.props.children ? StyleConstants.Spacing.SMALL : null
        }
      }, _this.props.styles);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MessageBox, [{
    key: 'render',
    value: function render() {
      var styles = this.styles();

      return React.createElement(
        'div',
        { className: 'mx-message-box', style: styles.component },
        React.createElement(
          'div',
          { onClick: this.props.children ? this._toggleMessageBox : function () {}, style: styles.header },
          React.createElement(
            'div',
            { style: styles.leftHeader },
            React.createElement(Icon, {
              size: 20,
              style: _extends({}, styles.icon, { marginRight: StyleConstants.Spacing.SMALL }),
              type: this.props.icon
            }),
            React.createElement(
              'div',
              { style: styles.title },
              this.props.title
            )
          ),
          this.props.children && React.createElement(Icon, {
            size: 19,
            style: styles.icon,
            type: this.state.isOpen ? 'caret-up' : 'caret-down'
          })
        ),
        this.state.isOpen && React.createElement(
          'div',
          { style: styles.children },
          this.props.children
        )
      );
    }
  }]);

  return MessageBox;
}(React.Component);

MessageBox.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  icon: PropTypes.string,
  styles: PropTypes.object,
  title: PropTypes.string
};


module.exports = MessageBox;