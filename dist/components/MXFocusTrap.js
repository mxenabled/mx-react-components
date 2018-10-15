"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var traps = [];

var PropTypes = require('prop-types');

var React = require('react');

var ReactDOM = require('react-dom');

var FocusTrap = require('focus-trap-react');

var _get = require('lodash/get');
/**
 * MXFocusTrap
 *
 * Why is this needed?
 *
 * FocusTrap does not un-pause the previous trap when the current trap is unmounted.
 * This ensures that the previously trapped component is un-paused.
 */


var MXFocusTrap =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MXFocusTrap, _React$Component);

  function MXFocusTrap() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MXFocusTrap);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MXFocusTrap)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      paused: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getSiblingNodeToRenderNextTo", function (queryString) {
      if (!queryString || typeof queryString !== 'string') {
        return null;
      }

      return document.querySelector(queryString);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_safelySetNodeAriaHiddenAttribute", function (node, state) {
      if (node && node.setAttribute) {
        node.setAttribute('aria-hidden', state);
      }
    });

    return _this;
  }

  _createClass(MXFocusTrap, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      // FocusTrap does it's own pausing but these React components also need to be paused
      traps.forEach(function (component) {
        component.setState({
          paused: true
        });

        _this2._safelySetNodeAriaHiddenAttribute(ReactDOM.findDOMNode(component), true);
      });
      traps.push(this);
      this._siblingNodeToRenderNextTo = this._getSiblingNodeToRenderNextTo(_get(this.props, 'focusTrapOptions.portalTo', null));

      this._safelySetNodeAriaHiddenAttribute(this._siblingNodeToRenderNextTo, true);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      traps = traps.filter(function (component) {
        return component !== _this3;
      });
      var lastTrap = traps[traps.length - 1];

      if (lastTrap) {
        lastTrap.setState({
          paused: false
        });

        this._safelySetNodeAriaHiddenAttribute(ReactDOM.findDOMNode(lastTrap), false);
      } else {
        this._safelySetNodeAriaHiddenAttribute(this._siblingNodeToRenderNextTo, false);
      }
    }
  }, {
    key: "render",
    value: function render() {
      // Portal next to selected sibling
      if (this._siblingNodeToRenderNextTo && this._siblingNodeToRenderNextTo.parentNode) {
        return ReactDOM.createPortal(React.createElement(FocusTrap, _extends({}, this.props, {
          paused: this.state.paused
        }), this.props.children), this._siblingNodeToRenderNextTo.parentNode);
      } // Render in normal location


      return React.createElement(FocusTrap, _extends({}, this.props, {
        paused: this.state.paused
      }), this.props.children);
    }
  }]);

  return MXFocusTrap;
}(React.Component);

_defineProperty(MXFocusTrap, "propTypes", {
  focusTrapOptions: PropTypes.object
});

module.exports = MXFocusTrap;