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
          <span className='mx-modal-title' style={styles.title}>
            {this.props.title}
          </span>
        </div>
      );
    }
  }

  _renderFooter () {
    if (this.props.showFooter) {
      return (
        <div className='mx-modal-footer' style={styles.footer}>
          {this._renderOnHoverText()}
          <Icon
            className='mx-modal-tooltip-icon'
            onMouseOut={this._handleTooltipToggle.bind(this, false)}
            onMouseOver={this._handleTooltipToggle.bind(this, true)}
            size={18}
            style={{ color: this.props.brandColor }}
            type='info'
          />
          <span
            className='mx-modal-footer-text'
            onMouseOut={this._handleTooltipToggle.bind(this, false)}
            onMouseOver={this._handleTooltipToggle.bind(this, true)}
            style={[styles.footerText, { color: this.props.brandColor }]}
          >
            {this.props.footerText}
          </span>
          {this.props.showPrimaryButton ? (
            <div
              className='mx-modal-footer-primary-button'
              onClick={this.props.onPrimaryButtonClick}
              style={[styles.primaryButton, { backgroundColor: this.props.brandColor }]}
            >
              <span className='mx-modal-footer-primary-button-text' style={styles.primaryButtonText}>
                {this.props.textPrimaryButton}
              </span>
            </div>) : null}

          {this.props.showSecondaryButton ? (
            <div
              className='mx-modal-footer-secondary-button'
              onClick={this.props.onSecondaryButtonClick}
              style={styles.secondaryButton}
            >
              <span className='mx-modal-footer-secondary-button-text' style={styles.secondaryButtonText}>
                {this.props.textSecondaryButton}
              </span>
            </div>) : null}
        </div>
      );
    }
  }

  _renderOnHoverText () {
    if (this.state.showTooltip) {
      return (
        <div style={styles.tooltip}>
          <div style={[styles.tooltipTitle, { color: this.props.color }]}>
            <Icon
              className='mx-modal-tooltip-label-icon'
              size={18}
              style={{ color: this.props.color }}
              type={'attention'}
            />
            <span className='mx-modal-tooltip-label' style={[styles.hoverText, { color: this.props.color }]}>
              {this.props.tooltipTitle}
            </span>
          </div>
          <div className='mx-modal-tooltip-content' style={styles.tooltipContent}>
            {this.props.tooltip}
          </div>
        </div>
      );
    }
  }

  render () {
    if (this.props.isOpen)
      return (
        <div className='mx-modal' style={styles.scrim}>
          <div className='mx-modal-scrim' onClick={this.props.onRequestClose} style={[styles.scrim, styles.overlay]}></div>
          <div
            className='mx-modal-container'
            style={[styles.container, this.props.isSmall && styles.small, this.props.style]}
          >
            <Icon
              className='mx-modal-close'
              onClick={this.props.onRequestClose}
              size='32'
              style={styles.close}
              type='close-solid'
            />
            {this._renderTitleBar()}
            {this.props.children}
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
    left: 0
  },
  overlay: {
    background: 'rgba(255,255,255,0.9)'
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: '-16px -15px 0 0',
    cursor: 'pointer'
  },
  container: {
    fontFamily: StyleConstants.FontFamily,
    boxSizing: 'border-box',
    position: 'fixed',
    zIndex: 1001,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 30px 5px rgba(0,0,0,0.1)',
    borderRadius: '2px',
    width: '60%',
    top: '5%',
    left: 0,
    right: 0,
    margin: 'auto',

    '@media (max-width: 768px)': {
      width: 'auto',
      top: 30,
      left: 10,
      right: 10
    }
  },
  titleBar: {
    backgroundColor: StyleConstants.Colors.PORCELAIN,
    padding: '15px 20px'
  },
  title: {
    color: StyleConstants.Colors.ASH,
    fontSize: '13px',
    textTransform: 'uppercase'
  },
  footer: {
    backgroundColor: StyleConstants.Colors.PORCELAIN,
    padding: '15px 20px'
  },
  footerText: {
    fontSize: '11px'
  },
  hoverText: {
    position: 'relative',
    top: 2
  },
  tooltip: {
    backgroundColor: StyleConstants.Colors.PORCELAIN,
    borderColor: StyleConstants.Colors.FOG,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    bottom: 55,
    height: 95,
    left: 20,
    position: 'absolute',
    width: 250
  },
  tooltipIcon: {
  },
  tooltipContent: {
    color: StyleConstants.Colors.ASH,
    fontSize: '12px',
    lineHeight: 1.45,
    paddingLeft: 12,
    paddingRight: 5,
    paddingTop: 8,
    position: 'absolute',
    textAlign: 'left',
    top: '30%'
  },
  tooltipTitle: {
    fontSize: '12px',
    paddingLeft: 8,
    paddingTop: 10,
    position: 'absolute'
  },
  primaryButton: {
    borderRadius: '2px',
    color: '#FFF',
    cursor: 'pointer',
    float: 'right',
    height: 30,
    margin: '0 20px 0 10px',
    position: 'relative',
    textAlign: 'center',
    top: 10,
    width: 'auto'
  },
  primaryButtonText: {
    color: StyleConstants.Colors.INVERSE_SECONDARY,
    fontSize: '13px',
    fontWeight: 600,
    padding: '10px 10px',
    position: 'relative',
    top: 8
  },
  secondaryButton: {
    backgroundColor: StyleConstants.Colors.FOG,
    borderRadius: '2px',
    color: '#FFF',
    cursor: 'pointer',
    float: 'right',
    height: 30,
    margin: 0,
    position: 'relative',
    top: 10,
    width: 'auto',
    textAlign: 'center'
  },
  secondaryButtonText: {
    color: StyleConstants.Colors.CHARCOAL,
    fontSize: '13px',
    fontWeight: 600,
    padding: '10px 10px',
    position: 'relative',
    top: 8
  },
  small: {
    width: 400,
    textAlign: 'center'
  }
};

Modal.propTypes = {
  color: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  isSmall: React.PropTypes.bool,
  onPrimaryButtonClick: React.PropTypes.func,
  onRequestClose: React.PropTypes.func,
  onSecondaryButtonClick: React.PropTypes.func,
  showFooter: React.PropTypes.bool,
  showTitleBar: React.PropTypes.bool,
  showPrimaryButton: React.PropTypes.bool,
  showSecondaryButton: React.PropTypes.bool,
  footerText: React.PropTypes.string,
  title: React.PropTypes.string,
  textPrimaryButton: React.PropTypes.string,
  textSecondaryButton: React.PropTypes.string,
  tooltip: React.PropTypes.string,
  tooltipTitle: React.PropTypes.string
};

Modal.defaultProps = {
  color: StyleConstants.Colors.PRIMARY,
  isOpen: false,
  isSmall: false,
  onPrimaryButtonClick () {},
  onSecondaryButtonClick () {},
  showFooter: false,
  showTitleBar: false,
  showPrimaryButton: false,
  showSecondaryButton: false,
  footerText: '',
  title: '',
  textPrimaryButton: 'Primary',
  textSecondaryButton: 'Secondary',
  tooltip: null,
  tooltipTitle: null
};

module.exports = Radium(Modal);
