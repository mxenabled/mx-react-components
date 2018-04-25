// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router');

const { Button, SimpleSelect } = require('mx-react-components');

const Markdown = require('components/Markdown');

class SimpleSelectDocs extends React.Component {
  state = {
    selectedItem: null,
    showMenu: false
  };

  _handleItemClick = (e, item) => {
    this._toggleMenu();
    this.setState({ selectedItem: item });
  };

  _toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  render () {
    return (
      <div>
        <h1>
          SimpleSelect
          <label>A simple menu used to display a list of icons and/or text. Usually used in conjunction with a <a href='#/components/button'>Button</a> to toggle show/hide.</label>
        </h1>

        <h3>Demo</h3>
        <div style={{ width: 177 }}>
          <Button
            icon='gear'
            onClick={this._toggleMenu}
            type='neutral'
          >
            Settings
          </Button>
          {this.state.showMenu ? (
            <SimpleSelect
              aria-label='Select a category'
              items={[
                { icon: 'auto', text: 'Auto', onClick: this._handleItemClick },
                { icon: 'kids', isSelected: true, text: 'Kids', onClick: this._handleItemClick },
                { icon: 'pets', text: 'Pets', onClick: this._handleItemClick }
              ]}
              onScrimClick={this._toggleMenu}
            />
          ) : null}
        </div>

        <h3>Usage</h3>
        <h5>focusTrapProps<label>Object</label></h5>
        <p>Default: Empty Object</p>
        <p>The SimpleSelect component uses the <a href='https://github.com/davidtheclark/focus-trap-react'>Focus Trap React</a> library to prevent a user from tabing outside the SimpleSelect for accessibility reasons.</p>
        <p>The focusTrapProps object provides a mechanism for passing the focus trap component props.</p>
        <p>See the library documentation for details on what props it accepts and how to use them.</p>

        <h5>iconSize <label>Number</label></h5>
        <p>Default: 20</p>
        <p>The icon size used for icons in menu items if used.</p>

        <h5>items <label>Array</label> Required</h5>
        <p>An array of objects that specify <em>icon</em>, <em>isSelected</em>, <em>text</em>, and/or <em>onClick</em> of the item..</p>

        <h5>onScrimClick <label>function</label></h5>
        <p><em>onClick</em> handler for the menu scrim.</p>

        <h5>scrimClickOnSelect <label>boolean</label></h5>
        <p>Boolean that triggers a scrim click on select. Can be used to auto-close.</p>

        <h5>styles <label>Object</label></h5>
        <p>A nested styles object to override/append any of the styled elements.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    _handleItemClick (e, item) {
      this._toggleMenu();
      alert(\`You clicked $\{item.text\}\`);
    },

    _toggleMenu () {
      this.setState({
        showMenu: !this.state.showMenu
      });
    },

    <div>
      <Button
        icon='gear'
        onClick={this._toggleMenu}
        type='neutral'
      >
        Settings
      </Button>
      {this.state.showMenu ? (
        <SimpleSelect
          aria-label='Select a category'
          items={[
            { icon: 'auto', text: 'Auto', onClick: this._handleItemClick },
            { icon: 'kids', isSelected: true, text: 'Kids', onClick: this._handleItemClick },
            { icon: 'pets', text: 'Pets', onClick: this._handleItemClick }
          ]}
          onScrimClick={this._toggleMenu}
        />
      ) : null}
    </div>
  `}
        </Markdown>
      </div>
    );
  }
}

module.exports = SimpleSelectDocs;
