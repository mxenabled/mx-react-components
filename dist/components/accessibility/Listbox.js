"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');

var PropTypes = require('prop-types');

var Radium = require('radium');

var keycode = require('keycode');

var _findIndex = require('lodash/findIndex');
/**
 * Listbox
 *
 * Handles accessibility and traversal of a list of options.
 * Traverse the list with the `up`/`down` arrow keys and `tab`/`shift+tab`.
 * Selecting an option is handled with `space`/`enter`.
 * Focus is also managed.
 *
 * When `useGlobalKeyHandler` is `true` the event listener will bind to window.
 *
 * Example:
 *   <Listbox aria-label='select things'>
 *     <Option ...>Foo</Option>
 *     <Option ...>Bar</Option>
 *   </Listbox>
 */


var Listbox =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Listbox, _React$Component);

  function Listbox(props) {
    var _this;

    _classCallCheck(this, Listbox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Listbox).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getChildren", function () {
      return React.Children.toArray(_this.props.children);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getSelectedOptionIndex", function () {
      var children = _this._getChildren();

      var focusedIndex = _findIndex(children, function (child) {
        return child.props.isSelected;
      }); // default to first


      return focusedIndex === -1 ? 0 : focusedIndex;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleKeyDown", function (e) {
      switch (keycode(e)) {
        case 'up':
          e.preventDefault();
          e.stopPropagation();

          _this._focusPrevious();

          break;

        case 'down':
          e.preventDefault();
          e.stopPropagation();

          _this._focusNext();

          break;

        case 'enter':
        case 'space':
          e.preventDefault();
          e.stopPropagation();
          e.target.click();
          break;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_focusOption", function () {
      var option = _this.component.children[_this.state.focusedIndex];
      if (option) setTimeout(function () {
        return option.focus();
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_focusPrevious", function () {
      // go to the end if at the beginning
      var focusedIndex = _this.state.focusedIndex === 0 ? _this._getChildren().length : _this.state.focusedIndex;

      _this.setState({
        focusedIndex: focusedIndex - 1
      }, _this._focusOption);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_focusNext", function () {
      // go to the beginning if at the end
      var focusedIndex = _this.state.focusedIndex === _this._getChildren().length - 1 ? -1 : _this.state.focusedIndex; // focus next

      _this.setState({
        focusedIndex: focusedIndex + 1
      }, _this._focusOption);
    });

    _this.state = {
      focusedIndex: _this._getSelectedOptionIndex()
    };
    return _this;
  }

  _createClass(Listbox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._eventTarget = this.props.useGlobalKeyHandler ? window : this.component;

      this._eventTarget.addEventListener('keydown', this._handleKeyDown);

      this._focusOption();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._eventTarget.removeEventListener('keydown', this._handleKeyDown);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", {
        "aria-label": this.props['aria-label'],
        className: "mx-listbox",
        ref: function ref(_ref) {
          return _this2.component = _ref;
        },
        role: "listbox",
        style: this.props.style
      }, React.Children.map(this.props.children, function (child, index) {
        return React.cloneElement(child, {
          onBlur: function onBlur() {
            return _this2.setState({
              focusedIndex: -1
            });
          },
          onFocus: function onFocus() {
            return _this2.setState({
              focusedIndex: index
            });
          }
        });
      }));
    }
  }]);

  return Listbox;
}(React.Component);
/**
 * Option
 *
 * Handles accessibility for options in a Listbox.
 */


_defineProperty(Listbox, "propTypes", {
  'aria-label': PropTypes.string.isRequired,
  useGlobalKeyHandler: PropTypes.bool
});

_defineProperty(Listbox, "defaultProps", {
  useGlobalKeyHandler: false
});

var Option = function Option(_ref2) {
  var children = _ref2.children,
      isSelected = _ref2.isSelected,
      label = _ref2.label,
      props = _objectWithoutProperties(_ref2, ["children", "isSelected", "label"]);

  return React.createElement("a", _extends({
    "aria-label": isSelected && label ? "".concat(label, ", Current selection") : label,
    "aria-selected": isSelected,
    role: "option",
    tabIndex: 0
  }, props), children);
};

Option.propTypes = {
  isSelected: PropTypes.bool,
  label: PropTypes.string.isRequired
};
module.exports = {
  Listbox: Listbox,
  Option: Radium(Option)
};