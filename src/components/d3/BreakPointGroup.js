const React = require('react');

const BreakPointGroup = React.createClass({
  propTypes: {
    adjustedHeight: React.PropTypes.number.isRequired,
    breakPointDate: React.PropTypes.number.isRequired,
    breakPointLabel: React.PropTypes.string.isRequired,
    margin: React.PropTypes.object.isRequired,
    translation: React.PropTypes.string,
    xScaleValueFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      translation: 'translate(0,0)'
    };
  },

  render () {
    const { adjustedHeight, breakPointDate, breakPointLabel, margin, translation, xScaleValueFunction } = this.props;
    const breakPointXValue = xScaleValueFunction(breakPointDate);
    const breakPointLabelOffSet = 10;
    const breakPointLabelYPosition = 40;

    return (
      <g className='break-point-items' ref='breakPointItems' transform={translation}>
        <line
          className='break-point-line'
          x1={breakPointXValue}
          x2={breakPointXValue}
          y1={this.props.margin.top}
          y2={this.props.adjustedHeight + this.props.margin.bottom}
        />
        <text
          className='break-point-label'
          x={breakPointXValue + breakPointLabelOffSet}
          y={breakPointLabelYPosition}
        >
          {breakPointLabel}
        </text>
      </g>
    );
  }
});

module.exports = BreakPointGroup;