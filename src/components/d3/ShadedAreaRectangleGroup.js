const PropTypes = require('prop-types');
const React = require('react');

const StyleConstants = require('../../constants/Style');

const ShadedAreaRectangleGroup = React.createClass({
  propTypes: {
    fillColor: PropTypes.string,
    fillOpacity: PropTypes.number,
    height: PropTypes.number.isRequired,
    translation: PropTypes.string,
    width: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  },

  getDefaultProps () {
    return {
      fillColor: StyleConstants.Colors.FOG,
      fillOpacity: 0.1,
      translation: 'translate(0,0)'
    };
  },

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
});

module.exports = ShadedAreaRectangleGroup;