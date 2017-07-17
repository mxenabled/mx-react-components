'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var Radium = require('radium');
var _merge = require('lodash/merge');
var browser = require('bowser');

var StyleConstants = require('../constants/Style');

var SimpleSlider = function (_React$Component) {
  _inherits(SimpleSlider, _React$Component);

  function SimpleSlider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SimpleSlider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SimpleSlider.__proto__ || Object.getPrototypeOf(SimpleSlider)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dragging: false,
      leftPixels: 0,
      width: 0
    }, _this._getCursorStyle = function () {
      if (_this.props.disabled) {
        return 'not-allowed';
      } else if (browser.msie) {
        return 'pointer';
      } else {
        return _this.state.dragging ? 'grabbing' : 'grab';
      }
    }, _this._handleMouseEvents = function (e) {
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var leftSpace = ReactDOM.findDOMNode(_this.rangeSelectorRef).getBoundingClientRect().left;
      var currentPercent = (clientX - leftSpace) / _this.state.width;

      if (currentPercent < 0) {
        currentPercent = 0;
      } else if (currentPercent > 1) {
        currentPercent = 1;
      }

      _this.props.onPercentChange(currentPercent);
    }, _this._handleDragStart = function () {
      _this.setState({
        dragging: true
      });
    }, _this._handleDragging = function (e) {
      if (_this.state.dragging) {
        _this._handleMouseEvents(e);
      }
    }, _this._handleDragEnd = function () {
      _this.setState({
        dragging: false
      });
    }, _this.styles = function () {
      var cursorStyle = _this._getCursorStyle();

      return _merge({}, {
        component: {
          position: 'relative'
        },
        range: {
          padding: '25px 0',
          margin: '0 ' + StyleConstants.Spacing.MEDIUM + 'px'
        },
        track: {
          height: 1,
          background: '#ccc'
        },
        trackHolder: {
          padding: StyleConstants.Spacing.MEDIUM + 'px 0',
          cursor: _this.props.disabled ? 'not-allowed' : 'pointer'
        },
        toggle: {
          width: StyleConstants.Spacing.LARGE,
          height: StyleConstants.Spacing.LARGE,
          borderRadius: '100%',
          background: StyleConstants.Colors.WHITE,
          boxShadow: StyleConstants.ShadowLow,
          position: 'absolute',
          top: '50%',
          left: _this.state.leftPixels,
          transform: 'translate(20%, -50%)',
          WebkitTransform: 'translate(20%, -50%)',
          cursor: cursorStyle,
          zIndex: 2
        },
        selected: {
          position: 'absolute',
          left: StyleConstants.Spacing.SMALL,
          width: _this.state.leftPixels,
          background: _this.props.selectedColor,
          height: 3,
          top: '50%',
          transform: 'translateY(-50%)',
          WebkitTransform: 'translateY(-50%)',
          zIndex: 1
        }
      }, _this.props.styles);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SimpleSlider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var component = ReactDOM.findDOMNode(this.rangeSelectorRef);
      var width = component.clientWidth;
      var leftPixels = this.props.percent * width;

      this.setState({ width: width, leftPixels: leftPixels });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (this.props.percent !== newProps.percent) {
        var leftPixels = newProps.percent * this.state.width;

        this.setState({ leftPixels: leftPixels });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles();
      var disabled = this.props.disabled;


      return React.createElement(
        'div',
        { style: styles.component },
        React.createElement(
          'div',
          {
            onMouseLeave: disabled ? null : this._handleDragEnd,
            onMouseMove: disabled ? null : this._handleDragging,
            onMouseUp: disabled ? null : this._handleDragEnd,
            onTouchEnd: disabled ? null : this._handleDragEnd,
            onTouchMove: disabled ? null : this._handleDragging,
            ref: function ref(_ref2) {
              _this2.rangeSelectorRef = _ref2;
            },
            style: styles.range
          },
          React.createElement(
            'div',
            {
              onMouseDown: disabled ? null : this._handleMouseEvents,
              style: styles.trackHolder
            },
            React.createElement('div', { style: styles.track }),
            React.createElement('div', { style: styles.selected })
          ),
          React.createElement('div', {
            onMouseDown: disabled ? null : this._handleDragStart,
            onTouchStart: disabled ? null : this._handleDragStart,
            style: styles.toggle
          })
        )
      );
    }
  }]);

  return SimpleSlider;
}(React.Component);

SimpleSlider.propTypes = {
  disabled: PropTypes.bool,
  onPercentChange: PropTypes.func.isRequired,
  percent: PropTypes.number.isRequired,
  selectedColor: PropTypes.string,
  styles: PropTypes.object
};
SimpleSlider.defaultProps = {
  disabled: false,
  selectedColor: StyleConstants.Colors.PRIMARY
};


module.exports = Radium(SimpleSlider);