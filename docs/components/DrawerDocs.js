// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router');

const { Button, Drawer, HeaderMenu, Modal } = require('mx-react-components');

const Markdown = require('components/Markdown');

class DrawerDocs extends React.Component {
  state = {
    demoDrawerOpen: false,
    demoDrawerOpen2: false
  };

  _handleDemoButtonClick = () => {
    this.setState({
      demoDrawerOpen: true
    });
  };

  _handleDrawerClose = () => {
    this.setState({
      demoDrawerOpen: false
    });
  };

  _handleDrawerClose2 = () => {
    this.setState({
      demoDrawerOpen2: false
    });
  };

  _handleSimpleSelectClick = (event, item) => {
    this.setState({
      clickedMenu: item
    });
  };

  _renderDrawer = () => {
    const styles = this.styles();

    return (
      <Drawer
        aria-describedby='description'
        breakPoints={{ large: 1200, medium: 1100 }}
        contentStyle={styles.content}
        headerMenu={({ close }) => (
          <HeaderMenu
            buttonIcon='gear'
            buttonText='Settings'
            items={[
              { icon: 'auto', onClick: this._handleSimpleSelectClick, text: 'Auto' },
              { icon: 'kids', onClick: this._handleSimpleSelectClick, text: 'Kids' },
              { icon: 'close', onClick: close, text: 'Close Drawer' }
            ]}
          />
        )}
        onClose={this._handleDrawerClose}
        portalTo='#app'
        title='Demo'
      >
        {({ close }) => {
          return (
            <div>
              {this.state.clickedMenu && <code>You clicked: {this.state.clickedMenu.text}</code>}
              <p id='description'>
                Drawer Component
              </p>
              <p>
                <Button onClick={close}>Close Drawer</Button>
              </p>
              <p>
                <Button onClick={() => this.setState({ demoDrawerOpen2: true })}>Open Child Drawer</Button>
              </p>
              {this.state.demoDrawerOpen2 && this._renderDrawer2()}
            </div>
          );
        }}
      </Drawer>
    );
  };
  _renderDrawer2 = () => {
    return (
      <Drawer
        onClose={this._handleDrawerClose2}
        portalTo='#app'
        title='Other Drawer'
      >
        <p style={{ padding: 20 }}>
          Child Drawer Component
        </p>
        <p style={{ paddingLeft: 20 }}>
          <Button onClick={() => this.setState({ showModal: true })}>Show Modal</Button>
        </p>
        {this.state.showModal && <Modal onRequestClose={() => this.setState({ showModal: false })}>
          <div style={{ padding: 50, textAlign: 'center' }}>Child Modal Component of Child Drawer Component</div>
        </Modal>}
      </Drawer>
    );
  };

  render () {
    const styles = this.styles();

    return (
      <div>
        <h1>
          Drawer
          <label>A basic drawer component</label>
        </h1>

        <h3>Demo</h3>
        <Button onClick={this._handleDemoButtonClick}>
          Demo Drawer
        </Button>
        {this.state.demoDrawerOpen && this._renderDrawer()}

        <h3>Usage</h3>

        <h5>aria-describedby <label>String</label></h5>
        <p>An id of a child element that describes the Drawer. Used by screen readers for accessibility purposes. See <a href='https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html'>WAI-ARIA documentation for aria-describedby</a>.</p>

        <h5>aria-labelledby <label>String</label></h5>
        <p>An id of a child element that would be considered the title of the Drawer. If not provided, the Drawer defaults to the title header within the Drawer that is populated by the title prop. Used by screen readers for accessibility purposes. See <a href='https://www.w3.org/WAI/GL/wiki/Using_aria-labelledby_to_concatenate_a_label_from_several_text_nodes'>WAI-ARIA documentation for aria-labelledby</a>.</p>

        <h5>animateLeftDistance<label>Number</label></h5>
        <p>This number represents the percent of the screen visible between the left edge of the screen and the left edge of the Drawer.</p>

        <h5>animateOnClose<label>bool</label></h5>
        <p>Default: true</p>
        <p>If passsed as false, prevents the Drawer animation from running on close. Good for situations where you want to use the drawer's back button for something other than closing the Drawer.</p>

        <h5>beforeClose <label>Function</label></h5>
        <p>A callback function that is called before the Drawer's close animation runs and the `onClose` prop is called.</p>

        <h5>breakPoints <label>Object</label></h5>
        <p>This object takes 2 properties:</p>
        <ul style={styles.unorderdLists}>
          <li style={styles.listItem}><h5 style={styles.listItem}>large <label>Number</label></h5></li>
          <li style={styles.listItem}><h5 style={styles.listItem}>medium <label>Number</label></h5></li>
        </ul>
        <p>When the screen size is: <br />
          &#62;&#61; large: drawer width is maxWidth <br />
          &#60;	large and &#62; medium: drawer width is 20% from left side <br />
          &#60;&#61; medium: drawer width is 100%
        </p>

        <h5>children <label>DOM Node/Element or Function</label></h5>
        <p>Children of the Drawer component can be a component, DOM node/element, or a function.</p>
        <p>If children is a function, the function is called and passed an object of exposed Drawer functions. Currently the Drawer's close function is the only exposed function in the object and has a key of `close`. The returned value of the function call must be a component or DOM node/element. This is handy if you need to close the Drawer from the Drawer's content area and want to ensure the Drawer's animation is run before close. See the second example below for more details.</p>

        <h5>closeButtonAriaLabel <label>String</label></h5>
        <p>A string to be used as an aria-label on the Drawer's back button. If not present, the Drawer uses the title prop to construct the aria label instead.</p>

        <h5>closeOnScrimClick <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>To prevent the dDawer from closing if a user clicks on the screen outside of the Drawer, set this to <em>false</em>.</p>

        <h5>contentStyle <label>Object or Array</label></h5>
        <p>Styles for the content inside the Drawer.</p>

        <h5>duration <label>Number</label></h5>
        <p>Default: 500</p>
        <p>This number sets the duration of the Drawer animation.</p>

        <h5>easing <label>Array</label></h5>
        <p>Default: [0.28, 0.14, 0.34, 1.04]</p>
        <p>Easing takes an array for how to step through the Drawer animation.</p>

        <h5>focusOnLoad<label>Boolean</label></h5>
        <p>Default: true</p>
        <p>Determines if the Drawer component is focused on component mount.</p>

        <h5>focusTrapProps<label>Object</label></h5>
        <p>Default: Empty Object</p>
        <p>The Drawer component uses the <a href='https://github.com/davidtheclark/focus-trap-react'>Focus Trap React</a> library to prevent a user from tabing outside the Drawer for accessibility reasons.</p>
        <p>The focusTrapProps object provides a mechanism for passing the focus trap component props.</p>
        <p>See the library documentation for details on what props it accepts and how to use them.</p>

        <h5>headerMenu<label>Component or Function</label></h5>
        <p>A component or function that you can use to  add a menu of items to the header of the Drawer.</p>
        <p>If headerMenu is a function, the function is called and passed an object of exposed Drawer functions. Currently the Drawer's close function is the only exposed function in the object and has a key of `close`. The returned value of the function call must be a component or DOM node/element.</p>
        <p>See first example for how to pass a component as headerMenu.</p>
        <p>See second example for how to pass a function as headerMenu.</p>

        <h5>headerStyle<label>Object or Array</label></h5>
        <p>Styles for the header part of the Drawer.</p>

        <h5>maxWidth<label>Number</label></h5>
        <p>Default: 960</p>
        <p>This is the maximum width of the Drawer component.</p>

        <h5>onClose<label>Function</label> Required</h5>
        <p>This function will be called when a user clicks the close Drawer button.</p>

        <h5>onKeyUp<label>Function</label></h5>
        <p>An event handler for the key up event of the Drawer. If no handler is passed then the Drawer will close when the esc key is pressed.</p>

        <h5>onOpen <label>Function</label></h5>
        <p>A callback function that is called when the Drawer is opened.</p>

        <h5>portalTo <label>String</label></h5>
        <p>A query string used to look up an element in the DOM to render the Drawer next to. If not provided then the Drawer is rendered in place. This uses the React Portals functionality. See <a href='https://reactjs.org/docs/portals.html'>documentation</a> for details.</p>

        <h5>role <label>string</label></h5>
        <p>Default: 'dialog'</p>
        <p>The role applied to the wrapping div around the Drawer's children.  Used for accessibility purposes.  See <a href='https://www.w3.org/TR/wai-aria-1.1/#usage_intro'>WAI-ARIA documentation</a> for more details on roles.</p>

        <h5>showCloseButton<label>Boolean</label></h5>
        <p>Default: true</p>
        <p>To remove the close Drawer button in the top left corner, set this to <em>false</em>.</p>

        <h5>showScrim<label>Boolean</label></h5>
        <p>Default: true</p>
        <p>If set to <em>true</em>, the part of the screen not covered by the Drawer will be opaque. If set to <em>false</em>, the content will stay visible.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

        <h5>title<label>String</label></h5>
        <p>Default: ''</p>
        <p>This will be displayed in the header of the Drawer component. It is also used to make the aria label for the Drawer's close button more descriptive.</p>

        <h5>DEPRECATED: navConfig <label>Object</label></h5>
        <p>This object requires 3 properties:</p>
        <ul style={styles.unorderdLists}>
          <li style={styles.listItem}><h5 style={styles.h5ListItem}>label <label>String</label></h5>This will be displayed between the two arrow buttons.</li>
          <li style={styles.listItem}><h5 style={styles.h5ListItem}>onPreviousClick <label>Function</label></h5> This function will be called when the left arrow is clicked.</li>
          <li style={styles.listItem}><h5 style={styles.h5ListItem}>onNextClick <label>Function</label></h5> this function will be called when the right arrow is clicked.</li>
        </ul>

        <h3>Normal Example</h3>
        <Markdown>
  {`

    _handleDrawerClose () {
      this.setState({
        demoDrawerOpen: false
      });
    },

    <Drawer
      aria-describedby='description'
      breakPoints={{ large: 1200, medium: 1100 }}
      contentStyle={styles.content}
      headerMenu={(
        <HeaderMenu
          handleButtonClick={this._handleSimpleSelectClick}
          handleScrimClick={this._handleSimpleSelectClick}
          showSimpleSelectMenu={this.state.showMenu}
        />
      )}
      onClose={this._handleDrawerClose}
      portalTo='#app'
      title='Demo'
    >
      <p id='description'>This is a demo drawer</p>
    </Drawer>
  `}
        </Markdown>

        <h3>Function as Children Example</h3>
        <Markdown>
  {`

    _handleDrawerClose () {
      this.setState({
        demoDrawerOpen: false
      });
    },

    <Drawer
      breakPoints={{ large: 1200, medium: 1100 }}
      contentStyle={styles.content}
      headerMenu={({ close }) => (
        <HeaderMenu
          handleButtonClick={this._handleSimpleSelectClick}
          handleScrimClick={close}
          showSimpleSelectMenu={this.state.showMenu}
        />
      )}
      onClose={this._handleDrawerClose}
      portalTo='#app'
      title='Demo'
    >
      {({ close }) => {
        return (
          <div>
            <p>
              Content Here
            </p>
            <button onClick={close}>Close the drawer from the content</button>
          </div>
        )
      }}
    </Drawer>
  `}
        </Markdown>
      </div>
    );
  }

  styles = () => {
    return {
      content: {
        padding: 60,
        fontFamily: 'ProximaNovaRegular, Helvetica, Arial, sans-serif',
        color: '#2E323F'
      },
      unorderdLists: {
        marginTop: 0,
        marginBottom: 8
      },
      listItem: {
        marginTop: 0,
        marginBottom: 0
      },
      navLabel: {
        padding: '7px 14px',
        position: 'relative',
        bottom: 5,

        '@media (max-width: 750px)': {
          display: 'none',
          padding: 0
        }
      },
      h5ListItem: {
        marginTop: 0,
        marginBottom: 0
      }
    };
  };
}

module.exports = DrawerDocs;
