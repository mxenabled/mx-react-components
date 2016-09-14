const React = require('react');

const StyleConstants = require('../constants/Style');

const TextArea = React.createClass({
  propTypes: {
    elementProps: React.PropTypes.object,
    primaryColor: React.PropTypes.string,
    rows: React.PropTypes.number,
    valid: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      elementProps: {},
      primaryColor: StyleConstants.Colors.PRIMARY,
      rows: 5,
      valid: true
    };
  },

  getInitialState () {
    return {
      focus: false
    };
  },

  _onFocus () {
    this.refs.textarea.focus();

    this.setState({
      focus: true
    });
  },

  _onBlur () {
    this.refs.textarea.blur();

    this.setState({
      focus: false
    });
  },

  render () {
    const { elementProps, rows } = this.props;
    const styles = this.styles();

    return (
      <div
        onBlur={this._onBlur}
        onFocus={this._onFocus}
        style={Object.assign({}, styles.wrapper, this.state.focus ? styles.active : null)}
        tabIndex={0}
      >
        <textarea
          {...elementProps}
          ref='textarea'
          rows={rows}
          style={styles.textarea}
        />
      </div>
    );
  },

  styles () {
    return {
      component: {
        display: 'block'
      },
      wrapper: {
        padding: StyleConstants.Spacing.SMALL,
        boxSizing: 'border-box',
        backgroundColor: StyleConstants.Colors.WHITE,
        border: this.props.valid ? '1px solid ' + StyleConstants.Colors.FOG : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        outline: 'none',
        boxShadow: 'none'
      },
      active: {
        border: '1px solid ' + this.props.primaryColor
      },
      textarea: {
        flex: '1 0 0%',
        backgroundColor: StyleConstants.Colors.WHITE,
        border: 'none',
        outline: 'none',
        boxShadow: 'none'
      }
    };
  }
});

module.exports = TextArea;