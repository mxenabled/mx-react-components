const PropTypes = require('prop-types')
const React = require('react')
const _merge = require('lodash/merge')

const Icon = require('../components/Icon')

const { themeShape } = require('../constants/App')

const StyleUtils = require('../utils/Style')

class MessageBox extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    icon: PropTypes.string,
    styles: PropTypes.object,
    theme: themeShape,
    title: PropTypes.string,
  }

  state = {
    isOpen: true,
  }

  _toggleMessageBox = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const theme = StyleUtils.mergeTheme(this.props.theme)
    const styles = this.styles(theme)

    return (
      <div className="mx-message-box" style={styles.component}>
        <div
          onClick={this.props.children ? this._toggleMessageBox : () => {}}
          style={styles.header}
        >
          <div style={styles.leftHeader}>
            <Icon
              size={20}
              style={Object.assign({}, styles.icon, {
                marginRight: theme.Spacing.SMALL,
              })}
              type={this.props.icon}
            />
            <div style={styles.title}>{this.props.title}</div>
          </div>

          {this.props.children && (
            <Icon
              size={19}
              style={styles.icon}
              type={this.state.isOpen ? 'caret-up' : 'caret-down'}
            />
          )}
        </div>

        {this.state.isOpen && <div style={styles.children}>{this.props.children}</div>}
      </div>
    )
  }

  styles = theme => {
    const color = this.props.color || theme.Colors.PRIMARY

    return _merge(
      {},
      {
        component: {
          color: theme.Colors.WHITE,
          boxSizing: 'border-box',
        },
        header: {
          background: color,
          display: 'flex',
          cursor: this.props.children ? 'pointer' : 'auto',
          padding: theme.Spacing.XSMALL,
          alignItems: 'center',
        },
        leftHeader: {
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        },
        title: {
          fontFamily: theme.Fonts.SEMIBOLD,
          fontSize: theme.FontSizes.MEDIUM,
        },
        icon: {
          fill: theme.Colors.WHITE,
        },
        children: {
          backgroundColor: StyleUtils.adjustHexOpacity(color, 0.1),
          padding: this.props.children ? theme.Spacing.SMALL : null,
        },
      },
      this.props.styles,
    )
  }
}

module.exports = MessageBox
