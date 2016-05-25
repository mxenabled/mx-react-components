const React = require('react');
const Radium = require('radium');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const SimpleSelect = React.createClass({
  propTypes: {
    align: React.PropTypes.string,
    items: React.PropTypes.array,
    itemStyles: React.PropTypes.object,
    onItemSelect: React.PropTypes.func,
    primaryColor: React.PropTypes.string,
    styles: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      align: 'left',
      closeOnDateSelect: false,
      items: [],
      onItemSelect () {},
      primaryColor: StyleConstants.Colors.PRIMARY
    };
  },

  getInitialState () {
    return {
      showItems: true
    };
  },

  _handleItemSelect (item) {
    this.props.onItemSelect(item);
    this._handleScrimClick();
  },

  _handleScrimClick () {
    this.setState({
      showItems: false
    });
  },

  render () {
    const styles = this.styles();

    return (
      <div>
      {this.state.showItems ? (
        <div style={styles.wrapper}>
          <div style={Object.assign({}, styles.component)}>
              {this.props.items.map((item, i) => {
                return (
                  <div
                    key={i}
                    onClick={this._handleItemSelect.bind(null, item)}
                    style={Object.assign({}, styles.item, this.props.itemStyles)}
                  >
                    {item.text}
                  </div>
                );
              })}
          </div>
          <div onClick={this._handleScrimClick} style={styles.scrim} />
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
        display: this.state.showItems ? 'inline-block' : 'none',
        fontFamily: StyleConstants.FontFamily,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        position: 'absolute',
        transform: this.props.align === 'left' ? 'translateX(calc(-100% - 30px))' : 'translateX(calc(100% - 120px))',
        width: 150,
        zIndex: 10
      }, this.props.style),

      wrapper: {
        margin: '0 auto',
        position: 'relative',
        width: 0
      },

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
