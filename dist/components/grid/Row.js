'use strict';

var React = require('react');

var Row = React.createClass({
  displayName: 'Row',
  render: function render() {
    return React.createElement(
      'div',
      { className: 'row', style: { boxSizing: 'border-box' } },
      this.props.children
    );
  }
});

module.exports = Row;