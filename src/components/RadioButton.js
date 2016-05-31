const React = require('react');

const StyleConstants = require('../constants/Style');

const RadioButton = React.createClass({
  propTypes: {
    activeStyle: React.PropTypes.object,
    checked: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    style: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      onClick: () => {}
    };
  },

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
  },

  styles () {
    return {
      component: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
      },
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
      }, this.props.style),
      radioButtonActive: Object.assign({}, {
        width: '60%',
        height: '60%',
        borderRadius: '100%',
        backgroundColor: StyleConstants.Colors.PRIMARY
      }, this.props.activeStyle)
    };
  }
});

module.exports = RadioButton;
