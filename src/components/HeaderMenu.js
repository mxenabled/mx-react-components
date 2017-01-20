const React = require('react');
const Button = require('./Button');
const SimpleSelect = require('./SimpleSelect');

function HeaderMenu ({ handleButtonClick, handleScrimClick, showSimpleSelectMenu = false }) {
  return (
    <div style={{ width: 150 }}>
      <Button
        icon='gear'
        onClick={handleButtonClick}
        type='neutral'
      >
        Settings
      </Button>
      {showSimpleSelectMenu ? (
        <SimpleSelect
          items={[
            { icon: 'auto', text: 'Auto' },
            { icon: 'kids', text: 'Kids' },
            { icon: 'pets', text: 'Pets' }
          ]}
          onScrimClick={handleScrimClick}
          styles={{ menu: { left: 65 } }}
        />
      ) : null}
    </div>
  );
}

HeaderMenu.propTypes = {
  handleButtonClick: React.PropTypes.func,
  handleScrimClick: React.PropTypes.func,
  showSimpleSelectMenu: React.PropTypes.bool
};

module.exports = HeaderMenu;
