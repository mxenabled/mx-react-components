'use strict';

var React = require('react');
var _merge = require('lodash/merge');

var StyleConstants = require('../constants/Style');

var ProgressBar = React.createClass({
  displayName: 'ProgressBar',

  propTypes: {
    baseColor: React.PropTypes.string,
    height: React.PropTypes.number,
    percentage: React.PropTypes.number,
    progressColor: React.PropTypes.string,
    styles: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      baseColor: StyleConstants.Colors.FOG,
      height: 10,
      progressColor: StyleConstants.Colors.PRIMARY
    };
  },
  render: function render() {
    var styles = this.styles();

    return React.createElement(
      'div',
      { style: styles.component },
      React.createElement(
        'div',
        { style: styles.progress },
        this.props.children
      )
    );
  },
  styles: function styles() {
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