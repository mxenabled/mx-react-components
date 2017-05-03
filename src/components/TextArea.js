const PropTypes = require('prop-types');
const React = require('react');

const _merge = require('lodash/merge');

const StyleConstants = require('../constants/Style');

class TextArea extends React.Component {
  static propTypes = {
    elementProps: PropTypes.object,
    primaryColor: PropTypes.string,
    rows: PropTypes.number,
    styles: PropTypes.object,
    valid: PropTypes.bool
  };

  static defaultProps = {
    elementProps: {},
    primaryColor: StyleConstants.Colors.PRIMARY,
    rows: 5,
    valid: true
  };

  state = {
    focus: false
  };

  _onFocus = () => {
    this.textarea.focus();

    this.setState({
      focus: true
    });
  };

  _onBlur = () => {
    this.textarea.blur();

    this.setState({
      focus: false
    });
  };

  render() {
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
          ref={ref => {
            this.textarea = ref;
          }}
          rows={rows}
          style={styles.textarea}
        />
      </div>
    );
  }

  styles = () => {
    return _merge({}, {
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
    }, this.props.styles);
  };
}

module.exports = TextArea;
