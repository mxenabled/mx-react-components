const React = require('react');
const _merge = require('lodash/merge');

const StyleConstants = require('../constants/Style');
const Icon = require('../components/Icon');

const MessageBox = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    color: React.PropTypes.string,
    icon: React.PropTypes.string,
    styles: React.PropTypes.object,
    title: React.PropTypes.string
  },

  getInitialState () {
    return {
      isOpen: true
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
        <div onClick={this.props.children ? this._toggleMessageBox : () => {}} style={styles.header}>
          <div style={styles.leftHeader}>
            <Icon
              size={20}
              style={Object.assign({}, styles.icon, { marginRight: StyleConstants.Spacing.SMALL })}
              type={this.props.icon}
            />
            <div style={styles.title}>{this.props.title}</div>
          </div>

          {this.props.children &&
            <Icon
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
    return _merge({}, {
      component: {
        color: StyleConstants.Colors.WHITE,
        boxSizing: 'border-box'
      },
      header: {
        background: this.props.color,
        display: 'flex',
        cursor: this.props.children ? 'pointer' : 'auto',
        padding: StyleConstants.Spacing.XSMALL,
        alignItems: 'center'
      },
      leftHeader: {
        flex: 1,
        display: 'flex',
        alignItems: 'center'
      },
      title: {
        fontFamily: StyleConstants.Fonts.SEMIBOLD
      },
      icon: {
        fill: StyleConstants.Colors.WHITE
      },
      children: {
        backgroundColor: StyleConstants.adjustHexOpacity(this.props.color, 0.1),
        padding: this.props.children ? StyleConstants.Spacing.SMALL : null
      }
    }, this.props.styles);
  }
});

module.exports = MessageBox;
