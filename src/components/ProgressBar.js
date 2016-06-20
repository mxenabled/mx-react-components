const React = require('react');
const _merge = require('lodash/merge');

const StyleConstants = require('../constants/Style');

const ProgressBar = React.createClass({
  propTypes: {
    baseColor: React.PropTypes.string,
    color: React.PropTypes.string,
    height: React.PropTypes.number,
    percentage: React.PropTypes.number,
    styles: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      baseColor: StyleConstants.Colors.FOG,
      color: StyleConstants.Colors.PRIMARY,
      height: 10
    };
  },

  render () {
    const styles = this.styles();

    return (
      <div style={styles.component}>
        <div style={styles.progress}>{this.props.children}</div>
      </div>
    );
  },

  styles () {
    return _merge({}, {
      component: {
        backgroundColor: this.props.baseColor,
        borderRadius: this.props.height / 4,
        height: this.props.height
      },
      progress: {
        backgroundColor: this.props.color,
        borderRadius: this.props.height / 4,
        height: this.props.height,
        width: this.props.percentage + '%'
      }
    }, this.props.styles);
  }
});

module.exports = ProgressBar;
