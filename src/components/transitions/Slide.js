const React = require('react');
const ReactDOM = require('react-dom');

class Slide extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillAppear (callback) {
    setTimeout(callback, 1); // need at least one tick to fire transition
  }

  componentDidAppear () {
    const el = ReactDOM.findDOMNode(this.refs.component);

    el.style.height = 0;
  }

  componentWillEnter (callback) {
    setTimeout(callback, 1);
  }

  componentDidEnter () {
    const el = ReactDOM.findDOMNode(this.refs.component);
    const height = el.scrollHeight;

    el.style.height = height + 'px';
  }

  componentWillLeave (callback) {
    const el = ReactDOM.findDOMNode(this.refs.component);

    el.style.height = 0;

    setTimeout(callback, this.props.duration); // matches transition duration
  }

  render () {
    const style = {
      height: '0',
      overflow: 'hidden',
      transition: 'height ' + this.props.duration + 'ms'
    };

    return (
      <div ref='component' style={style}>
        {this.props.children}
      </div>
    );
  }
}

Slide.propTypes = {
  children: React.PropTypes.object,
  duration: React.PropTypes.number
};

module.exports = Slide;