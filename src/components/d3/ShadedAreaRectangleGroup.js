const React = require('react');

const StyleConstants = require('../../constants/Style');

class ShadedAreaRectangleGroup extends React.Component {
  static propTypes = {
    fillColor: React.PropTypes.string,
    fillOpacity: React.PropTypes.number,
    height: React.PropTypes.number.isRequired,
    translation: React.PropTypes.string,
    width: React.PropTypes.number.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  };

  static defaultProps = {
    fillColor: StyleConstants.Colors.FOG,
    fillOpacity: 0.1,
    translation: 'translate(0,0)'
  };

  render () {
    return (
      <g className='shaded-area'>
        <rect
          fill={this.props.fillColor}
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