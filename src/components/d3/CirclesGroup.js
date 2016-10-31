const React = require('react');

const StyleConstants = require('../../constants/Style');

const CirclesGroup = React.createClass({
  propTypes: {
    adjustedHeight: React.PropTypes.number.isRequired,
    circleColor: React.PropTypes.string,
    circleRadius: React.PropTypes.number,
    data: React.PropTypes.array.isRequired,
    shouldAnimate: React.PropTypes.bool,
    translation: React.PropTypes.string,
    xScaleValueFunction: React.PropTypes.func.isRequired,
    yScaleValueFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      circleColor: StyleConstants.Colors.CHARCOAL,
      circleRadius: 3,
      shouldAnimate: true,
      translation: 'translate(0,0)'
    };
  },

  componentDidMount () {
    this._animateCircles();
  },

  componentDidUpdate () {
    this._animateCircles();
  },

  _animateCircles () {
    if (this.props.shouldAnimate) {
      d3.select(this.refs.circleGroup).selectAll('.circle').data(this.props.data).transition().attr('cy', d => {
        return this.props.yScaleValueFunction(d.y);
      });
    }
  },

  render () {
    const { adjustedHeight, circleRadius, data, shouldAnimate, translation, xScaleValueFunction, yScaleValueFunction } = this.props;
    const preventCircleOverlapCutOff = 45;

    return (
      <g className='circle-group' ref='circleGroup' transform={translation}>
        {data.length <= preventCircleOverlapCutOff ? (
          data.map((item, index) => {
            const cx = xScaleValueFunction(item.x);
            const cy = shouldAnimate ? adjustedHeight : yScaleValueFunction(item.y);

            return (
              <circle
                className='circle'
                cx={cx}
                cy={cy}
                fill={StyleConstants.Colors.WHITE}
                key={index}
                r={circleRadius}
                stroke={this.props.circleColor}
              />
            );
          })
        ) : null}
      </g>
    );
  }
});

module.exports = CirclesGroup;