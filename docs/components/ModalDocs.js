// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router');

const { Button, Modal } = require('mx-react-components');

const Markdown = require('components/Markdown');

class ModalDocs extends React.Component {
  state = {
    showModal: false,
    showSmallModal: false
  };

  _handleModalClick = () => {
    this.setState({
      showModal: true,
      showSmallModal: false
    });
  };

  _handleSmallModalClick = () => {
    this.setState({
      showModal: true,
      showSmallModal: true
    });
  };

  _handleModalClose = () => {
    this.setState({
      showModal: false,
      showSmallModal: false
    });
  };

  render () {
    const imageWidth = this.state.showSmallModal ? 400 : 1000;
    const imageHeight = this.state.showSmallModal ? 240 : 600;
    const imageStyle = { width: imageWidth, height: imageHeight, margin: 'auto' };

    return (
      <div>
        <h1>
          Modal
          <label>A lightweight Modal used to display any type of content</label>
        </h1>

        <h3>Demo</h3>
        <div style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <Button className='button' onClick={this._handleModalClick}>Show Default Modal</Button>
          <Button className='button' onClick={this._handleSmallModalClick}>Show Small Modal</Button>
        </div>
        {this.state.showModal ? (
          <Modal
            aria-describedby='description'
            aria-labelledby='title'
            buttons={[
              {
                icon: 'close',
                label: 'Secondary',
                onClick: this._handleModalClose,
                type: 'secondary'
              },
              {
                icon: 'rocket',
                label: 'Primary',
                onClick: this._handleModalClose,
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
            portalTo='#app'
            showFooter={true}
            showTitleBar={true}
            title='This is the header text'
            tooltip='This is my tooltip content'
            tooltipLabel='This is the footer text.'
            tooltipTitle='This is my tooltip title'
          >
            <div style={{ padding: 20, textAlign: 'center' }}>
              <h2 id='title' style={{ fontFamily: 'Helvetica, Arial, sans-serif', textAlign: 'center' }}>I am a modal!</h2>
              <p id='description'>With a picture</p>
              <img alt='Random picture from the internet' src={`https://unsplash.it/${imageWidth}/${imageHeight}?random`} style={imageStyle} />
            </div>
          </Modal>
        ) : null}

        <h3>Usage</h3>

        <h5>aria-describedby <label>string</label></h5>
        <p>An id of a child element that describes the Modal. Used by screen readers for accessibility purposes. See <a href='https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html'>WAI-ARIA documentation for aria-describedby</a></p>

        <h5>aria-label <label>string</label></h5>
        <p>A string applied as a label to the wrapping div around the Modal's children. Used by screen readers for accessibility purposes. See <a href='https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html'>WAI-ARIA documentation for aria-label</a></p>

        <h5>aria-labelledby <label>string</label></h5>
        <p>An id of a child element that is the title of the Modal. Used by screen readers for accessibility purposes. See <a href='https://www.w3.org/WAI/GL/wiki/Using_aria-labelledby_to_concatenate_a_label_from_several_text_nodes'>WAI-ARIA documentation for aria-labelledby</a></p>

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
      primaryColor: Styles.Colors.WARNING,
      style: { marginTop: 10 }, //a style object
      type: 'primary' //either 'primary' or 'secondary'
    }]
  `}
        </Markdown>

        <h5>contentStyle <label>Object</label></h5>
        <p>A style object used to style the content div that wrapps the modal&#39;s content</p>

        <h5>focusOnLoad <label>Boolean</label></h5>
        <p>Default: 'true'</p>
        <p>The modal will try to focus its content on mount.  This prop provides a way to over ride that functionality in case you wish to focus another element instead.</p>

        <h5>focusTrapProps<label>Object</label></h5>
        <p>Default: Empty Object</p>
        <p>The Modal component uses the <a href='https://github.com/davidtheclark/focus-trap-react'>Focus Trap React</a> library to prevent a user from tabing outside the Modal for accessibility reasons.</p>
        <p>The focusTrapProps object provides a mechanism for passing the focus trap component props.</p>
        <p>See the library documentation for details on what props it accepts and how to use them.</p>

        <h5>footerContent <label>Node</label></h5>
        <p>A node used to add jsx to the footer element of the modal.</p>

        <h5>footerStyle <label>Object or Array</label></h5>
        <p>A style object used to style the footer div that wrapps the modal&#39;s footer</p>

        <h5>isRelative <label>Boolean</label></h5>
        <p>Default: 'false'</p>
        <p>If set to 'true', then the modal will be positioned absolute instead of fixed.</p>

        <h5>onRequestClose <label>Function</label></h5>
        <p>A method that is called when the close button or scrim area is clicked by a user. Use this method to tell the Modal when it should close.</p>

        <h5>portalTo <label>String</label></h5>
        <p>A query string used to look up an element in the DOM to render the Modal next to. If not provided then the Modal is rendered in place. This uses the React Portals functionality. See <a href='https://reactjs.org/docs/portals.html'>documentation</a> for details.</p>

        <h5>role <label>string</label></h5>
        <p>Default: 'dialog'</p>
        <p>The role applied to the wrapping div around the Modal's children.  Used for accessibility purposes.  See <a href='https://www.w3.org/TR/wai-aria-1.1/#usage_intro'>WAI-ARIA documentation</a> for more details on roles.</p>

        <h5>showCloseIcon <label>Boolean</label></h5>
        <p>Default: 'true'</p>
        <p>Determines if the close icon is displayed in the top right corner of the Modal.  The Modal can still be closed by clicking on the scrim.</p>

        <h5>showFooter <label>Boolean</label></h5>
        <p>Default: 'false'</p>
        <p>Determines if the footer section, which contains the tooltip and buttons, is displayed.</p>

        <h5>showScrim <label>Boolean</label></h5>
        <p>Default: 'true'</p>
        <p>When set to false, set the scrim background color to transparent.</p>

        <h5>showTitleBar <label>Boolean</label></h5>
        <p>Default: 'false'</p>
        <p>Determines if the title bar section, which contains the title, is displayed.</p>

        <h5>style <label>Object</label></h5>
        <p>Additional styles that can be set on the component.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

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
          <Modal
            aria-describedby='description'
            aria-labelledby='title'
            buttons={[
              {
                icon: 'close',
                label: 'Secondary',
                onClick: this._handleModalClose,
                type: 'secondary'
              },
              {
                icon: 'rocket',
                label: 'Primary',
                onClick: this._handleModalClose,
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
            portalTo='#app'
            showFooter={true}
            showTitleBar={true}
            title='This is the header text'
            tooltip='This is my tooltip content'
            tooltipLabel='This is the footer text.'
            tooltipTitle='This is my tooltip title'
          >
            <div style={{ padding: 20, textAlign: 'center' }}>
              <h2 id='title' style={{ fontFamily: 'Helvetica, Arial, sans-serif', textAlign: 'center' }}>I am a modal!</h2>
              <p id='description'>With a picture</p>
              <img alt='Random picture from the internet' src='https://unsplash.it/1000/600?random' style={imageStyle} />
            </div>
          </Modal>
  `}
        </Markdown>
      </div>
    );
  }
}

module.exports = ModalDocs;
