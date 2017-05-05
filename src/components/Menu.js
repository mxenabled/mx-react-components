const PropTypes = require('prop-types');
const React = require('react');

const Icon = require('../components/Icon');

const StyleConstants = require('../constants/Style');

class Menu extends React.Component {
  static propTypes = {
    alignItems: PropTypes.oneOf(['left', 'right']),
    isOpen: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.string,
      label: PropTypes.string,
      onClick: PropTypes.func
    })).isRequired,
    onClick: PropTypes.func,
    primaryColor: PropTypes.string
  };

  static defaultProps = {
    alignItems: 'left',
    primaryColor: StyleConstants.Colors.PRIMARY,
    isOpen: false,
    onClick: () => {}
  };

  state = {
    hoverItemIndex: null
  };

  componentWillReceiveProps (nextProps) {
    if (!nextProps.isOpen) {
      this.setState({
        hoverItemIndex: null
      });
    }
  }

  _handleMouseOver = (hoverItemIndex) => {
    this.setState({
      hoverItemIndex
    });
  };

  _handleMouseOut = () => {
    this.setState({
      hoverItemIndex: null
    });
  };

  _renderItems = () => {
    const styles = this.styles();

    return this.props.items.map((item, index) => {
      return (
        <div
          key={item.label}
          onClick={item.onClick}
          onMouseOut={this._handleMouseOut}
          onMouseOver={this._handleMouseOver.bind(null, index)}
          style={Object.assign({}, styles.menuItem, {
            backgroundColor: index === this.state.hoverItemIndex ? this.props.primaryColor : 'transparent',
            color: index === this.state.hoverItemIndex ? StyleConstants.Colors.WHITE : StyleConstants.Colors.ASH
          })}
        >
          <Icon
            size={20}
            style={Object.assign({}, styles.itemIcon, { fill: index === this.state.hoverItemIndex ? StyleConstants.Colors.WHITE : StyleConstants.Colors.CHARCOAL })}
            type={item.icon}
          />
          <span style={styles.itemLabel}>
            {item.label}
          </span>
        </div>
      );
    });
  };

  render () {
    const { isOpen, alignItems } = this.props;
    const styles = this.styles();

    return (
      <div
        onClick={this.props.onClick}
        style={Object.assign({}, styles.component, this.props.style)}
      >
        <div style={styles.dotsWrapper}>
          <Icon
            size={20}
            style={styles.menuIcon}
            type='kabob_horizontal'
          />
        </div>
        {isOpen ? (
          <div style={Object.assign({}, styles.menu, alignItems === 'right' ? { right: 3 } : { left: 3 })}>
            {this._renderItems()}
          </div>
        ) : null}
      </div>
    );
  }

  styles = () => {
    return {
      component: {
        display: 'block',
        position: 'relative',
        width: 40
      },
      dotsWrapper: {
        backgroundColor: this.props.isOpen ? StyleConstants.Colors.PORCELAIN : 'transparent',
        border: '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: 3,
        cursor: 'pointer',
        margin: 3,
        padding: 6
      },
      menu: {
        backgroundColor: StyleConstants.Colors.WHITE,
        border: '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: 3,
        boxShadow: StyleConstants.ShadowHigh,
        position: 'absolute',
        top: 40,
        padding: 10,
        maxWidth: 260,
        zIndex: 10
      },
      menuIcon: {
        fill: this.props.primaryColor
      },
      menuItem: {
        color: StyleConstants.Colors.ASH,
        cursor: 'pointer',
        marginRight: 5,
        whiteSpace: 'nowrap'
      },
      itemIcon: {
        padding: '10px 5px',
        opacity: 0.5
      },
      itemLabel: {
        paddingRight: 10,
        position: 'relative',
        top: 3
      }
    };
  };
}

module.exports = Menu;
