const PropTypes = require('prop-types')
const React = require('react')

const { themeShape } = require('../../constants/App')

const StyleUtils = require('../../utils/Style')

class ShadedHatchPatternRectangleGroup extends React.Component {
  static propTypes = {
    fillColor: PropTypes.string,
    height: PropTypes.number.isRequired,
    theme: themeShape,
    translation: PropTypes.string,
    width: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }

  static defaultProps = {
    translation: 'translate(0,0)',
  }

  render() {
    const theme = StyleUtils.mergeTheme(this.props.theme)
    const fillColor = this.props.fillColor || theme.Colors.GRAY_300

    return (
      <g className="shaded-hatch-pattern">
        <pattern height={4} id="diagonalHatch" patternUnits="userSpaceOnUse" width={4}>
          <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke={fillColor} strokeWidth={1} />
        </pattern>
        <rect
          fill={'url(#diagonalHatch)'}
          height={this.props.height}
          transform={this.props.translation}
          width={this.props.width}
          x={this.props.x}
          y={this.props.y}
        />
      </g>
    )
  }
}

module.exports = ShadedHatchPatternRectangleGroup
