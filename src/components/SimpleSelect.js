const React = require('react');
const Radium = require('radium');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const SimpleSelect = React.createClass({
  propTypes: {
    componentStyles: React.PropTypes.object,
    containerStyles: React.PropTypes.object,
    iconSize: React.PropTypes.number,
    iconStyles: React.PropTypes.object,
    items: React.PropTypes.array.isRequired,
    itemStyles: React.PropTypes.object,
    onItemClick: React.PropTypes.func,
    onScrimClick: React.PropTypes.func,
    showItems: React.PropTypes.bool,
    styles: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      closeOnDateSelect: false,
      items: [],
      onItemClick () {},
      onScrimClick () {},
      showItems: false
    };
  },

  _handleItemSelect (item) {
    this.props.onItemClick(item);
  },

  render () {
    const styles = this.styles();

    return (
      <div style={Object.assign({}, styles.container, this.props.containerStyles)}>
      {this.props.showItems ? (
        <div>
          <div style={Object.assign({}, styles.component, this.props.componentStyles)}>
              {this.props.items.map((item, i) => {
                return (
                  <div
                    key={i}
                    onClick={item.onClick}
                    style={Object.assign({}, styles.item, this.props.itemStyles)}
                  >
                    {item.icon ? (
                      <Icon size={this.props.iconSize || 20} styles={Object.assign({}, styles.icon, this.props.iconStyles)} type={item.icon} />
                    ) : null}
                    {item.text}
                  </div>
                );
              })}
          </div>
          <div onClick={this.props.onScrimClick} style={styles.scrim} />
        </div>
      ) : null }
      </div>
    );
  },

  styles () {
    return {
      component: Object.assign({
        alignSelf: 'stretch',
        backgroundColor: StyleConstants.Colors.WHITE,
        borderRadius: 3,
        boxShadow: StyleConstants.ShadowHigh,
        boxSizing: 'border-box',
        color: StyleConstants.Colors.BLACK,
        display: 'felx',
        flexDirection: 'column',
        fill: StyleConstants.Colors.BLACK,
        fontFamily: StyleConstants.FontFamily,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        position: 'absolute',
        zIndex: 10
      }, this.props.style),

      container: {
        marginTop: 10,
        position: 'relative'
      },

      item: {
        boxSizing: 'border-box',
        height: 40,
        padding: '14px 20px',
        textAlign: 'left',

        ':hover': {
          backgroundColor: StyleConstants.Colors.FOG,
          cursor: 'pointer'
        }
      },

      scrim: {
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 9
      }
    };
  }
});

module.exports = Radium(SimpleSelect);
