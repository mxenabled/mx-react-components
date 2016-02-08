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
    const breakPointLabelOffSet = 10;

    return (
      <g className='break-point-items' ref='breakPointItems' transform={this.props.translation}>
        <line
          className='break-point-line'
          x1={this.props.xScaleValueFunction(this.props.breakPointDate)}
          x2={this.props.xScaleValueFunction(this.props.breakPointDate)}
          y1={this.props.margin.top}
          y2={this.props.adjustedHeight + this.props.margin.bottom}
        />
        <text
          className='break-point-label'
          x={this.props.xScaleValueFunction(this.props.breakPointDate) + breakPointLabelOffSet}
          y={40}
        >
          {this.props.breakPointLabel}
        </text>
      </g>
    );
  }
});

module.exports = BreakPointGroup;