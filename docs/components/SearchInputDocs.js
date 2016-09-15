const React = require('react');

const { SearchInput } = require('mx-react-components');

const Markdown = require('components/Markdown');

const SearchInputDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
          Search Input
          <label>A search input box</label>
        </h1>

        <h3>Demo</h3>
        <SearchInput
          placeholder='Type to search'
        />

        <h3>Usage</h3>
        <h5>onBlur <label>Function</label></h5>
        <p>A method to be called when the user clicks the mouse outside the component.</p>

        <h5>onChange <label>Function</label></h5>
        <p>A method to be called as the user types in the search input field.</p>

        <h5>placeholder <label>String</label></h5>
        <p>The text to show before the user starts typing or when the search input field is empty.</p>

        <h5>searchKeyword <label>String</label></h5>
        <p>Sets the value of the search input field.</p>


        <h3>Example</h3>
        <Markdown>
        {`
          <SearchInput
            placeholder='Type to search'
          />
        `}
        </Markdown>
      </div>
    );
  }
});

module.exports = SearchInputDocs;
