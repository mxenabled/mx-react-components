const React = require('react');

const Row = React.createClass({
  propTypes: {
    style: React.PropTypes.Object
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
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 -10px'
      }, this.props.style)
    };
  }
});


module.exports = Row;
