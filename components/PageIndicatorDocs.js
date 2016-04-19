const React = require('react');

const { Button } = require('mx-react-components');
const { PageIndicator } = require('mx-react-components');

const Markdown = require('components/Markdown');

const PageIndicatorDocs = React.createClass({
  getInitialState () {
    return {
      pageIndicatorIndex: 0
    };
  },

  _handlePageIndicatorClick (index) {
    this.setState({
      pageIndicatorIndex: index
    });
  },

  _handleNextPageIndicatorClick () {
    this.setState({
      pageIndicatorIndex: this.state.pageIndicatorIndex === 2 ? 0 : this.state.pageIndicatorIndex + 1
    });
  },

  render () {
    return (
      <div>
        <h1>
          Page Indicator
          <label>A component used to indicate simple paginated data such as onboarding slides.</label>
        </h1>

        <h3>Demo</h3>
        <div style={{ textAlign: 'center', fontSize: 20 }}>
          Current Page Indicator Index: {this.state.pageIndicatorIndex}
          <br/><br/>
          <Button onClick={this._handleNextPageIndicatorClick}>Next Page</Button>
          <PageIndicator activeIndex={this.state.pageIndicatorIndex} count={3} onClick={this._handlePageIndicatorClick} />
        </div>

        <h3>Usage</h3>
        <h5>activeIndex <label>Number</label></h5>
        <p>Default: 0</p>
        <p>The index of the active "page" or dot.</p>

        <h5>count <label>Number</label></h5>
        <p>The number of "pages" or dots to display.</p>

        <h5>OnClick <label>function</label></h5>
        <p>A function to be called when a dot is clicked. The function will be passed the index of the clicked dot.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    getInitialState () {
      return {
        pageIndicatorIndex: 0
      };
    },

    _handlePageIndicatorClick (index) {
      this.setState({
        pageIndicatorIndex: index
      });
    },

    <PageIndicator activeIndex={this.state.pageIndicatorIndex} count={3} onClick={this._handlePageIndicatorClick} />
  `}
        </Markdown>
      </div>
    );
  }
});

module.exports = PageIndicatorDocs;
