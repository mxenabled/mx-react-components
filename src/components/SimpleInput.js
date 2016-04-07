const React = require('react');
const Radium = require('radium');

const StyleConstants = require('../constants/Style');

const Input = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string,
    valid: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      type: 'text',
      valid: true
    };
  },

  render () {
    const styles = this.styles();

    return (
      <input
        {...this.props}
        name={this.props.name}
        style={Object.assign({}, styles.wrapper, this.props.style)}
        type={this.props.type}
      />
    );
  },

  styles () {
    return {
      wrapper: {
        backgroundColor: StyleConstants.Colors.WHITE,
        border: this.props.valid ? '1px solid ' + StyleConstants.Colors.FOG : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
        borderRadius: 3,
        padding: 10,
        width: '100%',
        WebkitAppearance: 'none',

        ':focus': {
          backgroundColor: StyleConstants.Colors.WHITE,
          border: '1px solid ' + StyleConstants.Colors.PRIMARY,
          outline: 'none',
          boxShadow: 'none'
        }
      }
    };
  }
});

module.exports = Radium(Input);
