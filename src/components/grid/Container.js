const React = require('react');

const Container = React.createClass({
  propTypes: {
    fluid: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      fluid: false
    };
  },

  render () {
    return (
      <div className={'container' + (this.props.fluid ? '-fluid' : '')}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Container;