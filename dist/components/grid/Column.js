'use strict';

var React = require('react');

var defaultShape = {
  large: React.PropTypes.number,
  medium: React.PropTypes.number,
  small: React.PropTypes.number
};

var Column = React.createClass({
  displayName: 'Column',

  propTypes: {
    offset: React.PropTypes.shape(defaultShape),
    relative: React.PropTypes.bool,
    span: React.PropTypes.shape(defaultShape)
  },

  getDefaultProps: function getDefaultProps() {
    return {
      offset: {},
      relative: true,
      span: { large: 12 }
    };
  },
  getColumnWidths: function getColumnWidths() {
    var colWidths = [];
    var _props$span = this.props.span,
        large = _props$span.large,
        medium = _props$span.medium,
        small = _props$span.small;

    // Column widths

    if (small === 0) {
      colWidths.push('hidden-sm');
    } else if (small) {
      colWidths.push('col-sm-' + small);
    }

    if (medium === 0) {
      colWidths.push('hidden-md');
    } else if (medium && medium !== small) {
      colWidths.push('col-md-' + medium);
    }

    if (large === 0) {
      colWidths.push('hidden-lg');
    } else if (large && large !== medium) {
      colWidths.push('col-lg-' + large);
    }

    return colWidths;
  },
  getColumnOffsets: function getColumnOffsets() {
    var offsets = [];
    var small = this.props.offset.small;
    var medium = this.props.offset.medium;
    var large = this.props.offset.large;

    // Column offsets
    if (small >= 0) {
      offsets.push('col-sm-offset-' + small);
    }

    if (medium >= 0 && medium !== small) {
      offsets.push('col-md-offset-' + medium);
    }

    if (large >= 0 && large !== medium) {
      offsets.push('col-lg-offset-' + large);
    }

    return offsets;
  },
  render: function render() {
    var className = [];

    // Column widths
    className = className.concat(this.getColumnWidths());

    // Column offsets
    className = className.concat(this.getColumnOffsets());

    return React.createElement(
      'div',
      { className: className.join(' '), style: { boxSizing: 'border-box', position: this.props.relative ? 'relative' : 'static' } },
      this.props.children
    );
  }
});

module.exports = Column;