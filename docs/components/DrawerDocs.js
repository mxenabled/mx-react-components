const React = require('react');

const { Button, Drawer } = require('mx-react-components');

const Markdown = require('components/Markdown');

const DrawerDocs = React.createClass({

  getInitialState () {
    return {
      demoDrawerOpen: false
    };
  },

  _handleDemoButtonClick () {
    this.setState({
      demoDrawerOpen: true
    });
  },

  _handleDrawerClose () {
    this.setState({
      demoDrawerOpen: false
    });
  },

  _renderDrawer () {
    const styles = this.styles();

    return (
      <Drawer
        contentStyle={styles.content}
        onClose={this._handleDrawerClose}
        title='Demo Drawer'
      >
        Pellentesque finibus eros magna, ac feugiat mauris pretium posuere. Aliquam nec turpis bibendum, hendrerit eros et, interdum neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc pulvinar tempus sollicitudin. Mauris vel suscipit dolor. Vestibulum hendrerit malesuada ipsum. Mauris feugiat dui vel leo consequat tempor. Praesent aliquet posuere consequat. Nunc vel tellus eleifend leo finibus auctor.
      </Drawer>

    );
  },

  render () {
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
        <h5>animateLeftDistance<label>Number</label></h5>
        <p>This number represents the percent of the screen visible between the left edge of the screen and the left edge of the drawer.</p>

        <h5>breakPoints<label></label></h5>
        <p></p>

        <h5>buttonPrimaryColor<label>String</label></h5>
        <p>Default: '#359BCF'</p>
        <p>This sets the color of the arrow in the close button at the top left of the drawer.</p>

        <h5>closeOnScrimClick<label>Boolean</label></h5>
        <p>Default: true</p>
        <p>To prevent the drawer from closing if a user clicks on the screen outside of the drawer, set this to <em>false</em>.</p>

        <h5>contentStyle<label></label></h5>
        <p>Styles for the content inside the drawer.</p>

        <h5>duration<label>Number</label></h5>
        <p>Default: 500</p>
        <p></p>

        <h5>easing<label>Array</label></h5>
        <p>Easing: [0.28, 0.14, 0.34, 1.04]</p>
        <p></p>

        <h5>headerStyle<label>Object or Array</label></h5>
        <p>Styles for the header part of the drawer.</p>

        <h5>maxWidth<label></label></h5>
        <p>Default: 960</p>
        <p></p>

        <h5>navConfig<label></label></h5>
        <p></p>

        <h5>onClose<label>Function</label> Required</h5>
        <p></p>

        <h5>showCloseButton<label>Boolean</label></h5>
        <p>Default: true</p>
        <p>To remove the close drawer button in the top left corner, set this to <em>false</em>.</p>

        <h5>showScrim<label>Boolean</label></h5>
        <p>Default: true</p>
        <p>If set to <em>true</em>, the part of the screen not covered by the drawer will be opaque. If set to <em>false</em>, the content will stay visible.</p>

        <h5>title<label>String</label></h5>
        <p>Default: ''</p>
        <p>This will be displayed in the header of the drawer component.</p>

        <h5><label></label></h5>
        <p></p>

        <h5><label></label></h5>
        <p></p>

        <h3>Example</h3>
        <Markdown>
  {`
    <Drawer
      onClose={ () => {}}
      buttonPrimaryColor='#333333'
      title='Demo Drawer'
    />
  `}
        </Markdown>
      </div>
    );
  },

  styles () {
    return {
      content: {
        padding: 20
      }
    };
  }
});


module.exports = DrawerDocs;

