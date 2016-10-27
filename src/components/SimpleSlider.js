const React = require('react');

const StyleConstants = require('../constants/Style');

const SimpleSlider = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.number,
    onDragStop: React.PropTypes.func,
    selectedColor: React.PropTypes.string,
    updateOnDrag: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      defaultValue: 0
    };
  },

  render () {
    const styles = this.styles();

    return (
      <div style={styles.component}>
        test
      </div>
    );
  },

  styles () {
    return {
      component: {
        position: 'relative',
        fontSize: '11px',
        fontFamily: StyleConstants.FontFamily
      },
      track: {
        height: '1px',
        background: '#ccc'
      },
      trackHolder: {
        padding: '15px 0',
        cursor: 'pointer'
      },
      toggle: {
        width: '20px',
        height: '20px',
        borderRadius: '100%',
        background: '#fff',
        boxShadow: StyleConstants.ShadowLow,
        position: 'absolute',
        top: '50%',
        marginLeft: '10px',
        transform: 'translate(-50%, -50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: 1
      }
    };
  }
});

module.exports = SimpleSlider;
