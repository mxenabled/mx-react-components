const React = require('react');
const Radium = require('radium');

const StyleConstants = require('../constants/Style');

const DisplayInput = React.createClass({
  propTypes: {
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    primaryColor: React.PropTypes.string,
    showHint: React.PropTypes.bool,
    status: React.PropTypes.shape({
      type: React.PropTypes.string,
      message: React.PropTypes.string
    }),
    valid: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      primaryColor: StyleConstants.Colors.PRIMARY,
      valid: true
    };
  },

  render () {
    const styles = this.styles();

    return (
      <div style={styles.wrapper}>
        {this.props.label ? (
          <div key='label' style={styles.label}>
            <div style={styles.labelText}>{this.props.label}</div>
          </div>) : null}
        <input
          {...this.props}
          key='input'
          label={this.props.label}
          style={styles.input}
          type='text'
        />
        <div style={styles.hint}>
          <div style={styles.hintText}>
            {this.props.showHint && !this.props.status ? (<div>{this.props.hint}</div>) : null}
            {this.props.status ? (<div style={styles[this.props.status.type]}>{this.props.status.message}</div>) : null}
          </div>
        </div>
      </div>
    );
  },

  styles () {
    return {
      wrapper: Object.assign({
        borderBottom: this.props.valid ? '1px solid ' + StyleConstants.Colors.ASH : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
        height: 43,
        paddingLeft: this.props.label ? 130 : 0,
        paddingRight: this.props.hint || this.props.status ? 100 : 0,
        transition: 'all .2s ease-in',
        WebkitAppearance: 'none',
        whiteSpace: 'nowrap',
        width: '100%',

        ':focus': {
          borderBottom: this.props.valid ? '1px solid ' + this.props.primaryColor : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
          boxShadow: 'none',
          outline: 'none'
        }
      }, this.props.style),

      input: {
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        float: 'left',
        fontSize: StyleConstants.FontSizes.LARGE,
        padding: 10,
        WebkitAppearance: 'none',
        width: '100%',

        ':focus': {
          boxShadow: 'none',
          outline: 'none'
        }
      },

      label: {
        color: StyleConstants.Colors.ASH,
        display: 'inline-block',
        float: 'left',
        fontSize: StyleConstants.FontSizes.SMALL,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        height: '100%',
        marginLeft: -130,
        position: 'relative',
        width: 130,

        ':focus': {
          color: this.props.primaryColor
        }
      },

      labelText: {
        bottom: 14,
        left: 5,
        position: 'absolute'
      },

      hint: {
        color: this.props.primaryColor,
        display: 'inline-block',
        float: 'left',
        height: '100%',
        marginRight: -100,
        position: 'relative',
        textAlign: 'right',
        width: 100
      },

      hintText: {
        bottom: 14,
        position: 'absolute',
        right: 5
      },

      error: {
        color: StyleConstants.Colors.STRAWBERRY
      },

      success: {
        color: this.props.primaryColor
      }
    };
  }
});

module.exports = Radium(DisplayInput);
