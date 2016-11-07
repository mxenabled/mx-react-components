const React = require('react');

const { SimpleSlider } = require('mx-react-components');

const Markdown = require('components/Markdown');

const SimpleSliderDocs = React.createClass({
  getInitialState () {
    return {
      percent: 0
    };
  },

  _handleSliderChange (percent) {
    this.setState({ percent });
  },

  render () {
    return (
      <div>
        <h1>
          Simple Slider
          <label>A simple slider bar</label>
        </h1>

        <h3>Demo</h3>
        <div>{this.state.percent}</div>
        <SimpleSlider onPercentChange={this._handleSliderChange} percent={this.state.percent} />

        <h3>Usage</h3>
        <h5>percent <label>Number</label> <em>Required</em></h5>
        <p>This prop moves the slider to the assigned postion. It is passed in as a number between 0 and 1. So 0.75 would put the slider at 75% of the total distance.</p>

        <h5>disabled <label>bool</label></h5>
        <p>When true, the slider is disabled. This defaults to false.</p>

        <h5>onPercentChange <label>func</label> <em>Required</em></h5>
        <p>When the slider is moved, your callback function is called and the current percent is passed as a param. The current percent is a number between 0 and 1.</p>

        <h5>selectedColor <label>string</label></h5>
        <p>This sets the slider bar color.</p>


        <h3>Example</h3>
        <Markdown>
          {`
            <SimpleSlider
              percent={this.state.percent}
              selectedColor='#359BCF'
              onPercentChange={this._myCallbackFunction}
            />
          `}
        </Markdown>
      </div>
    );
  }
});

module.exports = SimpleSliderDocs;

