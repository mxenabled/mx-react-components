const React = require('react');
const Radium = require('radium');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

class Modal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showTooltip: false
    };
  }

  _handleTooltipToggle (show) {
    this.setState({
      showTooltip: show
    });
  }

  _renderTitleBar () {
    if (this.props.showTitleBar) {
      return (
        <div className='mx-modal-title-bar' style={styles.titleBar}>
          {this.props.title}
        </div>
      );
    }
  }

  _renderFooter () {
    if (this.props.showFooter) {
      return (
        <div className='mx-modal-footer' style={styles.footer}>
          {this._renderTooltipIconAndLabel()}
          {this._renderFooterContent()}
          <div className='mx-modal-buttons'>
            {this.props.buttons.map((button, i) => {
              return (
                <div
                  className={'mx-modal-button ' + button.className}
                  key={button.type + i}
                  onClick={button.onClick}
                  style={[styles.button, styles[button.type + 'Button'], button.style]}
                >
                  {button.label}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  _renderFooterContent () {
    if (this.props.footerContent) {
      return (
        <div className='mx-modal-footer-content' style={styles.footerContent}>
          {this.props.footerContent}
        </div>
      );
    }
  }

  _renderTooltip () {
    if (this.state.showTooltip) {
      return (
        <div style={styles.tooltip}>
          <div className='mx-modal-tooltip-title' style={[styles.tooltipTitle, { color: this.props.color }]}>
            {this.props.tooltipTitle}
          </div>
          <div className='mx-modal-tooltip-content' style={styles.tooltipContent}>
            {this.props.tooltip}
          </div>
        </div>
      );
    }
  }

  _renderTooltipIconAndLabel () {
    if (this.props.tooltip) {
      return (
        <div className='mx-modal-tooltip-label' style={styles.tooltipLabel}>
          <Icon
            className='mx-modal-tooltip-label-icon'
            onMouseOut={this._handleTooltipToggle.bind(this, false)}
            onMouseOver={this._handleTooltipToggle.bind(this, true)}
            size={18}
            style={{ color: this.props.color }}
            type='info'
          />
          <span
            className='mx-modal-tooltip-label-text'
            onMouseOut={this._handleTooltipToggle.bind(this, false)}
            onMouseOver={this._handleTooltipToggle.bind(this, true)}
            style={[styles.tooltipLabelText, { color: this.props.color }]}
          >
            {this.props.tooltipLabel}
          </span>
        </div>
      );
    }
  }

  render () {
    if (this.props.isOpen)
      return (
        <div className='mx-modal' style={[styles.scrim, this.props.isRelative && styles.relative]}>
          <div className='mx-modal-scrim' onClick={this.props.onRequestClose} style={[styles.scrim, styles.overlay, this.props.isRelative && styles.relative]}></div>
          <div
            className='mx-modal-container'
            style={[styles.container, this.props.style]}
          >
            <Icon
              className='mx-modal-close'
              onClick={this.props.onRequestClose}
              size={24}
              style={styles.close}
              type='close-solid'
            />
            {this._renderTitleBar()}
            <div className='mx-modal-content' style={[styles.content, this.props.contentStyle]}>
              {this.props.children}
              {this._renderTooltip()}
            </div>
            {this._renderFooter()}
          </div>
        </div>
      );
    else
      return (
        null
      );
  }
}

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
    background: 'rgba(255,255,255,0.9)'
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
    boxShadow: '0 0 30px 5px rgba(0,0,0,0.1)',
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
    display: 'inline-block',
    borderRadius: 2,
    cursor: 'pointer',
    fontSize: StyleConstants.FontSizes.MEDIUM,
    fontWeight: 600,
    padding: '7px 14px',
    marginLeft: 5
  },
  primaryButton: {
    backgroundColor: StyleConstants.Colors.PRIMARY,
    color: StyleConstants.Colors.INVERSE_SECONDARY
  },
  secondaryButton: {
    backgroundColor: StyleConstants.Colors.FOG,
    color: StyleConstants.Colors.CHARCOAL
  },
  small: {
    width: 400,
    textAlign: 'center'
  }
};

Modal.propTypes = {
  buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
    className: React.PropTypes.string,
    label: React.PropTypes.string,
    onClick: React.PropTypes.func,
    style: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    type: React.PropTypes.oneOf(['primary', 'secondary'])
  })),
  color: React.PropTypes.string,
  contentStyle: React.PropTypes.object,
  footerContent: React.PropTypes.node,
  isOpen: React.PropTypes.bool,
  isRelative: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
  showFooter: React.PropTypes.bool,
  showTitleBar: React.PropTypes.bool,
  title: React.PropTypes.string,
  tooltip: React.PropTypes.string,
  tooltipLabel: React.PropTypes.string,
  tooltipTitle: React.PropTypes.string
};

Modal.defaultProps = {
  buttons: [],
  color: StyleConstants.Colors.PRIMARY,
  isOpen: false,
  isRelative: false,
  showFooter: false,
  showTitleBar: false,
  title: '',
  tooltip: null,
  tooltipLabel: '',
  tooltipTitle: null
};

module.exports = Radium(Modal);
