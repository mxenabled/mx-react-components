const React = require('react');

const Row = React.createClass({
  render () {
    return (
      <div className={'row'} style={{ boxSizing: 'border-box' }}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Row;