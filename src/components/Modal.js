const React = require('react');

const Button = require('./Button');
const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const Modal = React.createClass({
  propTypes: {
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
      actionText: React.PropTypes.string,
      className: React.PropTypes.string,
      isActive: React.PropTypes.bool,
      icon: React.PropTypes.string,
      label: React.PropTypes.string,
      onClick: React.PropTypes.func,
      style: React.PropTypes.object,
      type: React.PropTypes.oneOf(['primary', 'secondary'])
    })),
    color: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
    footerContent: React.PropTypes.node,
    footerStyle: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    isRelative: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func,
    showFooter: React.PropTypes.bool,
    showTitleBar: React.PropTypes.bool,
    style: React.PropTypes.object,
    title: React.PropTypes.string,
    tooltip: React.PropTypes.string,
    tooltipLabel: React.PropTypes.string,
    tooltipTitle: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      buttons: [],
      color: StyleConstants.Colors.PRIMARY,
      isRelative: false,
      showFooter: false,
      showTitleBar: false,
      title: '',
      tooltip: null,
      tooltipLabel: '',
      tooltipTitle: null
    };
  },

  getInitialState () {
    return {
      showTooltip: false
    };
  },

  componentDidMount () {
  /*eslint-disable */
    if (this.props.hasOwnProperty('isOpen')) {
      console.warn('WARNING: The prop "isOpen" is deprecated in this version of the component. Please handle Modal opening from its parent.');
    }
  /*eslint-enable */
  },

  _handleTooltipToggle (show) {
    this.setState({
      showTooltip: show
    });
  },

  _renderTitleBar () {
    if (this.props.showTitleBar) {
      return (
        <div className='mx-modal-title-bar' style={styles.titleBar}>
          {this.props.title}
        </div>
      );
    } else {
      return null;
    }
  },

  _renderFooter () {
    if (this.props.showFooter) {
      return (
        <div className='mx-modal-footer' style={Object.assign({}, styles.footer, this.props.footerStyle)}>
          {this._renderTooltipIconAndLabel()}
          {this._renderFooterContent()}
          <div className='mx-modal-buttons'>
            {this.props.buttons.map((button, i) => {
              return (
                <Button
                  actionText={button.actionText}
                  className={'mx-modal-button ' + button.className}
                  icon={button.icon}
                  isActive={button.isActive}
                  key={button.type + i}
                  onClick={button.onClick}
                  style={Object.assign({}, styles.button, button.style)}
                  type={button.type}
                >
                  {button.label}
                </Button>
              );
            })}
          </div>
        </div>
      );
    } else {
      return null;
    }
  },

  _renderFooterContent () {
    return (
      <div className='mx-modal-footer-content' style={styles.footerContent}>
        {this.props.footerContent}
      </div>
    );
  },

  _renderTooltip () {
    if (this.state.showTooltip) {
      return (
        <div style={styles.tooltip}>
          <div className='mx-modal-tooltip-title' style={Object.assign({}, styles.tooltipTitle, { color: this.props.color })}>
            {this.props.tooltipTitle}
          </div>
          <div className='mx-modal-tooltip-content' style={styles.tooltipContent}>
            {this.props.tooltip}
          </div>
        </div>
      );
    } else {
      return null;
    }
  },

  _renderTooltipIconAndLabel () {
    if (this.props.tooltip) {
      return (
        <div className='mx-modal-tooltip-label' style={styles.tooltipLabel}>
          <Icon
            className='mx-modal-tooltip-label-icon'
            onMouseOut={this._handleTooltipToggle.bind(null, false)}
            onMouseOver={this._handleTooltipToggle.bind(null, true)}
            size={18}
            style={{ color: this.props.color }}
            type='info'
          />
          <span
            className='mx-modal-tooltip-label-text'
            onMouseOut={this._handleTooltipToggle.bind(null, false)}
            onMouseOver={this._handleTooltipToggle.bind(null, true)}
            style={Object.assign({}, styles.tooltipLabelText, { color: this.props.color })}
          >
            {this.props.tooltipLabel}
          </span>
        </div>
      );
    } else {
      return null;
    }
  },

  render () {
    return (
      <div className='mx-modal' style={Object.assign({}, styles.scrim, this.props.isRelative && styles.relative)}>
        <div className='mx-modal-scrim' onClick={this.props.onRequestClose} style={Object.assign({}, styles.scrim, styles.overlay, this.props.isRelative && styles.relative)}></div>
        <div
          className='mx-modal-container'
          style={Object.assign({}, styles.container, this.props.style)}
        >
          <Icon
            className='mx-modal-close'
            onClick={this.props.onRequestClose}
            size={24}
            style={styles.close}
            type='close-solid'
          />
          {this._renderTitleBar()}
          <div className='mx-modal-content' style={Object.assign({}, styles.content, this.props.contentStyle)}>
            {this.props.children}
            {this._renderTooltip()}
          </div>
          {this._renderFooter()}
        </div>
      </div>
    );
  }
});

const styles = {
  scrim: {
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    textAlign: 'center'
  },
  relative: {
    position: 'absolute'
  },
  overlay: {
    backgroundColor: StyleConstants.Colors.SCRIM
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: '-12px -12px 0 0',
    cursor: 'pointer',
    color: StyleConstants.Colors.CHARCOAL
  },
  container: {
    fontFamily: StyleConstants.FontFamily,
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 1001,
    backgroundColor: StyleConstants.Colors.WHITE,
    boxShadow: StyleConstants.ShadowHigh,
    borderRadius: 2,
    top: 20,
    maxWidth: 'calc(100% - 40px)',
    display: 'inline-block',
    textAlign: 'left'
  },
  titleBar: {
    backgroundColor: StyleConstants.Colors.PORCELAIN,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    padding: '15px 20px',
    color: StyleConstants.Colors.ASH,
    fontSize: StyleConstants.FontSizes.SMALL,
    textTransform: 'uppercase'
  },
  content: {
    position: 'relative',
    maxHeight: 'calc(100% - 140px)',
    overflow: 'auto'
  },
  footer: {
    backgroundColor: StyleConstants.Colors.PORCELAIN,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  footerContent: {
    padding: '5px 0',
    textAlign: 'left'
  },
  tooltipLabel: {
    padding: '5px 0'
  },
  tooltipLabelText: {
    fontSize: StyleConstants.FontSizes.SMALL
  },
  tooltip: {
    backgroundColor: StyleConstants.Colors.PORCELAIN,
    borderColor: StyleConstants.Colors.FOG,
    borderStyle: 'solid',
    borderWidth: 1,
    boxSizing: 'border-box',
    bottom: 10,
    left: 10,
    position: 'absolute',
    width: 250,
    maxWidth: '100%',
    padding: 10
  },
  tooltipTitle: {
    fontSize: StyleConstants.FontSizes.MEDIUM,
    marginBottom: 5
  },
  tooltipContent: {
    color: StyleConstants.Colors.ASH,
    fontSize: StyleConstants.FontSizes.SMALL,
    lineHeight: '1.5em',
    textAlign: 'left'
  },
  buttons: {
    textAlign: 'right'
  },
  button: {
    marginLeft: 5
  },
  small: {
    width: 400,
    textAlign: 'center'
  }
};

module.exports = Modal;
