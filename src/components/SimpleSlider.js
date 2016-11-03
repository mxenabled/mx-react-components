const React = require('react');
const ReactDOM = require('react-dom');
const _noop = require('lodash/noop');
const _merge = require('lodash/merge');

const StyleConstants = require('../constants/Style');

const SimpleSlider = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    onPercentChange: React.PropTypes.func,
    selectedColor: React.PropTypes.string,
    styles: React.PropTypes.object,
    updateOnDrag: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      defaultValue: 0,
      selectedColor: '#359BCF'
    };
  },

  getInitialState () {
    const disabled = this.props.disabled || false;
    return {
      dragging: false,
      disabled
    };
  },

  componentDidMount () {
    this._setDefaults();
  },

  componentWillReceiveProps (newProps) {
    const disabled = newProps.disabled || false;
    const leftPixels = (newProps.defaultValue * this.state.width) || 0;
    const currentPercent = newProps.defaultValue;
    this.setState({ leftPixels, currentPercent, disabled });
  },

  _setDefaults () {
    const component = ReactDOM.findDOMNode(this.rangeSelectorRef);
    const componentStyles = window.getComputedStyle(component);
    const width = parseInt(componentStyles.width, 0);
    let leftPixels = 0;
    let currentPercent = 0;

    if (this.props.defaultValue) {
      leftPixels = (this.props.defaultValue * this.state.width);
      currentPercent = this.props.defaultValue;
    }

    this.setState({ width, leftPixels });
  },

  _handleTrackMouseDown (e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const leftSpace = ReactDOM.findDOMNode(this.rangeSelectorRef).getBoundingClientRect().left;
    const leftPixels = (clientX - leftSpace);
    let currentPercent = ((clientX - leftSpace) / this.state.width);

    if (currentPercent < 0) {
      currentPercent = 0;
    } else if ( currentPercent > 1) {
      currentPercent = 1;
    }

    if (leftPixels >= 0 && leftPixels <= this.state.width) {
      this.setState({ leftPixels, currentPercent });
    }
    this.props.onPercentChange((currentPercent).toFixed(2));
  },

  _handleDragStart () {
    this.setState({
      dragging: true
    });
  },

  _handleDragging (e) {
    if (this.state.dragging) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const leftSpace = ReactDOM.findDOMNode(this.rangeSelectorRef).getBoundingClientRect().left;
      const leftPixels = (clientX - leftSpace);
      let currentPercent = ((clientX - leftSpace) / this.state.width);
      if (currentPercent < 0) {
        currentPercent = 0;
      } else if ( currentPercent > 1) {
        currentPercent = 1;
      }

      if (leftPixels >= 10 && leftPixels <= this.state.width + 10) {
        this.setState({ leftPixels, currentPercent });
      }
      this.props.onPercentChange((currentPercent).toFixed(2));
    }
  },

  _handleDragEnd () {
    this.setState({
      dragging: false
    });
  },

  render () {
    const styles = this.styles();
    console.log('disabled? ', this.state.disabled);

    return (
      <div style={styles.component}>
        <div
          onMouseLeave={this.state.disabled ? _noop() : this._handleDragEnd}
          onMouseMove={this.state.disabled ? _noop() : this._handleDragging}
          onMouseUp={this.state.disabled ? _noop() : this._handleDragEnd}
          onTouchEnd={this.state.disabled ? _noop() : this._handleDragEnd}
          onTouchMove={this.state.disabled ? _noop() : this._handleDragging}
          ref={(ref) => {
            this.rangeSelectorRef = ref;
          }}
          style={styles.range}
        >
          <div
            onMouseDown={this.state.disabled ? _noop() : this._handleTrackMouseDown}
            style={styles.trackHolder}
          >
            <div style={styles.track}></div>
            <div style={styles.selected}></div>
          </div>
          <div
            onMouseDown={this.state.disabled ? _noop() : this._handleDragStart}
            onTouchStart={this.state.disabled ? _noop() : this._handleDragStart}
            style={styles.toggle}
          >
          </div>
        </div>
      </div>
    );
  },

  styles () {
    return _merge({}, {
      component: {
        position: 'relative',
        fontSize: '11px',
        fontFamily: StyleConstants.FontFamily
      },
      range: {
        padding: '25px 0',
        margin: '0 15px'
      },
      track: {
        height: '1px',
        background: '#ccc'
      },
      trackHolder: {
        padding: '15px 0',
        cursor: this.state.disabled ? 'default' : 'pointer',
      },
      toggle: {
        width: '20px',
        height: '20px',
        borderRadius: '100%',
        background: '#fff',
        boxShadow: StyleConstants.ShadowLow,
        position: 'absolute',
        top: '50%',
        left: this.state.leftPixels,
        marginLeft: '15px',
        transform: 'translate(-50%, -50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        cursor: this.state.disabled ? 'default' : 'pointer',
        zIndex: 2
      },
      selected: {
        position: 'absolute',
        left: 10,
        width: this.state.leftPixels,
        background: this.props.selectedColor,
        height: '3px',
        top: '50%',
        transform: 'translateY(-50%)',
        WebkitTransform: 'translateY(-50%)',
        zIndex: 1
      }
    }, this.props.styles);
  }
});

module.exports = SimpleSlider;
