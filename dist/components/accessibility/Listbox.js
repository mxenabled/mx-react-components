'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Listbox = function (_React$Component) {
  _inherits(Listbox, _React$Component);

  function Listbox(props) {
    _classCallCheck(this, Listbox);

    var _this = _possibleConstructorReturn(this, (Listbox.__proto__ || Object.getPrototypeOf(Listbox)).call(this, props));

    _this._getChildren = function () {
      return React.Children.toArray(_this.props.children);
    };

    _this._getSelectedOptionIndex = function () {
      var children = _this._getChildren();
      var focusedIndex = _findIndex(children, function (child) {
        return child.props.isSelected;
      });

      // default to first
      return focusedIndex === -1 ? 0 : focusedIndex;
    };

    _this._handleKeyDown = function (e) {
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
    };

    _this._focusOption = function () {
      var option = _this.component.children[_this.state.focusedIndex];

      if (option) setTimeout(function () {
        return option.focus();
      });
    };

    _this._focusPrevious = function () {
      // go to the end if at the beginning
      var focusedIndex = _this.state.focusedIndex === 0 ? _this._getChildren().length : _this.state.focusedIndex;

      _this.setState({ focusedIndex: focusedIndex - 1 }, _this._focusOption);
    };

    _this._focusNext = function () {
      // go to the beginning if at the end
      var focusedIndex = _this.state.focusedIndex === _this._getChildren().length - 1 ? -1 : _this.state.focusedIndex;

      // focus next
      _this.setState({ focusedIndex: focusedIndex + 1 }, _this._focusOption);
    };

    _this.state = {
      focusedIndex: _this._getSelectedOptionIndex()
    };
    return _this;
  }

  _createClass(Listbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._eventTarget = this.props.useGlobalKeyHandler ? window : this.component;
      this._eventTarget.addEventListener('keydown', this._handleKeyDown);
      this._focusOption();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._eventTarget.removeEventListener('keydown', this._handleKeyDown);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        {
          'aria-label': this.props['aria-label'],
          ref: function ref(_ref) {
            return _this2.component = _ref;
          },
          role: 'listbox',
          style: this.props.style
        },
        React.Children.map(this.props.children, function (child, index) {
          return React.cloneElement(child, {
            onBlur: function onBlur() {
              return _this2.setState({ focusedIndex: -1 });
            },
            onFocus: function onFocus() {
              return _this2.setState({ focusedIndex: index });
            }
          });
        })
      );
    }
  }]);

  return Listbox;
}(React.Component);

/**
 * Option
 *
 * Handles accessibility for options in a Listbox.
 */


Listbox.propTypes = {
  'aria-label': PropTypes.string.isRequired,
  useGlobalKeyHandler: PropTypes.bool
};
Listbox.defaultProps = {
  useGlobalKeyHandler: false
};
var Option = function Option(_ref2) {
  var children = _ref2.children,
      isSelected = _ref2.isSelected,
      label = _ref2.label,
      props = _objectWithoutProperties(_ref2, ['children', 'isSelected', 'label']);

  return React.createElement(
    'a',
    _extends({}, props, {
      'aria-label': isSelected && label ? label + ', Current selection' : label,
      'aria-selected': isSelected,
      role: 'option',
      tabIndex: 0
    }),
    children
  );
};

Option.propTypes = {
  isSelected: PropTypes.bool,
  label: PropTypes.string.isRequired
};

module.exports = { Listbox: Listbox, Option: Radium(Option) };