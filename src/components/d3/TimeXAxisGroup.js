const PropTypes = require('prop-types')
const React = require('react')

const d3 = require('d3')
const moment = require('moment')

class TimeXAxisGroup extends React.Component {
  static propTypes = {
    ticks: PropTypes.array.isRequired,
    tickSize: PropTypes.number,
    timeAxisFormat: PropTypes.string.isRequired,
    translation: PropTypes.string,
    xScaleFunction: PropTypes.func.isRequired,
  }

  static defaultProps = {
    tickSize: 6,
    translation: 'translate(0,0)',
  }

  componentDidMount() {
    this._renderAxis()
  }

  componentDidUpdate() {
    this._renderAxis()
  }

  _renderAxis = () => {
    const timeAxisFunction = d3.svg
      .axis()
      .scale(this.props.xScaleFunction())
      .tickSize(this.props.tickSize, this.props.tickSize)
      .tickValues(this.props.ticks)
      .tickFormat(d => {
        return moment.unix(d).format(this.props.timeAxisFormat)
      })

    d3.select(this.timeAxis).call(timeAxisFunction)
  }

  render() {
    return (
      <g
        className="time-axis"
        ref={ref => (this.timeAxis = ref)}
        transform={this.props.translation}
      />
    )
  }
}

module.exports = TimeXAxisGroup
