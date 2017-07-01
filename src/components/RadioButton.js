const PropTypes = require('prop-types');
const React = require('react');

const StyleConstants = require('../constants/Style');

class RadioButton extends React.Component {
  static propTypes = {
    activeButtonStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    checked: PropTypes.bool,
    color: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object
  };

  static defaultProps = {
    color: StyleConstants.Colors.PRIMARY,
    onClick: () => {}
  };

  render () {
    const styles = this.styles();

    return (
      <div onClick={this.props.onClick} style={styles.component}>
        <div style={styles.radioButton}>
          {this.props.checked ? <div style={styles.radioButtonActive} /> : null}
        </div>
        <div style={styles.children}>{this.props.children}</div>
      </div>
    );
  }

  styles = () => {
    return {
      component: Object.assign({}, {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
      }, this.props.style),
      radioButton: Object.assign({}, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 15,
        height: 15,
        marginRight: 5,
        border: '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: '100%',
        backgroundColor: StyleConstants.Colors.WHITE
      }, this.props.buttonStyle),
      radioButtonActive: Object.assign({}, {
        width: '60%',
        height: '60%',
        borderRadius: '100%',
        backgroundColor: this.props.color
      }, this.props.activeButtonStyle)
    };
  };
}

module.exports = RadioButton;
