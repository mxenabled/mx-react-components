const PropTypes = require('prop-types');
const React = require('react');
const marked = require('marked');

const Markdown = React.createClass({
  propTypes: {
    children: PropTypes.node,
    lang: PropTypes.string
  },

  getDefaultProps () {
    return {
      lang: 'html'
    };
  },

  _rawMarkup () {
    const lang = this.props.lang;
    const rawMarkup = marked(this.props.children.toString(), {
      highlight (code) {
        return require('highlight.js').highlightAuto(code, [lang]).value;
      },
      sanitize: true
    });

    return { __html: rawMarkup };
  },

  render () {
    return (
      <span dangerouslySetInnerHTML={this._rawMarkup()} />
    );
  }
});

module.exports = Markdown;
