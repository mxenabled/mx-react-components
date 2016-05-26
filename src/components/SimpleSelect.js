const React = require('react');
const Radium = require('radium');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const SimpleSelect = React.createClass({
  propTypes: {
    items: React.PropTypes.array,
    itemStyles: React.PropTypes.object,
    onItemSelect: React.PropTypes.func,
    onScrimClick: React.PropTypes.func,
    primaryColor: React.PropTypes.string,
    showItems: React.PropTypes.bool,
    styles: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      closeOnDateSelect: false,
      items: [],
      onItemSelect () {},
      onScrimClick () {},
      primaryColor: StyleConstants.Colors.PRIMARY,
      showItems: false
    };
  },

  _handleItemSelect (item) {
    this.props.onItemSelect(item);
  },

  render () {
    const styles = this.styles();

    return (
      <div>
      {this.props.showItems ? (
        <div>
          <div style={Object.assign({}, styles.component)}>
              {this.props.items.map((item, i) => {
                return (
                  <div
                    key={i}
                    onClick={this._handleItemSelect.bind(null, item)}
                    style={Object.assign({}, styles.item, this.props.itemStyles)}
                  >
                    {item.icon ? (
                      <Icon type={item.icon} />
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
        backgroundColor: StyleConstants.Colors.WHITE,
        borderRadius: 3,
        boxShadow: StyleConstants.ShadowHigh,
        boxSizing: 'border-box',
        color: StyleConstants.Colors.BLACK,
        fill: StyleConstants.Colors.BLACK,
        fontFamily: StyleConstants.FontFamily,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        position: 'absolute',
        width: 150,
        zIndex: 10
      }, this.props.style),

      item: {
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
