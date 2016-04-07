const React = require('react');

const StyleConstants = require('../constants/Style');

const PageIndicator = React.createClass({
  propTypes: {
    activeIndex: React.PropTypes.number,
    count: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func
  },

  _handleDotClick (index = 0) {
    if (this.props.onClick) {
      this.props.onClick(index);
    }
  },

  _renderDots () {
    const styles = this.styles();
    const dots = [];

    for (let i = 0; i < this.props.count; i++) {
      const dotStyles = this.props.activeIndex === i ? Object.assign({}, styles.dot, styles.dotActive) : styles.dot;

      dots.push(
        <span key={'dot' + i} onClick={this._handleDotClick.bind(null, i)} style={dotStyles} />
      );
    }

    return dots;
  },

  render () {
    const styles = this.styles();

    return (
      <div style={styles.component}>
        {this._renderDots()}
      </div>
    );
  },

  styles () {
    return {
      component: {
        textAlign: 'center',
        padding: '15px 0'
      },
      dot: {
        width: 6,
        height: 6,
        margin: 10,
        borderRadius: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
        backgroundColor: StyleConstants.Colors.FOG,
        cursor: 'pointer'
      },
      dotActive: {
        backgroundColor: StyleConstants.Colors.CHARCOAL
      }
    };
  }
});

module.exports = PageIndicator;