const PropTypes = require('prop-types');
const React = require('react');

import { withTheme } from './Theme';
const Icon = require('./Icon');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class Tooltip extends React.Component {
  static propTypes = {
    icon: PropTypes.string,
    iconSize: PropTypes.number,
    placement: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
    style: PropTypes.object,
    theme: themeShape,
    tooltipStyle: PropTypes.object
  };

  static defaultProps = {
    icon: 'info',
    iconSize: 20,
    placement: 'top',
    tooltipStyle: {}
  };

  state = {
    showTooltip: false
  };

  _handleInfoMouseEnter = () => {
    this.setState({
      showTooltip: true
    });
  };

  _handleInfoMouseLeave = () => {
    this.setState({
      showTooltip: false
    });
  };

  _getPosition = () => {
    const offSet = this.props.iconSize + 5;
    const width = this.props.tooltipStyle.width || 200;

    switch (this.props.placement) {
      case 'left':
        return {
          bottom: 0,
          margin: 'auto',
          right: offSet,
          top: 0
        };
      case 'right':
        return {
          bottom: 0,
          left: offSet,
          margin: 'auto',
          top: 0
        };
      case 'top':
        return {
          bottom: offSet,
          left: '50%',
          marginLeft: -(this.props.iconSize / 2 + width / 2)
        };
      case 'bottom':
        return {
          top: offSet,
          left: '50%',
          marginLeft: -(this.props.iconSize / 2 + width / 2)
        };
      default:
        return null;
    }
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);

    return (
      <div style={styles.component}>
        {this.state.showTooltip ? (
          <div style={styles.tooltip}>
            {this.props.children}
          </div>
        ) : null}
        <Icon
          elementProps={{
            onMouseEnter: this._handleInfoMouseEnter,
            onMouseLeave: this._handleInfoMouseLeave
          }}
          size={this.props.iconSize}
          type={this.props.icon}
        />
      </div>
    );
  }

  styles = (theme) => {
    return {
      component: Object.assign({}, {
        display: 'inline-block',
        fill: theme.Colors.GRAY_500,
        position: 'relative'
      }, this.props.style),
      tooltip: Object.assign({},
        {
          alignItems: 'center',
          backgroundColor: theme.Colors.WHITE,
          borderRadius: 3,
          boxShadow: theme.ShadowHigh,
          display: 'flex',
          fontSize: theme.FontSizes.MEDIUM,
          justifyContent: 'center',
          lineHeight: '1.3em',
          minHeight: '100%',
          padding: 10,
          position: 'absolute',
          textAlign: 'center',
          whiteSpace: 'normal',
          width: this.props.tooltipStyle.width || 200,
          zIndex: '10'
        },
        this._getPosition(),
        this.props.tooltipStyle)
    };
  };
}

module.exports = withTheme(Tooltip);
