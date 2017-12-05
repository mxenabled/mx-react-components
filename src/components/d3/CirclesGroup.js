const PropTypes = require("prop-types");
const React = require("react");

const { themeShape } = require("../../constants/App");

const StyleUtils = require("../../utils/Style");

class CirclesGroup extends React.Component {
  static propTypes = {
    adjustedHeight: PropTypes.number.isRequired,
    circleColor: PropTypes.string,
    circleOverlayRadius: PropTypes.number,
    circleRadius: PropTypes.number,
    data: PropTypes.array.isRequired,
    onCircleClick: PropTypes.func,
    shouldAnimate: PropTypes.bool,
    strokeWidth: PropTypes.number,
    theme: themeShape,
    translation: PropTypes.string,
    useCircleOverlay: PropTypes.bool,
    xScaleValueFunction: PropTypes.func.isRequired,
    yScaleValueFunction: PropTypes.func.isRequired
  };

  static defaultProps = {
    circleOverlayRadius: 6,
    circleRadius: 3,
    onCircleClick: () => {},
    shouldAnimate: true,
    strokeWidth: 2,
    translation: "translate(0,0)",
    useCircleOverlay: false
  };

  componentDidMount() {
    this._animateCircles();
  }

  componentDidUpdate() {
    this._animateCircles();
  }

  _animateCircles = () => {
    if (this.props.shouldAnimate) {
      d3
        .select(this.circleGroup)
        .selectAll(".circle")
        .data(this.props.data)
        .transition()
        .attr("cy", d => {
          return this.props.yScaleValueFunction(d.y);
        });
    }
  };

  render() {
    const {
      adjustedHeight,
      circleOverlayRadius,
      circleRadius,
      data,
      shouldAnimate,
      translation,
      useCircleOverlay,
      xScaleValueFunction,
      yScaleValueFunction
    } = this.props;
    const preventCircleOverlapCutOff = 45;
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const circleColor = this.props.circleColor || theme.Colors.GRAY_700;

    return (
      <g
        className="circle-group"
        ref={ref => (this.circleGroup = ref)}
        transform={translation}
      >
        {data.length <= preventCircleOverlapCutOff
          ? data.map((item, index) => {
              const cx = xScaleValueFunction(item.x);
              const cy = shouldAnimate
                ? adjustedHeight
                : yScaleValueFunction(item.y);

              return (
                <g key={index}>
                  <circle
                    className="circle"
                    cx={cx}
                    cy={cy}
                    fill={theme.Colors.WHITE}
                    onClick={() => {
                      if (!useCircleOverlay) {
                        this.props.onCircleClick(item);
                      }
                    }}
                    r={circleRadius}
                    stroke={circleColor}
                    style={{ strokeWidth: this.props.strokeWidth }}
                  />
                  {useCircleOverlay && (
                    <circle
                      className="circle-overlay"
                      cx={cx}
                      cy={yScaleValueFunction(item.y)}
                      fill={theme.Colors.WHITE}
                      onClick={() => {
                        this.props.onCircleClick(item);
                      }}
                      r={circleOverlayRadius}
                      style={{ fillOpacity: 0 }}
                    />
                  )}
                </g>
              );
            })
          : null}
      </g>
    );
  }
}

module.exports = CirclesGroup;
