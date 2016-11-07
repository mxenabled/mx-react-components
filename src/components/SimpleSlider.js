const React = require('react');
const ReactDOM = require('react-dom');
const Radium = require('radium');
const _merge = require('lodash/merge');

const StyleConstants = require('../constants/Style');

const SimpleSlider = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,
    onPercentChange: React.PropTypes.func.isRequired,
    percent: React.PropTypes.number.isRequired,
    selectedColor: React.PropTypes.string,
    styles: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      selectedColor: StyleConstants.Colors.PRIMARY
    };
  },

  getInitialState () {
    return {
      dragging: false,
      leftPixels: 0
    };
  },

  componentDidMount () {
    this._setDefaults();
  },

  componentWillReceiveProps (newProps) {
    const leftPixels = (newProps.percent * this.state.width);

    this.setState({ leftPixels });
  },

  _setDefaults () {
    const component = ReactDOM.findDOMNode(this.rangeSelectorRef);
    const componentStyles = window.getComputedStyle(component);
    const width = parseInt(componentStyles.width, 0);
    const leftPixels = this.props.percent * width;

    this.setState({ width, leftPixels });
  },

  _handleMouseEvents (e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const leftSpace = ReactDOM.findDOMNode(this.rangeSelectorRef).getBoundingClientRect().left;
    let currentPercent = ((clientX - leftSpace) / this.state.width);

    if (currentPercent < 0) {
      currentPercent = 0;
    } else if (currentPercent > 1) {
      currentPercent = 1;
    }

    this.props.onPercentChange(currentPercent);
  },

  _handleTrackMouseDown (e) {
    this._handleMouseEvents(e);
  },

  _handleDragStart () {
    this.setState({
      dragging: true
    });
  },

  _handleDragging (e) {
    if (this.state.dragging) {
      this._handleMouseEvents(e);
    }
  },

  _handleDragEnd () {
    this.setState({
      dragging: false
    });
  },

  render () {
    const styles = this.styles();

    return (
      <div style={styles.component}>
        <div
          onMouseLeave={this.props.disabled ? null : this._handleDragEnd}
          onMouseMove={this.props.disabled ? null : this._handleDragging}
          onMouseUp={this.props.disabled ? null : this._handleDragEnd}
          onTouchEnd={this.props.disabled ? null : this._handleDragEnd}
          onTouchMove={this.props.disabled ? null : this._handleDragging}
          ref={(ref) => {
            this.rangeSelectorRef = ref;
          }}
          style={styles.range}
        >
          <div
            onMouseDown={this.props.disabled ? null : this._handleTrackMouseDown}
            style={styles.trackHolder}
          >
            <div style={styles.track}></div>
            <div style={styles.selected}></div>
          </div>
          <div
            onMouseDown={this.props.disabled ? null : this._handleDragStart}
            onTouchStart={this.props.disabled ? null : this._handleDragStart}
            style={styles.toggle}
          >
          </div>
        </div>
      </div>
    );
  },

  styles () {
    let cursorStyle = 'grab';

    if (this.props.disabled) {
      cursorStyle = 'not-allowed';
    }
    if (this.state.dragging) {
      cursorStyle = 'grabbing';
    }

    return _merge({}, {
      component: {
        position: 'relative',
        fontFamily: StyleConstants.FontFamily
      },
      range: {
        padding: '25px 0',
        margin: `0 ${StyleConstants.Spacing.MEDIUM}px`
      },
      track: {
        height: '1',
        background: '#ccc'
      },
      trackHolder: {
        padding: `${StyleConstants.Spacing.MEDIUM}px 0`,
        cursor: cursorStyle
      },
      toggle: {
        width: StyleConstants.Spacing.LARGE,
        height: StyleConstants.Spacing.LARGE,
        borderRadius: '100%',
        background: '#fff',
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
        height: '3',
        top: '50%',
        transform: 'translateY(-50%)',
        WebkitTransform: 'translateY(-50%)',
        zIndex: 1
      }
    }, this.props.styles);
  }
});

module.exports = Radium(SimpleSlider);
