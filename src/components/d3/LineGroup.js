const PropTypes = require('prop-types');
const React = require('react');

const d3 = require('d3');

const { themeShape } = require('../../constants/App');

const StyleUtils = require('../../utils/Style');

class LineGroup extends React.Component {
  static propTypes = {
    adjustedHeight: PropTypes.number.isRequired,
    dashLine: PropTypes.bool,
    data: PropTypes.array.isRequired,
    lineColor: PropTypes.string,
    shouldAnimate: PropTypes.bool,
    strokeWidth: PropTypes.number,
    theme: themeShape,
    translation: PropTypes.string,
    xScaleValueFunction: PropTypes.func.isRequired,
    yScaleValueFunction: PropTypes.func.isRequired
  };

  static defaultProps = {
    dashLine: false,
    shouldAnimate: true,
    strokeWidth: 2,
    translation: 'translate(0,0)'
  };

  componentWillMount () {
    const flatLine = d3.svg.line()
      .x(d => {
        return this.props.xScaleValueFunction(d.x);
      })
      .y(() => {
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
  }

  componentDidMount () {
    this._animateLine();
  }

  componentDidUpdate () {
    this._animateLine();
  }

  _animateLine = () => {
    if (this.props.shouldAnimate) {
      d3.select(this.chartLine).transition().attr('d', this.state.line(this.props.data));
    }
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const lineColor = this.props.lineColor || theme.Colors.GRAY_700;
    const { data, dashLine, shouldAnimate, strokeWidth, translation } = this.props;

    return (
      <g className='chart-line-group' transform={translation}>
        <path
          d={shouldAnimate ? this.state.flatLine(data) : this.state.line(data) }
          fill='none'
          ref={(ref) => this.chartLine = ref}
          stroke={lineColor}
          strokeDasharray={dashLine ? '4,4' : 'none'}
          strokeWidth={strokeWidth}
        />
      </g>
    );
  }
}

module.exports = LineGroup;
