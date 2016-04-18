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
  },

  render () {
    return (
      <div>
        <h1>
          Modal
          <label>A lightweight Modal used to display any type of content</label>
        </h1>

        <h3>Demo</h3>
        <div style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <span className='button' onClick={this._handleModalClick}>Show Default Modal</span>
          <span className='button' onClick={this._handleSmallModalClick}>Show Small Modal</span>
        </div>
        {this.state.showModal ? (
          <Modal
            buttons={[
              {
                icon: 'close',
                label: 'Secondary',
                onClick: this._handleModalSecondaryClick,
                type: 'secondary'
              },
              {
                icon: 'rocket',
                label: 'Primary',
                onClick: this._handleModalPrimaryClick,
                type: 'primary'
              }
            ]}
            footerContent={(
              <div style={{ color: '#ACB0B3', fontSize: '12px', padding: '2px 0' }}>
                Footer Content
              </div>
            )}
            footerStyle={{ padding: '40px 20px' }}
            onRequestClose={this._handleModalClose}
            showFooter={true}
            showTitleBar={true}
            title='This is the header text'
            tooltip='This is my tooltip content'
            tooltipLabel='This is the footer text.'
            tooltipTitle='This is my tooltip title'
          >
            <div style={{ padding: 20 }}>
              <p style={{ fontFamily: 'Helvetica, Arial, sans-serif', textAlign: 'center' }}>I am a modal!</p>
              <img src='https://unsplash.it/1000/600?random' style={[{ maxWidth: '100%', height: 'auto', margin: 'auto' }, this.state.showSmallModal && { width: 400 }]} />
            </div>
          </Modal>
        ) : null}

        <h3>Usage</h3>

        <h5>buttons <label>Array</label></h5>
        <p>An array of objects with the properties: actionText, className, isActive, icon, label, onClick, style, and type. Used to display button in the footer of the modal. Example:</p>
        <Markdown>
          {`
            [{
              actionText: '',
              className: 'my-button-class',
              isActive: false,
              icon: '',
              label: 'Click Me',
              onClick: function () { //do something },
              style: { marginTop: 10 }, //a style object or Radium array
              type: 'primary' //either 'primary' or 'secondary'
            }]
          `}
        </Markdown>

        <h5>color <label>String</label></h5>
        <p>A css color string to be used as the accent color of the modal: primary button, tooltip title, etc.</p>

        <h5>contentStyle <label>Object</label></h5>
        <p>A style object used to style the content div that wrapps the modal&#39;s content</p>

        <h5>footerContent <label>Node</label></h5>
        <p>A node used to add jsx to the footer element of the modal.</p>

        <h5>footerStyle <label>Object or Array</label></h5>
        <p>A style object used to style the footer div that wrapps the modal&#39;s footer</p>

        <h5>isRelative <label>Boolean</label></h5>
        <p>Default: 'false'</p>
        <p>If set to 'true', then the modal will be positioned absolute instead of fixed.</p>

        <h5>onRequestClose <label>Function</label></h5>
        <p>A method that is called when the close button or scrim area is clicked by a user. Use this method to tell the Modal when it should close.</p>

        <h5>showFooter <label>Boolean</label></h5>
        <p>Default: 'false'</p>
        <p>Determines if the footer section, which contains the tooltip and buttons, is displayed.</p>

        <h5>showTitleBar <label>Boolean</label></h5>
        <p>Default: 'false'</p>
        <p>Determines if the title bar section, which contains the title, is displayed.</p>

        <h5>title <label>String</label></h5>
        <p>The text to be displayed in the title bar at the top of the modal.</p>

        <h5>tooltip <label>String</label></h5>
        <p>The text to be displayed when hovering over the tooltipLabel.</p>

        <h5>tooltipLabel <label>String</label></h5>
        <p>The text to be displayed next to the tooltip icon. Hovering over this text will display the tooltip.</p>

        <h5>tooltipTitle <label>String</label></h5>
        <p>The tooltip title text, which is displayed above the tooltip text and only when hovering over the label.</p>

        <h3>Example</h3>
        <Markdown>
{`
  let isOpen = true;

  _handleModalClose () {
    isOpen = false;
  }

  <Modal
    buttons={[
      {
        label: 'Secondary',
        onClick: this._handleModalSecondaryClick,
        type: 'secondary'
      },
      {
        label: 'Primary',
        onClick: this._handleModalPrimaryClick,
        type: 'primary'
      }
    ]}
    footerContent={(
      <div>
        Footer content
      </div>
    )}
    isOpen={this.state.showModal}
    onRequestClose={_handleModalClose}
    showFooter={true}
    showTitleBar={true}
    tooltipLabel='This is the footer text.'
    title='This is the header text'
    tooltip='This is my tooltip content'
    tooltipTitle='This is my tooltip title'
  >
`}
        </Markdown>
      </div>
    );
  }
});

module.exports = ModalDocs;
