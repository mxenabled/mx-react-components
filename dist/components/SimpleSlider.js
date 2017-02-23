'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Radium = require('radium');
var _merge = require('lodash/merge');
var browser = require('bowser');

var StyleConstants = require('../constants/Style');

var SimpleSlider = React.createClass({
  displayName: 'SimpleSlider',

  propTypes: {
    disabled: React.PropTypes.bool,
    onPercentChange: React.PropTypes.func.isRequired,
    percent: React.PropTypes.number.isRequired,
    selectedColor: React.PropTypes.string,
    styles: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: false,
      selectedColor: StyleConstants.Colors.PRIMARY
    };
  },
  getInitialState: function getInitialState() {
    return {
      dragging: false,
      leftPixels: 0,
      width: 0
    };
  },
  componentDidMount: function componentDidMount() {
    var component = ReactDOM.findDOMNode(this.rangeSelectorRef);
    var width = component.clientWidth;
    var leftPixels = this.props.percent * width;

    this.setState({ width: width, leftPixels: leftPixels });
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (this.props.percent !== newProps.percent) {
      var leftPixels = newProps.percent * this.state.width;

      this.setState({ leftPixels: leftPixels });
    }
  },
  _getCursorStyle: function _getCursorStyle() {
    if (this.props.disabled) {
      return 'not-allowed';
    } else if (browser.msie) {
      return 'pointer';
    } else {
      return this.state.dragging ? 'grabbing' : 'grab';
    }
  },
  _handleMouseEvents: function _handleMouseEvents(e) {
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var leftSpace = ReactDOM.findDOMNode(this.rangeSelectorRef).getBoundingClientRect().left;
    var currentPercent = (clientX - leftSpace) / this.state.width;

    if (currentPercent < 0) {
      currentPercent = 0;
    } else if (currentPercent > 1) {
      currentPercent = 1;
    }

    this.props.onPercentChange(currentPercent);
  },
  _handleDragStart: function _handleDragStart() {
    this.setState({
      dragging: true
    });
  },
  _handleDragging: function _handleDragging(e) {
    if (this.state.dragging) {
      this._handleMouseEvents(e);
    }
  },
  _handleDragEnd: function _handleDragEnd() {
    this.setState({
      dragging: false
    });
  },
  render: function render() {
    var _this = this;

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
          ref: function ref(_ref) {
            _this.rangeSelectorRef = _ref;
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
  },
  styles: function styles() {
    var cursorStyle = this._getCursorStyle();

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
        cursor: this.props.disabled ? 'not-allowed' : 'pointer'
      },
      toggle: {
        width: StyleConstants.Spacing.LARGE,
        height: StyleConstants.Spacing.LARGE,
        borderRadius: '100%',
        background: StyleConstants.Colors.WHITE,
        boxShadow: StyleConstants.ShadowLow,
        position: 'absolute',
        top: '50%',
        left: this.state.leftPixels,
        transform: 'translate(20%, -50%)',
        WebkitTransform: 'translate(20%, -50%)',
        cursor: cursorStyle,
        zIndex: 2
      },
      selected: {
        position: 'absolute',
        left: StyleConstants.Spacing.SMALL,
        width: this.state.leftPixels,
        background: this.props.selectedColor,
        height: 3,
        top: '50%',
        transform: 'translateY(-50%)',
        WebkitTransform: 'translateY(-50%)',
        zIndex: 1
      }
    }, this.props.styles);
  }
});

module.exports = Radium(SimpleSlider);