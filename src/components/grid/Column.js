const React = require('react');

const Column = React.createClass({
  propTypes: {
    breakpointLarge: React.PropTypes.number,
    breakpointMedium: React.PropTypes.number,
    breakpointSmall: React.PropTypes.number,
    columnCount: React.PropTypes.number,
    columnLarge: React.PropTypes.number,
    columnMedium: React.PropTypes.number,
    columnSmall: React.PropTypes.number,
    offsetLarge: React.PropTypes.number,
    offsetMedium: React.PropTypes.number,
    offsetSmall: React.PropTypes.number,
    orderLarge: React.PropTypes.number,
    orderMediumpoint: React.PropTypes.number,
    orderSmall: React.PropTypes.number,
    style: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      breakpointLarge: 1200,
      breakpointMedium: 750,
      columnCount: 12,
      columnLarge: 12,
      columnMedium: 12,
      columnSmall: 12,
      offsetLarge: 0,
      offsetMedium: 0,
      offsetSmall: 0
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

  _getScreenWidth () {
    const width = document.documentElement.clientWidth || document.body.clientWidth;
    let screenWidth = 'Small';

    if (width >= this.props.breakpointLarge) {
      screenWidth = 'Large';
    } else if (width >= this.props.breakpointMedium) {
      screenWidth = 'Medium';
    }

    return screenWidth;
  },

  _handleWindowResize () {
    this.setState({
      screenWidth: this._getScreenWidth()
    });
  },

  render () {
    const styles = this.styles();

    return this.props['column' + this.state.screenWidth] ? (
      <div style={styles.component}>
        {this.props.children}
      </div>
      ) : null;
  },

  styles () {
    return {
      component: Object.assign({}, {
        boxSizing: 'border-box',
        flexBasis: (this.props['column' + this.state.screenWidth] / this.props.columnCount * 100) + '%',
        flexGrow: 0,
        flexShrink: 0,
        marginLeft: (this.props['offset' + this.state.screenWidth] / this.props.columnCount * 100) + '%',
        order: this.props['order' + this.state.screenWidth],
        padding: '0 10px'
      }, this.props.style)
    };
  }
});

module.exports = Column;
