const React = require('react');

const StyleConstants = require('../../constants/Style');

const CirclesGroup = React.createClass({
  propTypes: {
    adjustedHeight: React.PropTypes.number.isRequired,
    circleColor: React.PropTypes.string,
    circleOverlayRadius: React.PropTypes.number,
    circleRadius: React.PropTypes.number,
    data: React.PropTypes.array.isRequired,
    onCircleClick: React.PropTypes.func,
    shouldAnimate: React.PropTypes.bool,
    strokeWidth: React.PropTypes.number,
    translation: React.PropTypes.string,
    useCircleOverlay: React.PropTypes.bool,
    xScaleValueFunction: React.PropTypes.func.isRequired,
    yScaleValueFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      circleColor: StyleConstants.Colors.CHARCOAL,
      circleOverlayRadius: 6,
      circleRadius: 3,
      onCircleClick: () => {},
      shouldAnimate: true,
      strokeWidth: 2,
      translation: 'translate(0,0)',
      useCircleOverlay: false
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
      d3.select(this.circleGroup).selectAll('.circle').data(this.props.data).transition().attr('cy', d => {
        return this.props.yScaleValueFunction(d.y);
      });
    }
  },

  render () {
    const { adjustedHeight, circleRadius, data, shouldAnimate, translation, xScaleValueFunction, yScaleValueFunction } = this.props;
    const preventCircleOverlapCutOff = 45;

    return (
      <g
        className='circle-group'
        ref={(ref) => this.circleGroup = ref}
        transform={translation}
      >
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
                onClick={() => {
                  this.props.onCircleClick(item);
                }}
                r={circleRadius}
                stroke={this.props.circleColor}
                style={{ 'stroke-width': this.props.strokeWidth }}
              />
            );
          })
        ) : null}
      </g>
    );
  }
});

module.exports = CirclesGroup;