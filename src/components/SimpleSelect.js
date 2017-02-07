const React = require('react');
const Radium = require('radium');
const _merge = require('lodash/merge');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const SimpleSelect = React.createClass({
  propTypes: {
    hoverColor: React.PropTypes.string,
    iconSize: React.PropTypes.number,
    iconStyles: React.PropTypes.object,
    items: React.PropTypes.array.isRequired,
    itemStyles: React.PropTypes.object,
    menuStyles: React.PropTypes.object,
    onScrimClick: React.PropTypes.func,
    scrimClickOnSelect: React.PropTypes.bool,
    style: React.PropTypes.object,
    styles: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      scrimClickOnSelect: false,
      hoverColor: StyleConstants.Colors.PRIMARY,
      items: [],
      onScrimClick () {}
    };
  },

  componentDidMount () {
    if (this.props.style) {
      console.warn('The style prop is deprecated and will be removed in a future release. Please use styles.');
    }

    if (this.props.iconStyles) {
      console.warn('The iconStyles prop is deprecated and will be removed in a future release. Please use styles.');
    }

    if (this.props.menuStyles) {
      console.warn('The menuStyles prop is deprecated and will be removed in a future release. Please use styles.');
    }
  },

  _handleItemClick (item, e) {
    if (this.props.scrimClickOnSelect) {
      this.props.onScrimClick(e);
    }

    item.onClick(e);
  },

  render () {
    const styles = this.styles();

    return (
      <div style={styles.component}>
        <div style={styles.menu}>
          {this.props.children ?
            this.props.children :
            (this.props.items.map((item, i) => {
              return (
                <div
                  key={i}
                  onClick={this._handleItemClick.bind(null, item)}
                  style={styles.item}
                >
                  {item.icon ? (
                    <Icon size={this.props.iconSize || 20} style={styles.icon} type={item.icon} />
                  ) : null}
                  <div style={styles.text}>{item.text}</div>
                </div>
              );
            })
          )}
        </div>
        <div onClick={this.props.onScrimClick} style={styles.scrim} />
      </div>
    );
  },

  styles () {
    return _merge({}, {
      component: Object.assign({
        height: 0,
        position: 'relative'
      }, this.props.style),

      menu: Object.assign({}, {
        alignSelf: 'stretch',
        backgroundColor: StyleConstants.Colors.WHITE,
        borderRadius: 3,
        boxShadow: StyleConstants.ShadowHigh,
        boxSizing: 'border-box',
        color: StyleConstants.Colors.CHARCOAL,
        display: 'flex',
        flexDirection: 'column',
        fill: StyleConstants.Colors.CHARCOAL,
        fontFamily: StyleConstants.FontFamily,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        top: 10,
        position: 'absolute',
        zIndex: 10
      }, this.props.menuStyles),

      item: Object.assign({}, {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        height: 40,
        padding: StyleConstants.Spacing.MEDIUM,

        ':hover': {
          backgroundColor: this.props.hoverColor,
          color: StyleConstants.Colors.WHITE,
          cursor: 'pointer',
          fill: StyleConstants.Colors.WHITE
        }
      }, this.props.itemStyles),
      icon: Object.assign({}, {
        marginRight: StyleConstants.Spacing.SMALL
      }, this.props.iconStyles),
      text: {
        whiteSpace: 'nowrap'
      },
      scrim: {
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 9
      }
    }, this.props.styles);
  }
});

module.exports = Radium(SimpleSelect);
