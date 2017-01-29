const React = require('react');

const StyleConstants = require('../constants/Style');

class RadioButton extends React.Component {
  static propTypes = {
    activeButtonStyle: React.PropTypes.object,
    buttonStyle: React.PropTypes.object,
    checked: React.PropTypes.bool,
    color: React.PropTypes.string,
    onClick: React.PropTypes.func,
    style: React.PropTypes.object
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
          {this.props.checked ? <div style={styles.radioButtonActive}></div> : null}
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
