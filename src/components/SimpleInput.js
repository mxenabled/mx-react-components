const React = require('react');
const Radium = require('radium');

const StyleConstants = require('../constants/Style');

const Input = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    style: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
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
        style={[styles.wrapper, !this.props.valid && styles.error, this.props.style]}
        type={this.props.type}
      />
    );
  },

  styles () {
    return {
      wrapper: {
        backgroundColor: StyleConstants.Colors.WHITE,
        border: '1px solid ' + StyleConstants.Colors.FOG,
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
      },
      error: {
        borderColor: StyleConstants.Colors.STRAWBERRY
      }
    };
  }
});

module.exports = Radium(Input);
