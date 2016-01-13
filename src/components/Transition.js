const React = require('react');
const TransitionGroup = require('react-addons-transition-group');
//All react addons are listed as experimental and may change.

const Fade = require('./transitions/Fade');
const Slide = require('./transitions/Slide');

class Transition extends React.Component {
  constructor (props) {
    super(props);
  }

  _renderTransition () {
    switch (this.props.type) {
      case 'slide':
        return (<Slide {...this.props} />);
      case 'fade':
        return (<Fade {...this.props} />);
      default:
        return null;
    }
  }

  render () {
    return (
      <TransitionGroup>
        {this.props.isShown && this._renderTransition()}
      </TransitionGroup>
    );
  }
}

Transition.propTypes = {
  children: React.PropTypes.node,
  duration: React.PropTypes.number, // In milliseconds
  isShown: React.PropTypes.bool,
  type: React.PropTypes.string
};

Transition.defaultProps = {
  duration: 500,
  isShown: false,
  type: 'slide'
};

module.exports = Transition;