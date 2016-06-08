const React = require('react');

const Column = React.createClass({
  propTypes: {
    'breakLg': React.PropTypes.number,
    'breakMd': React.PropTypes.number,
    'breakSm': React.PropTypes.number,
    'colLg': React.PropTypes.number,
    'colMd': React.PropTypes.number,
    'colSm': React.PropTypes.number,
    'offLg': React.PropTypes.number,
    'offMd': React.PropTypes.number,
    'offSm': React.PropTypes.number,
    'ordLg': React.PropTypes.number,
    'ordMd': React.PropTypes.number,
    'ordSm': React.PropTypes.number,
    style: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      'breakLg': 1000,
      'breakMd': 500,
      'breakSm': 320,
      'colLg': 12,
      'colMd': 12,
      'colSm': 12,
      'offLg': 0,
      'offMd': 0,
      'offSm': 0
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
    let screenWidth = 'Sm';

    if (width > this.props.breakLg) {
      screenWidth = 'Lg';
    } else if (width > this.props.breakMd) {
      screenWidth = 'Md';
    }

    return screenWidth;
  },

  render () {
    const styles = this.styles();

    return (
      <div style={styles.component}>
        {this.props.children}
      </div>
    );
  },

  styles () {
    return {
      component: Object.assign({}, {
        boxSizing: 'border-box',
        flexBasis: (this.props['col' + this.state.screenWidth] / 12 * 100) + '%',
        flexGrow: 0,
        flexShrink: 0,
        marginLeft: (this.props['off' + this.state.screenWidth] / 12 * 100) + '%',
        order: this.props['ord' + this.state.screenWidth],
        padding: '0 10px'
      }, this.props.style)
    };
  }
});


module.exports = Column;
