const React = require('react');

const defaultSpanOffset = { large: 0, medium: 0, small: 0 };

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
      offset: defaultSpanOffset,
      span: defaultSpanOffset
    };
  },

  getColumnWidths () {
    const colWidths = [];

    // Column widths
    if (this.props.span.small !== 0) {
      colWidths.push('col-sm-' + this.props.span.small);
    }
    if (this.props.span.medium !== 0 && this.props.span.medium !== this.props.span.small) {
      colWidths.push('col-md-' + this.props.span.medium);
    }
    if (this.props.span.large !== 0 && this.props.span.large !== this.props.span.medium) {
      colWidths.push('col-lg-' + this.props.span.large);
    }

    return colWidths;
  },

  getColumnOffsets () {
    const offsets = [];

    // Column offsets
    if (this.props.offset.small !== 0) {
      offsets.push('col-sm-offset-' + this.props.offset.small);
    }
    if (this.props.offset.medium !== 0 && this.props.offset.medium !== this.props.offset.small) {
      offsets.push('col-md-offset-' + this.props.offset.medium);
    }
    if (this.props.offset.large !== 0 && this.props.offset.large !== this.props.offset.medium) {
      offsets.push('col-lg-offset-' + this.props.offset.large);
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
      <div className={className.join(' ')}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Column;