const React = require('react');
const { RouteHandler } = require('react-router');

const Components = React.createClass({
  render () {
    return (
      <div>
        <div>
          Side Navigation
        </div>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Components;