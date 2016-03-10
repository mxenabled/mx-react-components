const React = require('react');
const Radium = require('radium');

const Input = React.createClass({
  render () {
    return (
      <div>
        <input type={this.props.inputType} />
      </div>
    );
  }
});

module.exports = Radium(Input);

