const React = require('react');

const Column = React.createClass({
  propTypes: {
    'col-lg': React.PropTypes.number,
    'col-md': React.PropTypes.number,
    'col-sm': React.PropTypes.number,
    'off-lg': React.PropTypes.number,
    'off-md': React.PropTypes.number,
    'off-sm': React.PropTypes.number
  },

  getDefaultProps () {
    return {
      'col-lg': 12,
      'col-md': 12,
      'col-sm': 12,
      'off-lg': 0,
      'off-md': 0,
      'off-sm': 0
    };
  },

  getInitialState () {
    return {
      screenWidth: this._getScreenWidth()
    };
  },

  componentDidMount () {
    window.addEventListener('resize', this._handleWindowResize);
  },

  componentWillUnmount () {
    window.removeEventListener('resize', this._handleWindowResize);
  },

  _handleWindowResize () {
    this.setState({
      screenWidth: this._getScreenWidth()
    });
  },

  _getScreenWidth () {
    const width = document.documentElement.clientWidth || document.body.clientWidth;
    let screenWidth = 'sm';

    if (width > 1000) {
      screenWidth = 'lg';
    } else if (width > 500) {
      screenWidth = 'md';
    }

    return screenWidth;
  },

  render () {
    const styles = this.styles();
    const cols = this.props['col-' + this.state.screenWidth];

    return (
      <div style={styles.component}>
        {this.props.children}
        {(cols / 12 * 100) + '%'}
      </div>
    );
  },

  styles () {
    const cols = this.props['col-' + this.state.screenWidth];
    const offset = this.props['off-' + this.state.screenWidth];

    return {
      component: {
        boxSizing: 'border-box',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: (cols / 12 * 100) + '%',
        padding: '0 10px',
        marginLeft: (offset / 12 * 100) + '%'
      }
    };
  }
});


module.exports = Column;
