'use strict';

var React = require('react');

var Container = React.createClass({
  displayName: 'Container',

  propTypes: {
    fluid: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      fluid: true
    };
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'container' + (this.props.fluid ? '-fluid' : ''), style: { boxSizing: 'border-box' } },
      this.props.children
    );
  }
});

module.exports = Container;