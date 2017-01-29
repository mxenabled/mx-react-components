const React = require('react');
const d3 = require('d3');

const ChartUtils = require('../../utils/Chart');

class AxisGroup extends React.Component {
  static propTypes = {
    axis: React.PropTypes.string.isRequired,
    axisFormatFunction: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired,
    orientation: React.PropTypes.string.isRequired,
    scaleFunction: React.PropTypes.func.isRequired,
    translation: React.PropTypes.string
  };

  static defaultProps = {
    translation: 'translate(0,0)'
  };

  componentDidMount() {
    this._renderAxis();
  }

  componentDidUpdate() {
    this._renderAxis();
  }

  _renderAxis = () => {
    const max = d3.max(this.props.data, d => d[this.props.axis]);
    const min = d3.min(this.props.data, d => d[this.props.axis]);
    const { tickValues } = ChartUtils.getAxisTickSpecification(min, max);

    const axisFunction = d3.svg.axis()
      .scale(this.props.scaleFunction())
      .orient(this.props.orientation)
      .tickFormat(this.props.axisFormatFunction)
      .ticks(tickValues.length)
      .tickValues(tickValues);

    d3.select(this.axisGroup).call(axisFunction);
  };

  render() {
    return (
      <g
        className={this.props.axis + '-axis'}
        ref={(ref) => this.axisGroup = ref}
        transform={this.props.translation}
      />
    );
  }
}

module.exports = AxisGroup;