const PropTypes = require('prop-types');
const React = require('react');
const _merge = require('lodash/merge');

const StyleConstants = require('../constants/Style');

const ProgressBar = React.createClass({
  propTypes: {
    baseColor: PropTypes.string,
    height: PropTypes.number,
    percentage: PropTypes.number,
    progressColor: PropTypes.string,
    styles: PropTypes.object
  },

  getDefaultProps () {
    return {
      baseColor: StyleConstants.Colors.FOG,
      height: 10,
      progressColor: StyleConstants.Colors.PRIMARY
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
        backgroundColor: this.props.progressColor,
        borderRadius: this.props.height / 4,
        height: this.props.height,
        width: this.props.percentage > 100 ? '100%' : this.props.percentage + '%'
      }
    }, this.props.styles);
  }
});

module.exports = ProgressBar;
