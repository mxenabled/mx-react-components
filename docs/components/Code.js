const React = require('react');

const Code = (props) =>
  <code {...props} style={{ display: 'inline', padding: 3 }}>{props.children}</code>;

module.exports = Code;
