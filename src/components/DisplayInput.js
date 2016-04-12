const React = require('react');
const Radium = require('radium');

const StyleConstants = require('../constants/Style');

const DisplayInput = React.createClass({
  propTypes: {
    error: React.PropTypes.string,
    hint: React.PropTypes.string,
    isRequired: React.PropTypes.bool,
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    primaryColor: React.PropTypes.string,
    showHint: React.PropTypes.bool,
    status: React.PropTypes.shape({
      type: React.PropTypes.string,
      message: React.PropTypes.string
    }),
    style: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    type: React.PropTypes.string,
    valid: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      isRequired: false,
      primaryColor: StyleConstants.Colors.PRIMARY,
      type: 'text',
      valid: true
    };
  },

  render () {
    const styles = this.styles();

    return (
      <div style={Object.assign({}, styles.wrapper)}>
        {this.props.label ? <div key={this.props.label} style={styles.label}>{this.props.label}</div> : null}
        <input
          {...this.props}
          key={this.props.type}
          label={this.props.label}
          style={styles.input}
          type={this.props.type}
        />
        {this.props.showHint && !this.props.status ? <div key='hint' style={styles.hint}>{this.props.hint}</div> : null}
        {this.props.status ? <div key='status' style={styles[this.props.status.type]}>{this.props.status.message}</div> : null}
      </div>
    );
  },

  styles () {
    return {
      wrapper: Object.assign({
        borderBottom: this.props.valid ? '1px solid ' + StyleConstants.Colors.ASH : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
        borderLeft: '1px solid transparent',
        borderRadius: 3,
        borderRight: '1px solid transparent',
        borderTop: '1px solid transparent',
        padding: '10px 10px 0 10px',
        transition: 'all .2s ease-in',
        WebkitAppearance: 'none',
        whiteSpace: 'nowrap',
        width: '100%',

        ':focus': {
          borderBottom: this.props.valid ? '1px solid ' + this.props.primaryColor : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
          borderLeft: '1px solid transparent',
          borderRight: '1px solid transparent',
          borderTop: '1px solid transparent',
          boxShadow: 'none',
          outline: 'none'
        }
      }, this.props.style),

      input: {
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        fontSize: StyleConstants.FontSizes.LARGE,
        padding: 10,
        WebkitAppearance: 'none',
        width: '78%',

        ':focus': {
          boxShadow: 'none',
          outline: 'none'
        }
      },

      label: {
        color: StyleConstants.Colors.ASH,
        display: 'inline-block',
        fontSize: StyleConstants.FontSizes.SMALL,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        minWidth: 130,

        ':focus': {
          color: this.props.primaryColor
        }
      },

      error: {
        color: StyleConstants.Colors.STRAWBERRY,
        display: 'inline-block',
        width: '10%'
      },

      hint: {
        color: this.props.primaryColor,
        display: 'inline-block',
        width: '10%'
      }
    };
  }
});

module.exports = Radium(DisplayInput);
