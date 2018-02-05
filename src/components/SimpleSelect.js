const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const keycode = require('keycode');
const _merge = require('lodash/merge');

const Icon = require('./Icon');
const { Listbox, Option } = require('./accessibility/Listbox');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

class SimpleSelect extends React.Component {
  static propTypes = {
    'aria-label': PropTypes.string,
    hoverColor: PropTypes.string,
    iconSize: PropTypes.number,
    iconStyles: PropTypes.object,
    items: PropTypes.array.isRequired,
    itemStyles: PropTypes.object,
    menuStyles: PropTypes.object,
    onScrimClick: PropTypes.func,
    scrimClickOnSelect: PropTypes.bool,
    style: PropTypes.object,
    styles: PropTypes.object,
    theme: themeShape
  };

  static defaultProps = {
    'aria-label': '',
    scrimClickOnSelect: false,
    items: [],
    onScrimClick () {}
  };

  componentDidMount () {
    deprecatePrimaryColor(this.props, 'hoverColor');

    window.addEventListener('keydown', this._handleKeyDown);

    if (this.props.iconStyles) {
      console.warn('The iconStyles prop is deprecated and will be removed in a future release. Please use styles.');
    }

    if (this.props.menuStyles) {
      console.warn('The menuStyles prop is deprecated and will be removed in a future release. Please use styles.');
    }
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this._handleKeyDown);
  }

  _handleKeyDown = (e) => {
    if (keycode(e) === 'esc') {
      e.preventDefault();
      this.props.onScrimClick(e);
    }
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme, this.props.hoverColor);
    const styles = this.styles(theme);

    return (
      <div style={styles.component}>
        <Listbox
          aria-label={this.props['aria-label']}
          style={styles.menu}
          useGlobalKeyHandler={true}
        >
          {this.props.children ?
            this.props.children :
            (this.props.items.map((item, i) => {
              const { icon, isSelected, onClick, text, ...rest } = item;

              return (
                <Option
                  isSelected={isSelected}
                  key={i}
                  label={text}
                  onClick={e => {
                    if (this.props.scrimClickOnSelect) {
                      this.props.onScrimClick(e);
                    }

                    if (onClick && typeof onClick === 'function') {
                      onClick(e, item);
                    }
                  }}
                  style={styles.item}
                  {...rest}
                >
                  {icon ? (
                    <Icon size={this.props.iconSize || 20} style={styles.icon} type={icon} />
                  ) : null}
                  <div style={styles.text}>{text}</div>
                </Option>
              );
            })
          )}
        </Listbox>
        <div onClick={this.props.onScrimClick} style={styles.scrim} />
      </div>
    );
  }

  styles = (theme) => {
    return _merge({}, {
      component: Object.assign({
        height: 0,
        position: 'relative'
      }, this.props.style),

      menu: Object.assign({}, {
        alignSelf: 'stretch',
        backgroundColor: theme.Colors.WHITE,
        borderRadius: 3,
        boxShadow: theme.ShadowHigh,
        boxSizing: 'border-box',
        color: theme.Colors.GRAY_700,
        display: 'flex',
        flexDirection: 'column',
        fill: theme.Colors.GRAY_700,
        fontFamily: theme.FontFamily,
        fontSize: theme.FontSizes.MEDIUM,
        top: 10,
        position: 'absolute',
        zIndex: 10
      }, this.props.menuStyles),

      item: Object.assign({}, {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        height: 40,
        padding: theme.Spacing.MEDIUM,

        ':hover': {
          backgroundColor: theme.Colors.PRIMARY,
          color: theme.Colors.WHITE,
          cursor: 'pointer',
          fill: theme.Colors.WHITE
        }
      }, this.props.itemStyles),
      icon: Object.assign({}, {
        marginRight: theme.Spacing.SMALL
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
  };
}

module.exports = Radium(SimpleSelect);
