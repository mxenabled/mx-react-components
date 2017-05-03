const PropTypes = require('prop-types');
const React = require('react');

class SlicesGroup extends React.Component {
  static propTypes = {
    adjustedHeight: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    handleChartMouseOver: PropTypes.func.isRequired,
    sliceWidth: PropTypes.number.isRequired,
    translation: PropTypes.string.isRequired,
    xScaleValueFunction: PropTypes.func.isRequired
  };

  render() {
    return (
      <g className='slices'>
        {this.props.data.map((dataPoint, index) => {
          return (
            <rect
              height={this.props.adjustedHeight}
              key={'slice-' + index}
              onMouseOver={this.props.handleChartMouseOver.bind(null, dataPoint)}
              opacity={0}
              transform={this.props.translation}
              width={this.props.sliceWidth}
              x={this.props.xScaleValueFunction(dataPoint.x) - this.props.sliceWidth / 2}
              y={0}
            />
          );
        })}
      </g>
    );
  }
}

module.exports = SlicesGroup;