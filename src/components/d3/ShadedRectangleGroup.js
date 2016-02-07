const React = require('react');

const StyleConstants = require('../../constants/Style');

const ShadedRectangleGroup = React.createClass({
  propTypes: {
    fillColor: React.PropTypes.string,
    height: React.PropTypes.number.isRequired,
    translation: React.PropTypes.string,
    width: React.PropTypes.number.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  },

  getDefaultProps () {
    return {
      fillColor: StyleConstants.Colors.FOG,
      translation: 'translate(0,0)'
    };
  },

  render () {
    const xValue = this.props.x < 0 ? 0 : this.props.x;
    const width = this.props.width < 0 ? 0 : this.props.width;
    const adjustedWidth = width - xValue;

    return (
      <g className='future-shade-pattern' ref='futureShadePattern'>
        <pattern
          height={4}
          id='diagonalHatch'
          patternUnits='userSpaceOnUse'
          width={4}
        >
          <path
            d='M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2'
            stroke={this.props.fillColor}
            strokeWidth={1}
          />
        </pattern>
        <rect
          fill={'url(#diagonalHatch)'}
          height={this.props.height}
          transform={this.props.translation}
          width={adjustedWidth}
          x={xValue}
          y={this.props.y}
        />
      </g>
    );
  }
});

module.exports = ShadedRectangleGroup;