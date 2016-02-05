const React = require('react');
const ReactDom = require('react-dom');

const d3 = require('d3');

const StyleConstants = require('../../constants/Style');

const LineGroup = React.createClass({
  props: {
    adjustedHeight: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired,
    lineColor: React.PropTypes.string,
    shouldAnimate: React.PropTypes.bool,
    translate: React.PropTypes.string,
    xScaleValueFunction: React.PropTypes.func.isRequired,
    yScaleValueFunction: React.PropTypes.func.isRequired,
  },

  getDefaultProps () {
    return {
      lineColor: StyleConstants.Colors.CHARCOAL,
      shouldAnimate: true,
      translation: 'translate(0,0)'
    };
  },

  componentWillMount () {
    const flatLine = d3.svg.line()
      .x(d => {
        return this.props.xScaleValueFunction(d.x);
      })
      .y(d => {
        return this.props.adjustedHeight;
      });

    const line = d3.svg.line()
      .x(d => {
        return this.props.xScaleValueFunction(d.x);
      })
      .y(d => {
        return this.props.yScaleValueFunction(d.y);
      });

    this.setState({
      flatLine,
      line
    });
  },

  componentDidMount () {
    this._animateLine();
  },

  componentDidUpdate () {
    this._animateLine();
  },

  _animateLine () {
    if (this.props.shouldAnimate) {
      d3.select(this.refs.chartLine).transition().attr('d', this.state.line(this.props.data));
    }
  },

  render () {
    return (
      <g className='chart-line-group' ref='chartLineGroup' transform={this.props.translation}>
        <path
          d={this.props.shouldAnimate ? this.state.flatLine(this.props.data) : this.state.line(this.props.data) }
          fill='none'
          ref='chartLine'
          stroke={this.props.lineColor}
          strokeWidth={2}
        />
      </g>
    );
  }
});

module.exports = LineGroup;