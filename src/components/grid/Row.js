const React = require('react');

const Row = React.createClass({
  render () {
    return (
      <div className={'row'}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Row;