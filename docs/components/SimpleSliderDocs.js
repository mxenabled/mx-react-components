const React = require('react');

const { SimpleSlider } = require('mx-react-components');

const Markdown = require('components/Markdown');

const SimpleSliderDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
          Simple Slider
          <label>A simple slider bar</label>
        </h1>

        <h3>Demo</h3>
        <SimpleSlider defaultValue={5} />

        <h3>Usage</h3>
        <h5>test <label>test</label></h5>
        <p></p>


        <h3>Example</h3>
        <Markdown>
          {`
            <SimpleSlider
            />
          `}
        </Markdown>


      </div>
    );
  }
});

module.exports = SimpleSliderDocs;

