const React = require('react');

const { PaginationButtons } = require('mx-react-components');

const Markdown = require('components/Markdown');

const PaginationButtonsDocs = React.createClass({
  getInitialState () {
    return {
      currentPage: 1,
      totalPages: 5
    };
  },

  _handleButtonClick (nextPage) {
    this.setState({ currentPage: nextPage });
  },

  render () {
    return (
      <div>
        <h1>
          Pagination Buttons
          <label>A standard button group with 7 available styles used to navigate pagination.</label>
        </h1>

        <h3>Demo</h3>
        <PaginationButtons
          currentPage={this.state.currentPage}
          onClick={this._handleButtonClick}
          totalPages={this.state.totalPages}
          type='primaryOutline'
        />
        <h3>Usage</h3>
        <h5>currentPage <label>String</label></h5>
        <p>Default: 1</p>
        <p><em>(required)</em> The current page.</p>

        <h5>primaryColor <label>String</label></h5>
        <p>Default: Styles.Colors.PRIMARY</p>
        <p>The primary color used with the button styles.</p>

        <h5>totalPages <label>String</label></h5>
        <p><em>(required)</em> The total number of pages.</p>

        <h5>type <label>String</label></h5>
        <p>Default: 'primary'</p>
        <p>This sets the button type. Available options are 'primary', 'primaryOutline', 'primaryInverse', 'secondary', 'base', 'neutral', and 'disabled'. Setting the type to `disabled` also prevents onClick events from firing.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <Button primaryColor='#333333' type='secondary' />
  `}
        </Markdown>
      </div>
    );
  }
});

module.exports = PaginationButtonsDocs;
