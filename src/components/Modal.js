const React = require('react');
const Radium = require('radium');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

class Modal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hoveringInfoIcon: false
    };
  }

  _handleIconMouseHover (show) {
    this.setState({
      hoveringInfoIcon: show
    });
  }

  _renderHeader () {
    if (this.props.showHeader) {
      return (
        <div className='mx-modal-header' style={styles.header}>
          <span className='mx-modal-header-text' style={styles.headerText}>
            {this.props.textHeader}
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
          <div style={styles.infoIcon}>
            <Icon
              class='mx-modal-info-icon'
              onMouseOut={this._handleIconMouseHover.bind(this, false)}
              onMouseOver={this._handleIconMouseHover.bind(this, true)}
              size={18}
              style={{ color: this.props.brandColor }}
              type='info'
            />
          </div>
          <span
            onMouseOut={this._handleIconMouseHover.bind(this, false)}
            onMouseOver={this._handleIconMouseHover.bind(this, true)}
            className='mx-modal-footer-text'
            style={[styles.footerText, { color: this.props.brandColor }]}
          >
            {this.props.textFooter}
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
    if (this.state.hoveringInfoIcon) {
      return (
        <div style={styles.infoBox}>
          <div style={[styles.infoTitle, { color: this.props.brandColor || StyleConstants.Colors.PRIMARY }]}>
            <Icon
              className='mx-modal-title-info-icon'
              size={18}
              style={{ color: this.props.brandColor || StyleConstants.Colors.PRIMARY }}
              type={'attention'}
            />
            <span className='mx-modal-info-title' style={[styles.hoverText, { color: this.props.brandColor || StyleConstants.Colors.PRIMARY }]}>
              {this.props.textInfoTitle}
            </span>
          </div>
          <div className='mx-modal-info-body' style={styles.infoText}>
            {this.props.textInfoBody}
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
            className='mx-modal-content'
            style={[styles.container, this.props.isSmall && styles.small, { padding: this.props.showHeader ? '65px 20px' : '20px 20px' }, this.props.style]}
          >
            <Icon
              className='mx-modal-close'
              onClick={this.props.onRequestClose}
              size='32'
              style={styles.close}
              type='close-solid'
            />
            {this._renderHeader()}
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
    zIndex: 100,
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  overlay: {
    background: 'rgba(255,255,255,0.9)',
    zIndex: 0
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: '-16px -15px 0 0',
    cursor: 'pointer',
    zIndex: 110
  },
  container: {
    fontFamily: StyleConstants.FontFamily,
    boxSizing: 'border-box',
    position: 'fixed',
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
  header: {
    backgroundColor: StyleConstants.Colors.PORCELAIN,
    height: '50px',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  headerText: {
    color: StyleConstants.Colors.ASH,
    fontSize: '13px',
    left: '20px',
    marginTop: '10px',
    padding: '10px 0',
    position: 'absolute',
    textTransform: 'uppercase'
  },
  footer: {
    backgroundColor: StyleConstants.Colors.PORCELAIN,
    bottom: 0,
    height: '50px',
    left: 0,
    position: 'absolute',
    width: '100%'
  },
  footerText: {
    fontSize: '11px',
    left: '30px',
    marginTop: '10px',
    padding: '10px',
    position: 'absolute'
  },
  hoverText: {
    position: 'relative',
    top: '2px'
  },
  infoBox: {
    backgroundColor: StyleConstants.Colors.PORCELAIN,
    borderColor: StyleConstants.Colors.FOG,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    bottom: '55px',
    height: '95px',
    left: '20px',
    position: 'absolute',
    width: '250px'
  },
  infoIcon: {
    left: '20px',
    marginTop: '16px',
    position: 'absolute'
  },
  infoText: {
    color: StyleConstants.Colors.ASH,
    fontSize: '12px',
    lineHeight: 1.45,
    paddingLeft: '12px',
    paddingRight: '5px',
    paddingTop: '8px',
    position: 'absolute',
    textAlign: 'left',
    top: '30%'
  },
  infoTitle: {
    fontSize: '12px',
    paddingLeft: '8px',
    paddingTop: '10px',
    position: 'absolute'
  },
  primaryButton: {
    borderRadius: '2px',
    color: '#FFF',
    cursor: 'pointer',
    float: 'right',
    height: '30px',
    margin: '0 20px 0 10px',
    position: 'relative',
    textAlign: 'center',
    top: '10px',
    width: 'auto',
  },
  primaryButtonText: {
    color: StyleConstants.Colors.INVERSE_SECONDARY,
    fontSize: '13px',
    fontWeight: 600,
    padding: '10px 10px',
    position: 'relative',
    top: '8px'
  },
  secondaryButton: {
    backgroundColor: StyleConstants.Colors.FOG,
    borderRadius: '2px',
    color: '#FFF',
    cursor: 'pointer',
    float: 'right',
    height: '30px',
    margin: '0',
    position: 'relative',
    top: '10px',
    width: 'auto',
    textAlign: 'center'
  },
  secondaryButtonText: {
    color: StyleConstants.Colors.CHARCOAL,
    fontSize: '13px',
    fontWeight: 600,
    padding: '10px 10px',
    position: 'relative',
    top: '8px'
  },
  small: {
    width: '400px',
    textAlign: 'center'
  }
};

Modal.propTypes = {
  brandColor: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  isSmall: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
  onPrimaryButtonClick: React.PropTypes.func,
  onSecondaryButtonClick: React.PropTypes.func,
  textFooter: React.PropTypes.string,
  textInfoBody: React.PropTypes.string,
  textInfoTitle: React.PropTypes.string,
  textHeader: React.PropTypes.string,
  textPrimaryButton: React.PropTypes.string,
  textSecondaryButton: React.PropTypes.string,
  showFooter: React.PropTypes.bool,
  showHeader: React.PropTypes.bool,
  showPrimaryButton: React.PropTypes.bool,
  showSecondaryButton: React.PropTypes.bool
};

Modal.defaultProps = {
  brandColor: '#359BCF',
  isOpen: false,
  isSmall: false,
  onPrimaryButtonClick () {},
  onSecondaryButtonClick () {},
  textFooter: '',
  textInfoBody: 'Aenean commodo ligula eget dolor. Donec interdum, metus et hendrerit aliquet.',
  textInfoTitle: 'Maecenas nec',
  textHeader: '',
  textPrimaryButton: 'Primary',
  textSecondaryButton: 'Secondary',
  showFooter: false,
  showHeader: false,
  showPrimaryButton: false,
  showSecondaryButton: false
};

module.exports = Radium(Modal);
