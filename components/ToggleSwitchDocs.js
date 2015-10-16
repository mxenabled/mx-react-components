const React = require('react');

const { ToggleSwitch } = require('mx-react-components');

const Markdown = require('components/Markdown');

const ToggleSwitchDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
          ToggleSwitch
          <label>An iOS style toggle for controlling boolean type values.</label>
        </h1>

        <h3>Demo</h3>
        <ToggleSwitch
          defaultPosition='right'
          trackStyle={{ boxSizing: 'content-box' }}
        />

        <h3>Usage</h3>
        <h5>activeColor <label>String</label></h5>
        <p>Default: `#359BCF`</p>
        <p>A css color value that sets the color of the active left or right label.</p>

        <h5>defaultPosition <label>String: `left`, `right`</label></h5>
        <p>Default: `left`</p>
        <p>Sets the default start position of the toggle. </p>

        <h5>inactiveColor <label>String</label></h5>
        <p>Default: `#999999`</p>
        <p>A css color value that sets the color of the inactive left or right label.</p>

        <h5>leftLabel <label>String</label></h5>
        <p>Default: `On`</p>
        <p>The text to display on the left side of the component.</p>

        <h5>onToggle <label>Function</label></h5>
        <p>A method that will be called whenever the toggle is clicked, or changes position. The method will be passed the active position, either `left` or `right`.</p>

        <h5>leftLabel <label>String</label></h5>
        <p>Default: `Off`</p>
        <p>The text to display on the right side of the component.</p>

        <h5>showLabels <label>Boolean</label></h5>
        <p>Default: `true`</p>
        <p>If set to `false`, then the left and right labels will not be rendered.</p>

        <h5>toggleStyle <label>Object or Array</label></h5>
        <p>A style object or Radium array that modifies the css styles of the toggle element.</p>

        <h5>trackStyle <label>Object or Array</label></h5>
        <p>A style object or Radium array that modifies the css styles of the track element.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <ToggleSwitch
      defaultPosition='right'
    />
  `}
        </Markdown>
      </div>
    );
  }
});

module.exports = ToggleSwitchDocs;