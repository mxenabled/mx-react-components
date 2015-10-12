const React = require('react');
const Radium = require('radium');

const Icon = require('./Icon');

class Modal extends React.Component {
  render () {
    if (this.props.isOpen)
      return (
        <div className='mx-modal' style={styles.scrim}>
          <div className='mx-modal-scrim' onClick={this.props.onRequestClose} style={[styles.scrim, styles.overlay]}></div>
          <div className='mx-modal-content' style={[styles.container, this.props.isSmall && styles.small, this.props.style]}>
            <Icon
              className='mx-modal-close'
              onClick={this.props.onRequestClose}
              size='32'
              style={styles.close}
              type='close'
            />
            {this.props.children}
          </div>
        </div>
      );
    else
      return (
        null
      );
  }
};

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
    margin: '-10px -10px 0 0',
    cursor: 'pointer'
  },
  container: {
    position: 'fixed',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 30px 10px rgba(0,0,0,0.1)',
    borderRadius: '3px',
    width: '60%',
    top: '5%',
    left: 0,
    right: 0,
    margin: 'auto',
    padding: '30px',

    '@media (max-width: 768px)': {
      width: 'auto',
      top: 30,
      left: 10,
      right: 10
    }
  },
  small: {
    width: '400px',
    textAlign: 'center',
    padding: '30px'
  }
};

Modal.propTypes = {
  isOpen: React.PropTypes.bool,
  isSmall: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func
};

Modal.defaultProps = {
  isOpen: false,
  isSmall: false
};

module.exports = Radium(Modal);
