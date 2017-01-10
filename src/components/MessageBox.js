const React = require('react');

const StyleConstants = require('../constants/Style');
const Icon = require('../components/Icon');

const MessageBox = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    color: React.PropTypes.string,
    expandable: React.PropTypes.bool,
    icon: React.PropTypes.string,
    title: React.PropTypes.string
  },

  getInitialState () {
    return {
      isOpen: false
    };
  },

  _toggleMessageBox () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  render () {
    const styles = this.styles();

    return (
      <div className='mx-message-box' style={styles.component}>
        <div onClick={this._toggleMessageBox} style={styles.header}>
          <div style={styles.leftHeader}>
            <Icon
              elementProps={{
                onClick: this._toggleMessageBox
              }}
              size={20}
              style={Object.assign({}, styles.icon, { marginRight: StyleConstants.Spacing.SMALL })}
              type={this.props.icon}
            />

            {this.props.title}
          </div>

          {this.props.expandable &&
            <Icon
              elementProps={{
                onClick: this._toggleMessageBox
              }}
              size={19}
              style={styles.icon}
              type={this.state.isOpen ? 'caret-up' : 'caret-down'}
            />
          }
        </div>

        {this.state.isOpen &&
          <div style={styles.children}>
            {this.props.children}
          </div>
        }

      </div>
    );
  },

  styles () {
    return {
      component: {
        color: StyleConstants.Colors.WHITE,
        boxSizing: 'border-box'
      },
      header: {
        background: this.props.color,
        display: 'flex',
        cursor: 'pointer',
        padding: StyleConstants.Spacing.XSMALL,
        alignItems: 'center'
      },
      leftHeader: {
        flex: 1
      },
      icon: {
        fill: StyleConstants.Colors.WHITE,
        cursor: 'pointer'
      },
      children: {
        backgroundColor: StyleConstants.adjustHexOpacity(this.props.color, 0.1),
        padding: StyleConstants.Spacing.SMALL
      }
    };
  }
});

module.exports = MessageBox;
