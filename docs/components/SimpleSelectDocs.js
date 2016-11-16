const React = require('react');

const { Button, SimpleSelect } = require('mx-react-components');

const Markdown = require('components/Markdown');

const SimpleSelectDocs = React.createClass({
  getInitialState () {
    return {
      showMenu: false
    };
  },

  _handleClick () {
    this.setState({
      showMenu: !this.state.showMenu
    });
  },

  _handleItemClick () {
  },

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
            onClick={this._handleClick}
            type='neutral'
          >
            Settings
          </Button>
          {this.state.showMenu ? (
            <SimpleSelect
              items={[
                { icon: 'auto', text: 'Auto', onClick: this._handleItemClick },
                { icon: 'kids', text: 'Kids', onClick: this._handleItemClick },
                { icon: 'pets', text: 'Pets', onClick: this._handleItemClick }
              ]}
              onScrimClick={this._handleClick}
            />
          ) : null}
        </div>

        <h3>Usage</h3>
        <h5>iconSize <label>Number</label></h5>
        <p>Default: 20</p>
        <p>The icon size used for icons in menu items if used.</p>

        <h5>items <label>Array</label> Required</h5>
        <p>An array of objects that specify <em>icon</em>, <em>text</em>, and/or <em>onClick</em> of the item..</p>

        <h5>onScrimClick <label>function</label></h5>
        <p><em>onClick</em> handler for the menu scrim.</p>

        <h5>scrimClickOnSelect <label>boolean</label></h5>
        <p>Boolean that triggers a scrim click on select. Can be used to auto-close.</p>

        <h5>styles <label>Object</label></h5>
        <p>A nested styles object to override/append any of the styled elements.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    _handleClick () {
      this.setState({
        showMenu: !this.state.showMenu
      });
    },

    <div>
      <Button
        icon='gear'
        onClick={this._handleClick}
        type='neutral'
      >
        Settings
      </Button>
      {this.state.showMenu ? (
        <SimpleSelect
          items={[
            { icon: 'auto', text: 'Auto' },
            { icon: 'kids', text: 'Kids' },
            { icon: 'pets', text: 'Pets' }
          ]}
          onScrimClick={this._handleClick}
        />
      ) : null}
    </div>
  `}
        </Markdown>
      </div>
    );
  }
});

module.exports = SimpleSelectDocs;
