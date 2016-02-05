const React = require('react');

const StyleConstants = require('../../constants/Style');

const CirclesGroup = React.createClass({
  propTypes: {
    adjustedHeight: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired,
    shouldAnimate: React.PropTypes.bool,
    translation: React.PropTypes.string,
    xScaleValueFunction: React.PropTypes.func.isRequired,
    yScaleValueFunction: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
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
    return (
      <g className='circle-group' ref='circleGroup' transform={this.props.translation}>
        {this.props.data.length <= 45 ? (
          this.props.data.map((item, index) => {
            const cx = this.props.xScaleValueFunction(item.x);
            const cy = this.props.shouldAnimate ? this.props.adjustedHeight : this.props.yScaleValueFunction(item.y);

            return (
              <circle
                className='circle'
                cx={cx}
                cy={cy}
                fill={StyleConstants.Colors.WHITE}
                key={index}
                r={3}
                stroke={StyleConstants.Colors.CHARCOAL}
              />
            );
          })
        ) : null}
      </g>
    );
  }
});

module.exports = CirclesGroup;