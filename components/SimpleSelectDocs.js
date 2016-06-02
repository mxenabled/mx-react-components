const React = require('react');

const { Button, SimpleSelect } = require('mx-react-components');

const Markdown = require('components/Markdown');

const SimpleSelectDocs = React.createClass({
  getInitialState () {
    return {
      showMenu: false
    };
  },

  _handleSimpleSelectClick () {
    this.setState({
      showMenu: !this.state.showMenu
    });
  },

  render () {
    return (
      <div>
        <h1>
          SimpleSelect
          <label>A simple menu used to display a list of icons and/or text. Normally used in conjunction with a <a href='/components/button'>Button</a> to toggle show/hide.</label>
        </h1>

        <h3>Demo</h3>
        <div style={{ width: 177 }}>
          <Button
            icon='gear'
            onClick={this._handleSimpleSelectClick}
          >
            Settings
          </Button>
          <SimpleSelect
            items={[
              { text: 'Menu Item 1' },
              { text: 'Menu Item 2' },
              { text: 'Menu Item 3' }
            ]}
            onScrimClick={this._handleSimpleSelectClick}
            showItems={this.state.showSimpleSelectItems}
          />
        </div>

        <h3>Usage</h3>
        <h5>iconSize <label>Number</label></h5>
        <p>Default: 20</p>
        <p>The icon size used for icons in menu items if used.</p>

        <h5>ficonStyles <label>Object</label></h5>
        <p>Styles for the icons in menu items if used.</p>

        <h5>items <label>Array</label> <strong>Required</strong></h5>
        <p>An array of objects that specify <em>icon</em>, <em>text</em>, and/or <em>onClick</em> of the item..</p>

        <h5>itemStyle <label>Object</label></h5>
        <p>Styles for the items in the list.</p>

        <h5>menuStyles <label>Object</label></h5>
        <p>Styles for the menu.</p>

        <h5>onScrimClick <label>function</label></h5>
        <p><em>onClick</em> handler for the menu scrim.</p>

        <h5>style <label>Object</label></h5>
        <p>Default: PRIMARY</p>
        <p>Styles for the container around the component.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    _handleSimpleSelectClick () {
      this.setState({
        showMenu: !this.state.showMenu
      });
    },

    <div style={{ width: 177 }}>
      <Button
        icon='gear'
        onClick={this._handleSimpleSelectClick}
      >
        Settings
      </Button>
      <SimpleSelect
        items={[
          { text: 'Menu Item 1' },
          { text: 'Menu Item 2' },
          { text: 'Menu Item 3' }
        ]}
        onScrimClick={this._handleSimpleSelectClick}
        showItems={this.state.showSimpleSelectItems}
      />
    </div>
  `}
        </Markdown>
      </div>
    );
  }
});

module.exports = SimpleSelectDocs;
