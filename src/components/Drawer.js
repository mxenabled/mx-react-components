const React = require('react');
const Velocity = require('velocity-animate');

const Button = require('../components/Button');

const Drawer = React.createClass({
  propTypes: {
    onClose: React.PropTypes.func.isRequired
  },

  componentDidMount () {
    const el = this._container;
    const transition = { right: 0 };
    const options = {
      duration: 500
    };

    Velocity(el, transition, options);
  },

  componentWillUnmount () {
    console.log('component unmounted');
  },

  _handleCloseClick () {
    const el = this._container;
    const transition = { right: -800 };
    const options = {
      duration: 500,
      complete: this.props.onClose
    };

    Velocity(el, transition, options);
  },

  render () {
    const styles = this.styles();

    return (
    <div ref={(ref) => (this._container = ref)}style={styles.container}>
      <Button onClick={this._handleCloseClick}>Close Drawer</Button>
      <h1>Hello</h1>
    </div>
    );
  },

  styles () {
    return {
      container: {
        backgroundColor: '#eaeaea',
        color: '#88888',
        width: 800,
        height: 200,
        position: 'absolute',
        top: 0,
        right: -800
      }
    };
  }
});

module.exports = Drawer;
