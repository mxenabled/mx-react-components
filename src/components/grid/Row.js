const React = require('react');

class Row extends React.Component {
  render () {
    return (
      <div className={'row'} style={{ boxSizing: 'border-box' }}>
        {this.props.children}
      </div>
    );
  }
}

module.exports = Row;