const React = require('react');

const Container = React.createClass({
  propTypes: {
    fluid: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      fluid: true
    };
  },

  render () {
    return (
      <div className={'container' + (this.props.fluid ? '-fluid' : '')} style={{ boxSizing: 'border-box' }}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Container;