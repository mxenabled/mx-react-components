const React = require('react');

const defaultBreakpoints = { large: 1200, medium: 750, small: 320 };
const defaultSpan = { large: 12, medium: 12, small: 12 };
const defaultOffset = { large: 0, medium: 0, small: 0 };

const defaultShape = {
  large: React.PropTypes.number,
  medium: React.PropTypes.number,
  small: React.PropTypes.number
};

const Column = React.createClass({
  propTypes: {
    breakpoints: React.PropTypes.shape(defaultShape),
    columnCount: React.PropTypes.number,
    offset: React.PropTypes.shape(defaultShape),
    order: React.PropTypes.shape(defaultShape),
    span: React.PropTypes.shape(defaultShape),
    style: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      columnCount: 12,
      order: {}
    };
  },

  getInitialState () {
    return {
      windowSize: this._getWindowSize()
    };
  },

  componentDidMount () {
    window.addEventListener('resize', this._handleWindowResize);
  },

  componentWillUnmount () {
    window.removeEventListener('resize', this._handleWindowResize);
  },

  _getWindowSize () {
    const breakpoints = Object.assign({}, defaultBreakpoints, this.props.breakpoints);
    const width = window.innerWidth;
    let windowSize = 'small';

    if (width >= breakpoints.large) {
      windowSize = 'large';
    } else if (width >= breakpoints.medium) {
      windowSize = 'medium';
    }

    return windowSize;
  },

  _handleWindowResize () {
    this.setState({
      windowSize: this._getWindowSize()
    });
  },

  render () {
    const styles = this.styles();
    const span = Object.assign(defaultSpan, this.props.span);

    return span[this.state.windowSize] ? (
      <div style={styles.component}>
        {this.props.children}
      </div>
      ) : null;
  },

  styles () {
    const span = Object.assign({}, defaultSpan, this.props.span);
    const offset = Object.assign({}, defaultOffset, this.props.offset);

    return {
      component: Object.assign({}, {
        boxSizing: 'border-box',
        flexBasis: (span[this.state.windowSize] / this.props.columnCount * 100) + '%',
        flexGrow: 0,
        flexShrink: 0,
        marginLeft: (offset[this.state.windowSize] / this.props.columnCount * 100) + '%',
        order: this.props.order[this.state.windowSize],
        paddingLeft: 10,
        paddingRight: 10
      }, this.props.style)
    };
  }
});

module.exports = Column;
