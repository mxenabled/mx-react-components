const React = require('react');
const ReactDOM = require('react-dom');

class Fade extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillAppear (callback) {
    setTimeout(callback, 1); // need at least one tick to fire transition
  }

  componentDidAppear () {
    const el = ReactDOM.findDOMNode(this.refs.component);

    el.style.opacity = 0;
  }

  componentWillEnter (callback) {
    setTimeout(callback, 1);
  }

  componentDidEnter () {
    const el = ReactDOM.findDOMNode(this.refs.component);

    el.style.opacity = 1;
  }

  componentWillLeave (callback) {
    const el = ReactDOM.findDOMNode(this.refs.component);

    el.style.opacity = 0;

    setTimeout(callback, this.props.duration); // matches transition duration
  }

  render () {
    const style = {
      opacity: '0',
      transition: 'opacity ' + this.props.duration + 'ms'
    };

    return (
      <div ref='component' style={style}>
        {this.props.children}
      </div>
    );
  }
}

Fade.PropTypes = {
  children: React.PropTypes.object,
  duration: React.PropTypes.number
};

module.exports = Fade;