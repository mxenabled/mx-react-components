const PropTypes = require('prop-types');
const React = require('react');

class BreakPointGroup extends React.Component {
  static propTypes = {
    adjustedHeight: PropTypes.number.isRequired,
    adjustedWidth: PropTypes.number.isRequired,
    breakPointDate: PropTypes.number.isRequired,
    breakPointLabel: PropTypes.string.isRequired,
    margin: PropTypes.object.isRequired,
    translation: PropTypes.string,
    xScaleValueFunction: PropTypes.func.isRequired
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