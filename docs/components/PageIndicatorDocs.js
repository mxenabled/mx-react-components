// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router-dom');

const { PageIndicator } = require('mx-react-components');

const Markdown = require('components/Markdown');

class PageIndicatorDocs extends React.Component {
  state = {
    pageIndicatorIndex: 0
  };

  _handlePageIndicatorClick = (index) => {
    this.setState({
      pageIndicatorIndex: index
    });
  };

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

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

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
}

module.exports = PageIndicatorDocs;
