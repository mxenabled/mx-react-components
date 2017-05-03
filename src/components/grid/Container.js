const PropTypes = require('prop-types');
const React = require('react');

class Container extends React.Component {
  static propTypes = {
    fluid: PropTypes.bool,
    styles: PropTypes.object
  };

  static defaultProps = {
    fluid: true
  };

  render () {
    return (
      <div className={'container' + (this.props.fluid ? '-fluid' : '')} style={Object.assign({}, this.props.styles, { boxSizing: 'border-box' })}>
        {this.props.children}
      </div>
    );
  }
}

module.exports = Container;
