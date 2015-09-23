const React = require('react');
const { Icon } = require('mx-react-components');

const Docs = React.createClass({
  render () {
    return (
      <div>
        <Icon />
      </div>
    );
  }
});


React.render(<Docs />, document.getElementById('content'));