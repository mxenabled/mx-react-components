const React = require('react');

class SlicesGroup extends React.Component {
  static propTypes = {
    adjustedHeight: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired,
    handleChartMouseOver: React.PropTypes.func.isRequired,
    sliceWidth: React.PropTypes.number.isRequired,
    translation: React.PropTypes.string.isRequired,
    xScaleValueFunction: React.PropTypes.func.isRequired
  };

  render () {
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