const React = require('react');

class BreakPointGroup extends React.Component {
  static propTypes = {
    adjustedHeight: React.PropTypes.number.isRequired,
    adjustedWidth: React.PropTypes.number.isRequired,
    breakPointDate: React.PropTypes.number.isRequired,
    breakPointLabel: React.PropTypes.string.isRequired,
    margin: React.PropTypes.object.isRequired,
    translation: React.PropTypes.string,
    xScaleValueFunction: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    translation: 'translate(0,0)'
  };

  render () {
    const { adjustedHeight, adjustedWidth, breakPointDate, breakPointLabel, margin, translation, xScaleValueFunction } = this.props;
    const breakPointXValue = xScaleValueFunction(breakPointDate);
    const breakPointLabelOffSet = 10;
    const breakPointLabelYPosition = 40;

    return (
      <g className='break-point-items' transform={translation}>
        <line
          className='break-point-line'
          x1={breakPointXValue}
          x2={breakPointXValue}
          y1={margin.top}
          y2={adjustedHeight + margin.bottom}
        />
        {adjustedWidth - breakPointXValue - breakPointLabelOffSet > 100 ? (
          <text
            className='break-point-label'
            x={breakPointXValue + breakPointLabelOffSet}
            y={breakPointLabelYPosition}
          >
            {breakPointLabel}
          </text>
        ) : null}
      </g>
    );
  }
}

module.exports = BreakPointGroup;