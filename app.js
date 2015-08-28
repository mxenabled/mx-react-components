const React = require('react');
const Demo = require('./components/Demo');

const Docs = React.createClass({
  render () {
    return (
      <div>
        <h2>Demo</h2>
        <Demo />

        <h2>How To Use</h2>
      </div>
    );
  }
});


React.render(<Docs />, document.getElementById('docs'));