const PropTypes = require('prop-types');
const Radium = require('radium');
const React = require('react');

const StyleConstants = require('../../constants/Style');

class Tab extends React.Component {
  static propTypes = {
    activeTabStyles: PropTypes.object,
    brandColor: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    styles: PropTypes.object
  }

  static defaultProps = {
    isActive: false,
    onClick: () => {},
    styles: {}
  }

  render () {
    const styles = this.styles();
    let style = Object.assign({}, styles.tab, this.props.styles.tab);

    if (this.props.isActive)
      style = Object.assign({}, style, styles.activeTab, this.props.styles.activeTab);

    return (
      <span onClick={this.props.onClick} style={style}>
        {this.props.children}
      </span>
    );
  }

  styles = () => {
    return {
      tab: {
        boxSizing: 'border-box',
        color: StyleConstants.Colors.ASH,
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        fontStyle: StyleConstants.Fonts.SEMIBOLD,
        padding: StyleConstants.Spacing.MEDIUM,
        whiteSpace: 'nowrap',

        ':hover': {
          color: StyleConstants.Colors.CHARCOAL
        }
      },
      activeTab: Object.assign({
        cursor: 'default',
        color: this.props.brandColor,
        borderBottom: '2px solid ' + this.props.brandColor,

        ':hover': {
          color: this.props.brandColor
        }
      }, this.props.activeTabStyles)
    };
  }
}

module.exports = Radium(Tab);
