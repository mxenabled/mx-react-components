const React = require('react');

const StyleConstants = require('../constants/Style');
const Icon = require('../components/Icon');

const MessageBox = React.createClass({

  getInitialState () {
    return {
      isOpen: false
    };
  },

  _toggleMessageBoxOpen () {
    console.log("click")
    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  render () {
    const styles = this.styles();
    return (
      <div className='mx-message-box' style={styles.component}>
        <div style={styles.header}>
          <div style={styles.leftHeader}>
            <Icon
              elementProps={{
                onClick: this._toggleMessageBoxOpen
              }}
              size={19}
              style={Object.assign({}, styles.icon, {marginRight: StyleConstants.Spacing.SMALL})}
              type={this.state.isOpen ? 'subtract' : 'attention'}
            />

            {this.props.title}
          </div>

          {this.props.expandable &&
            <Icon
              elementProps={{
                onClick: this._toggleMessageBoxOpen
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
    )
  },

  styles () {
    return {
      component: {
        color: StyleConstants.Colors.WHITE,
        maxWidth: 600,
        boxSizing: 'border-box'
      },
      header: {
        background: this.props.color,
        display: 'flex',
        padding: StyleConstants.Spacing.SMALL,
        // justifyContent: 'center',
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
        color: StyleConstants.Colors.CHARCOAL
      }
    }
  }
});

module.exports = MessageBox;
