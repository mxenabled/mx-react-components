const React = require('react');

const { Menu } = require('mx-react-components');

const Markdown = require('components/Markdown');

class MenuDocs extends React.Component {
  state = {
    showItems: false
  };

  _handleClick = () => {
    this.setState({
      showItems: !this.state.showItems
    });
  };

  render() {
    return (
      <div>
        <h1>
          Menu
          <label>A Hambuger menu that displays items</label>
        </h1>

        <h3>Demo</h3>
        <Menu
          isOpen={this.state.showItems}
          items={[
            {
              icon: 'duplicate',
              label: 'Item1',
              onClick: () => {}
            },
            {
              icon: 'no',
              label: 'Item2',
              onClick: () => {}
            },
            {
              icon: 'accounts',
              label: 'Item3',
              onClick: () => {}
            }
          ]}
          onClick={this._handleClick}
        />

        <h3>Usage</h3>
        <h5>alignItems<label>String</label></h5>
        <p>Aligns the items either to the right or left.</p>

        <h5>isOpen<label>Boolean</label></h5>
        <p>Indicates whether the menu items are visible.</p>

        <h5>items<label>Array</label></h5>
        <p>An array of objects that specify icon, label and onClick of the item.</p>

        <h5>onClick<label>Function</label></h5>
        <p>Callback function for the menu click</p>

        <h5>style<label>Object</label></h5>
        <p>Styles for the container around the component.</p>

        <h3>Example</h3>
        <Markdown>
          {`
            _handleClick () {
              this.setState({
                showItems: !this.state.showItems
              });
            },

            <Menu
              alignItems='left'
              isOpen={this.state.showItems}
              items={[
                { icon: 'Icon1', label: 'Item1', onClick: () => {} }
                { icon: 'Icon2', label: 'Item2', onClick: () => {} }
              ]}
              onClick={this._handleClick}
            />
          `}
        </Markdown>
      </div>
    );
  }
}

module.exports = MenuDocs;
