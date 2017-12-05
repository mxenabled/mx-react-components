const React = require("react");
const { Link } = require("react-router");

const { ProgressBar } = require("mx-react-components");

const Markdown = require("components/Markdown");

class ProgressBarDocs extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Progress Bar
          <label>A component used to show progress.</label>
        </h1>

        <h3>Demo</h3>
        <ProgressBar percentage={50} />
        <br />
        <br />
        <ProgressBar
          baseColor="#ACB0B3"
          percentage={50}
          progressColor="#2EBE51"
          styles={{ component: { width: "80%" } }}
        />

        <h3>Usage</h3>
        <h5>
          baseColor <label>string</label>
        </h5>
        <p>Default: GRAY_300</p>
        <p>An hex color string used to set the base of the bar</p>

        <h5>
          children <label>Node</label>
        </h5>
        <p>An element to be displayed in the progress bar</p>

        <h5>
          height <label>Number</label>
        </h5>
        <p>Default: 10</p>
        <p>The height, in pixels of the bar</p>

        <h5>
          percentage <label>Number</label>
        </h5>
        <p>
          The percentage of the progress portion of the bar. Expressed in the
          percentage value, ie: 50 for 50%
        </p>

        <h5>
          progressColor <label>String</label>
        </h5>
        <p>Default: PRIMARY (#359BCF)</p>
        <p>An hex color string used to set the progress of the bar</p>

        <h5>
          styles <label>Objext</label>
        </h5>
        <p>
          A nested styles object used to override the `component` and/or
          `progress` divs in the component. This can also be used in place of
          the height and bar colors.
        </p>

        <h5>
          theme <label>Object</label>
        </h5>
        <p>
          Customize the component&apos;s look. See{" "}
          <Link to="/components/theme">Theme</Link> for more information.
        </p>

        <h3>Example</h3>
        <Markdown>
          {`
            <ProgressBar percentage={50} />
            <ProgressBar
              baseColor='#ACB0B3'
              percentage={50}
              progressColor='#2EBE51'
              styles={{ component: { width: '80%' } }}
            />
          `}
        </Markdown>
      </div>
    );
  }
}

module.exports = ProgressBarDocs;
