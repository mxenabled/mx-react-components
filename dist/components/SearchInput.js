'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var Input = require('./SimpleInput');

var StylesUtil = require('../utils/Styles');

var SearchInput = function (_React$Component) {
  _inherits(SearchInput, _React$Component);

  function SearchInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SearchInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchInput.__proto__ || Object.getPrototypeOf(SearchInput)).call.apply(_ref, [this].concat(args))), _this), _this.styles = function () {
      return _extends({}, {
        component: {
          display: 'inline-block',
          width: '100%'
        }
      }, _this.props.styles);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SearchInput, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      StylesUtil.checkForDeprecated(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();

      return React.createElement(
        'div',
        { style: _extends({}, styles.component, this.props.style) },
        React.createElement(Input, {
          baseColor: this.props.baseColor,
          elementProps: {
            onBlur: this.props.onBlur,
            onChange: this.props.onChange,
            placeholder: this.props.placeholder,
            type: 'text',
            value: this.props.searchKeyword
          },
          focusOnLoad: this.props.focusOnLoad,
          handleResetClick: this.props.handleResetClick,
          icon: 'search',
          resetClick: this.props.handleResetClick,
          rightIcon: 'close-solid'
        })
      );
    }
  }]);

  return SearchInput;
}(React.Component);

SearchInput.propTypes = {
  baseColor: PropTypes.string,
  focusOnLoad: PropTypes.bool,
  handleResetClick: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  searchKeyword: PropTypes.string,
  style: PropTypes.object,
  styles: PropTypes.object
};
SearchInput.defaultProps = {
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  placeholder: 'Search'
};


module.exports = SearchInput;