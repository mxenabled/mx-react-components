const PropTypes = require("prop-types");
const React = require("react");

const defaultShape = {
  large: PropTypes.number,
  medium: PropTypes.number,
  small: PropTypes.number
};

class Column extends React.Component {
  static propTypes = {
    offset: PropTypes.shape(defaultShape),
    relative: PropTypes.bool,
    span: PropTypes.shape(defaultShape)
  };

  static defaultProps = {
    offset: {},
    relative: true,
    span: { large: 12 }
  };

  getColumnWidths = () => {
    const colWidths = [];
    const { large, medium, small } = this.props.span;

    // Column widths
    if (small === 0) {
      colWidths.push("hidden-sm");
    } else if (small) {
      colWidths.push("col-sm-" + small);
    }

    if (medium === 0) {
      colWidths.push("hidden-md");
    } else if (medium && medium !== small) {
      colWidths.push("col-md-" + medium);
    }

    if (large === 0) {
      colWidths.push("hidden-lg");
    } else if (large && large !== medium) {
      colWidths.push("col-lg-" + large);
    }

    return colWidths;
  };

  getColumnOffsets = () => {
    const offsets = [];
    const small = this.props.offset.small;
    const medium = this.props.offset.medium;
    const large = this.props.offset.large;

    // Column offsets
    if (small >= 0) {
      offsets.push("col-sm-offset-" + small);
    }

    if (medium >= 0 && medium !== small) {
      offsets.push("col-md-offset-" + medium);
    }

    if (large >= 0 && large !== medium) {
      offsets.push("col-lg-offset-" + large);
    }

    return offsets;
  };

  render() {
    let className = [];

    // Column widths
    className = className.concat(this.getColumnWidths());

    // Column offsets
    className = className.concat(this.getColumnOffsets());

    return (
      <div
        className={className.join(" ")}
        style={{
          boxSizing: "border-box",
          position: this.props.relative ? "relative" : "static"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

module.exports = Column;
