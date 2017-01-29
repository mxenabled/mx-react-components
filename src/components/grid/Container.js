const React = require('react');

class Container extends React.Component {
  static propTypes = {
    fluid: React.PropTypes.bool
  };

  static defaultProps = {
    fluid: true
  };

  render () {
    return (
      <div className={'container' + (this.props.fluid ? '-fluid' : '')} style={{ boxSizing: 'border-box' }}>
        {this.props.children}
      </div>
    );
  }
}

module.exports = Container;