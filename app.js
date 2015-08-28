const React = require('react');
const IconDocs = require('./components/Icon');
const SelectDocs = require('./components/Select')

const Docs = React.createClass({
  render () {
    return (
      <div>
        <IconDocs />
        <SelectDocs />
      </div>
    );
  }
});


React.render(<Docs />, document.getElementById('docs'));