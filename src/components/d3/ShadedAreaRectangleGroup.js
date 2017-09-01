const PropTypes = require('prop-types');
const React = require('react');

const { themeShape } = require('../../constants/App');

const StyleUtils = require('../../utils/Style');

class ShadedAreaRectangleGroup extends React.Component {
  static propTypes = {
    fillColor: PropTypes.string,
    fillOpacity: PropTypes.number,
    height: PropTypes.number.isRequired,
    theme: themeShape,
    translation: PropTypes.string,
    width: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  };

  static defaultProps = {
    fillOpacity: 0.1,
    translation: 'translate(0,0)'
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const fillColor = this.props.fillColor || theme.Colors.GRAY_300;

    return (
      <g className='shaded-area'>
        <rect
          fill={fillColor}
          fillOpacity={this.props.fillOpacity}
          height={this.props.height}
          transform={this.props.translation}
          width={this.props.width}
          x={this.props.x}
          y={this.props.y}
        />
      </g>
    );
  }
}

module.exports = ShadedAreaRectangleGroup;
