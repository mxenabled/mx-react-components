const PropTypes = require('prop-types')
const React = require('react')

const Icon = require('../components/Icon')

const { themeShape } = require('../constants/App')

const StyleUtils = require('../utils/Style')
const { deprecatePrimaryColor } = require('../utils/Deprecation')

class Menu extends React.Component {
  static propTypes = {
    alignItems: PropTypes.oneOf(['left', 'right']),
    isOpen: PropTypes.bool,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        label: PropTypes.string,
        onClick: PropTypes.func,
      }),
    ).isRequired,
    onClick: PropTypes.func,
    primaryColor: PropTypes.string,
    theme: themeShape,
  }

  static defaultProps = {
    alignItems: 'left',
    isOpen: false,
    onClick: () => {},
  }

  state = {
    hoverItemIndex: null,
  }

  componentDidMount() {
    deprecatePrimaryColor(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isOpen) {
      this.setState({
        hoverItemIndex: null,
      })
    }
  }

  _handleMouseOver = hoverItemIndex => {
    this.setState({
      hoverItemIndex,
    })
  }

  _handleMouseOut = () => {
    this.setState({
      hoverItemIndex: null,
    })
  }

  _renderItems = (styles, theme) => {
    return this.props.items.map((item, index) => {
      return (
        <div
          key={item.label}
          onClick={item.onClick}
          onMouseOut={this._handleMouseOut}
          onMouseOver={this._handleMouseOver.bind(null, index)}
          style={Object.assign({}, styles.menuItem, {
            backgroundColor:
              index === this.state.hoverItemIndex ? theme.Colors.PRIMARY : 'transparent',
            color: index === this.state.hoverItemIndex ? theme.Colors.WHITE : theme.Colors.GRAY_500,
          })}
        >
          <Icon
            size={20}
            style={Object.assign({}, styles.itemIcon, {
              fill:
                index === this.state.hoverItemIndex ? theme.Colors.WHITE : theme.Colors.GRAY_700,
            })}
            type={item.icon}
          />
          <span style={styles.itemLabel}>{item.label}</span>
        </div>
      )
    })
  }

  render() {
    const { isOpen, alignItems } = this.props
    const theme = StyleUtils.mergeTheme(this.props.theme, this.props.primaryColor)
    const styles = this.styles(theme)

    return (
      <div
        onClick={this.props.onClick}
        style={Object.assign({}, styles.component, this.props.style)}
      >
        <div style={styles.dotsWrapper}>
          <Icon size={20} style={styles.menuIcon} type="kabob_horizontal" />
        </div>
        {isOpen ? (
          <div
            style={Object.assign(
              {},
              styles.menu,
              alignItems === 'right' ? { right: 3 } : { left: 3 },
            )}
          >
            {this._renderItems(styles, theme)}
          </div>
        ) : null}
      </div>
    )
  }

  styles = theme => {
    return {
      component: {
        display: 'block',
        position: 'relative',
        width: 40,
      },
      dotsWrapper: {
        backgroundColor: this.props.isOpen ? theme.Colors.GRAY_100 : 'transparent',
        border: '1px solid ' + theme.Colors.GRAY_300,
        borderRadius: 3,
        cursor: 'pointer',
        margin: 3,
        padding: 6,
      },
      menu: {
        backgroundColor: theme.Colors.WHITE,
        border: '1px solid ' + theme.Colors.GRAY_300,
        borderRadius: 3,
        boxShadow: theme.ShadowHigh,
        position: 'absolute',
        top: 40,
        padding: 10,
        maxWidth: 260,
        zIndex: 10,
      },
      menuIcon: {
        fill: theme.Colors.PRIMARY,
      },
      menuItem: {
        color: theme.Colors.GRAY_500,
        cursor: 'pointer',
        marginRight: 5,
        whiteSpace: 'nowrap',
      },
      itemIcon: {
        padding: '10px 5px',
        opacity: 0.5,
      },
      itemLabel: {
        paddingRight: 10,
        position: 'relative',
        top: 3,
      },
    }
  }
}

module.exports = Menu
