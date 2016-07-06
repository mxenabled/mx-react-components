const React = require('react');

const StyleConstants = require('../../constants/Style');
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
    style: React.PropTypes.object,
    windowWidth: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      columnCount: 12,
      order: {}
    };
  },

  getInitialState () {
    return {
      windowSize: StyleConstants.getWindowSize(this.props.windowWidth)
    };
  },

  componentWillReceiveProps (newProps) {
    this.setState({
      windowSize: StyleConstants.getWindowSize(newProps.windowWidth)
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