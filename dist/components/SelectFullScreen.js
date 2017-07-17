'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var Radium = require('radium');

var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var SelectFullScreen = function (_React$Component) {
  _inherits(SelectFullScreen, _React$Component);

  function SelectFullScreen() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectFullScreen);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectFullScreen.__proto__ || Object.getPrototypeOf(SelectFullScreen)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isOpen: false,
      selected: false
    }, _this._handleClick = function () {
      _this.setState({
        isOpen: true
      });
    }, _this._handleCloseClick = function () {
      _this.setState({
        isOpen: false
      });
    }, _this._handleOptionClick = function (option) {
      _this.setState({
        selected: option,
        isOpen: false
      });

      _this.props.onChange(option);
    }, _this._handleSelectChange = function (e) {
      var selectedOption = _this.props.options.filter(function (option) {
        return option.value + '' === e.target.value;
      })[0];

      _this._handleOptionClick(selectedOption);
    }, _this._renderOptions = function () {
      if (_this.state.isOpen) {
        return React.createElement(
          'div',
          { style: [styles.optionsScrim, _this.props.isFixed && { position: 'fixed' }] },
          React.createElement(
            'div',
            { onClick: _this._handleCloseClick, style: styles.close },
            React.createElement(Icon, {
              size: 20,
              style: styles.closeIcon,
              type: _this.props.closeIcon
            }),
            React.createElement(
              'div',
              { style: styles.closeText },
              'ESC'
            )
          ),
          React.createElement(
            'div',
            { style: styles.content },
            React.createElement(
              'div',
              { style: styles.optionsHeader },
              _this.props.optionsHeaderText
            ),
            React.createElement(
              'div',
              { className: 'mx-select-full-screen-options', style: [styles.optionsWrapper, _this.props.optionsStyle] },
              _this.props.options.map(function (option) {
                return React.createElement(
                  'div',
                  {
                    className: 'mx-select-full-screen-option',
                    key: option.displayValue + option.value,
                    onClick: _this._handleOptionClick.bind(null, option)
                  },
                  _this.props.optionFormatter(option)
                );
              })
            )
          )
        );
      } else {
        return null;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectFullScreen, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      window.onkeyup = function (e) {
        if (e.keyCode === 27) {
          _this2._handleCloseClick();
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var selected = this.state.selected || this.props.selected || { displayValue: this.props.placeholderText, value: '' };

      return React.createElement(
        'div',
        { className: 'mx-select-full-screen', style: [styles.component, this.props.style] },
        React.createElement(
          'div',
          {
            className: 'mx-select-full-screen-selected',
            key: 'selected',
            onClick: this._handleClick,
            style: this.props.selectedStyle
          },
          selected.displayValue
        ),
        this._renderOptions()
      );
    }
  }]);

  return SelectFullScreen;
}(React.Component);

SelectFullScreen.propTypes = {
  closeIcon: PropTypes.string,
  isFixed: PropTypes.bool,
  onChange: PropTypes.func,
  optionFormatter: PropTypes.func,
  options: PropTypes.array,
  optionsHeaderText: PropTypes.string,
  optionsStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  optionStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholderText: PropTypes.string,
  selected: PropTypes.object,
  selectedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
SelectFullScreen.defaultProps = {
  closeIcon: 'close',
  isFixed: false,
  onChange: function onChange() {},
  optionFormatter: function optionFormatter(option) {
    return React.createElement(
      'div',
      { key: option.displayValue + option.value + '_value', style: styles.option },
      option.displayValue
    );
  },

  options: [],
  optionsHeaderText: 'Select An Option',
  placeholderText: 'Select One',
  selected: false
};


var styles = {
  close: {
    position: 'absolute',
    right: 20,
    top: 15,
    textAlign: 'center',
    cursor: 'pointer',
    color: StyleConstants.Colors.ASH
  },
  closeIcon: {
    color: StyleConstants.Colors.ASH
  },
  closeText: {
    fontSize: StyleConstants.FontSizes.TINY
  },
  component: {
    cursor: 'pointer',
    fontFamily: StyleConstants.FontFamily,
    fontSize: StyleConstants.FontSizes.LARGE,
    color: StyleConstants.Colors.CHARCOAL,
    boxSizing: 'border-box',
    outline: 'none'
  },
  content: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300
  },
  optionsScrim: {
    backgroundColor: '#fff',
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999
  },
  optionsWrapper: {
    border: '1px solid ' + StyleConstants.Colors.FOG,
    height: 250,
    overflow: 'auto',
    width: 300
  },
  option: {
    cursor: 'pointer',
    backgroundColor: '#fff',
    padding: 10,
    whiteSpace: 'nowrap',
    fontSize: StyleConstants.FontSizes.MEDIUM,

    ':hover': {
      backgroundColor: StyleConstants.Colors.PRIMARY,
      color: StyleConstants.Colors.WHITE,
      opacity: 1
    }
  },
  optionsHeader: {
    color: StyleConstants.Colors.CHARCOAL,
    fontSize: StyleConstants.FontSizes.XXLARGE,
    fontWeight: 'bold',
    paddingBottom: 10
  }
};

module.exports = Radium(SelectFullScreen);