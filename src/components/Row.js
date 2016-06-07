const React = require('react');

const Row = React.createClass({

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
      component: {
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 -10px'
      }
    };
  }
});


module.exports = Row;
