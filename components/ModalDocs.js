const React = require('react');

const { Modal } = require('mx-react-components');

const Markdown = require('components/Markdown');

const ModalDocs = React.createClass({
  getInitialState () {
    return {
      showModal: false,
      showSmallModal: false
    };
  },

  _handleModalClick () {
    this.setState({
      showModal: true,
      showSmallModal: false
    });
  },

  _handleSmallModalClick () {
    this.setState({
      showModal: true,
      showSmallModal: true
    });
  },

  _handleModalClose () {
    this.setState({
      showModal: false,
      showSmallModal: false
    });
  }

  render () {
    return (
      <div>
        <h1>
          Modal
          <label>A lightweight Modal used to display any type of content</label>
        </h1>

        <h3>Demo</h3>
        <div style={{ textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <span style={styles.button} onClick={this._handleModalClick}>Show Default Modal</span>
          <span style={styles.button} onClick={this._handleSmallModalClick}>Show Small Modal</span>
        </div>
        <Modal
          isOpen={this.state.showModal}
          isSmall={this.state.showSmallModal}
          onRequestClose={this._handleModalClose}
        >
          <p style={{ fontFamily: 'Helvetica, Arial, sans-serif', textAlign: 'center' }}>I am a modal!</p>
          <img src='http://www.mx.com/images/home/top-t-i.png' style={{ maxWidth: '100%', height: 'auto' }} />
        </Modal>

        <h3>Usage</h3>
        <h5>isOpen <label>Boolean</label></h5>
        <p>Determines if the modal is visible or hidden</p>

        <h5>isSmall <label>Boolean</label></h5>
        <p>If set to 'true', then the modal will have a fixed width of 400px and padding of 30px.</p>

        <h5>onRequestClose <label>Function</label></h5>
        <p>A method that is called when the close button or scrim area is clicked by a user. Use this method to tell the Modal when it should close.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    let isOpen = true;

    _handleModalClose () {
      isOpen = false;
    }

    <Modal
      isOpen={isOpen}
      isSmall={true}
      onRequestClose={_handleModalClose}
    >
  `}
        </Markdown>
      </div>
    );
  }
});

const styles = {
  button: {
    borderRadius: '3px',
    background: '#359BCF',
    padding: '10px 20px',
    display: 'inline-block',
    margin: '0 5px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    WebkitFontSmoothing: 'antialiased'
  }
};

module.exports = ModalDocs;