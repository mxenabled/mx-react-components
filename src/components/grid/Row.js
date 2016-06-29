const Radium = require('radium');
const React = require('react');

const Row = React.createClass({
  propTypes: {
    style: React.PropTypes.object
  },

  render () {
    const styles = this.styles();

    return (
      <div {...this.props} style={styles.component}>
        {this.props.children}
      </div>
    );
  },

  styles () {
    return {
      component: Object.assign({}, {
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 -10px'
      }, this.props.style)
    };
  }
});

module.exports = Radium(Row);
