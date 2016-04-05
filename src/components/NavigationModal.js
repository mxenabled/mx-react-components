const React = require('react');
const _merge = require('lodash/merge');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const NavigationModal = React.createClass({
  propTypes: {
    componentStyle: React.PropTypes.object,
    iconSize: React.PropTypes.number,
    iconStyle: React.PropTypes.object,
    iconType: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      content: React.PropTypes.node,
      onClick: React.PropTypes.func
    })).isRequired,
    modalItemStyle: React.PropTypes.object,
    modalStyle: React.PropTypes.object
  },

  getInitialState () {
    return {
      showModal: false
    };
  },

  _handleToggle () {
    this.setState({
      showModal: !this.state.showModal
    });
  },

  render () {
    const styles = this.styles();

    return (
      <div onClick={this._handleToggle} style={styles.component}>
        <Icon size={this.props.iconSize || 30} style={styles.icon} type={this.props.iconType || 'caret-down'} />
        {this.state.showModal ? (
          <div style={styles.modal}>
            {this.props.items.map((item, index) => {
              return (<div key={index} onClick={item.onClick} style={styles.modalItem}>{item.content}</div>);
            })}
          </div>
        ) : null }
      </div>
    );
  },

  styles () {
    return {
      component: _merge({
        fontFamily: StyleConstants.Fonts.REGULAR,
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        alignSelf: 'stretch'
      }, this.props.componentStyle),
      icon: _merge({
        alignSelf: 'center',
        color: StyleConstants.Colors.ASH
      }, this.props.iconStyle),
      modal: _merge({
        borderRadius: 3,
        boxShadow: '0 0 30px rgba(0,0,0,0.15)',
        width: 200,
        backgroundColor: StyleConstants.Colors.WHITE,
        position: 'absolute',
        top: '50%',
        left: '50%'
      }, this.props.modalStyle),
      modalItem: _merge({
        padding: 20
      }, this.props.modalItemStyle)
    };
  }
});

module.exports = NavigationModal;
