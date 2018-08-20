// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router');

const { PaginationButtons } = require('mx-react-components');

const Code = require('components/Code');
const Markdown = require('components/Markdown');

class PaginationButtonsDocs extends React.Component {
  state = {
    currentPage: 4,
    totalPages: 20
  };

  _handleButtonClick = (nextPage) => {
    this.setState({ currentPage: nextPage });
  };

  render () {
    return (
      <div>
        <h1>
          Pagination Buttons
          <label>A button group used to navigate pagination.</label>
        </h1>

        <h3>Demo</h3>
        <PaginationButtons
          currentPage={this.state.currentPage}
          onClick={this._handleButtonClick}
          totalPages={this.state.totalPages}
        />
        <h3>Usage</h3>
        <h5>currentPage <label>Number</label></h5>
        <p>Default: 1</p>
        <p><em>(required)</em> The current page.</p>

        <h5>onClick <label>Function</label></h5>
        <p>Function used to handle button click event. Returns the number clicked.</p>
        <p>If prev/next button is clicked, the number returned is -1/+1 the current page number.</p>

        <h5>pageRange <label>Number</label></h5>
        <p>Default: 9</p>
        <p>The number of page buttons (not including prev/next buttons) shown in the button group.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

        <h5>totalPages <label>Number</label></h5>
        <p><em>(required)</em> The total number of pages.</p>

        <h5>type <label>String</label></h5>
        <p>Default: <Code>'primary'</Code></p>
        <p>The sets the button type.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <PaginationButtons
      currentPage={4}
      onClick={this._handleButtonClick}
      totalPages={25}
    />
  `}
        </Markdown>
      </div>
    );
  }
}

module.exports = PaginationButtonsDocs;
