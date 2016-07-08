const React = require('react');

const defaultShape = {
  large: React.PropTypes.number,
  medium: React.PropTypes.number,
  small: React.PropTypes.number
};

const Column = React.createClass({
  propTypes: {
    offset: React.PropTypes.shape(defaultShape),
    span: React.PropTypes.shape(defaultShape)
  },

  getDefaultProps () {
    return {
      offset: {},
      span: { large: 12, medium: 12, small: 12 }
    };
  },

  getColumnWidths () {
    const colWidths = [];
    const small = this.props.span.small || 0;
    const medium = this.props.span.medium || 0;
    const large = this.props.span.large || 0;

    // Column widths
    if (small === 0) {
      colWidths.push('hidden-sm');
    } else {
      colWidths.push('col-sm-' + small);
    }

    if (medium === 0) {
      colWidths.push('hidden-md');
    } else if (medium !== small) {
      colWidths.push('col-md-' + medium);
    }

    if (large === 0) {
      colWidths.push('hidden-lg');
    } else if (large !== medium) {
      colWidths.push('col-lg-' + large);
    }

    return colWidths;
  },

  getColumnOffsets () {
    const offsets = [];
    const small = this.props.offset.small;
    const medium = this.props.offset.medium;
    const large = this.props.offset.large;

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

  render () {
    let className = [];

    // Column widths
    className = className.concat(this.getColumnWidths());

    // Column offsets
    className = className.concat(this.getColumnOffsets());

    return (
      <div className={className.join(' ')} style={{ boxSizing: 'border-box' }}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Column;
