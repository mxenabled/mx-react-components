'use strict';

var React = require('react');
var Button = require('./Button');
var SimpleSelect = require('./SimpleSelect');

function HeaderMenu(_ref) {
  var handleButtonClick = _ref.handleButtonClick,
      handleScrimClick = _ref.handleScrimClick,
      _ref$showSimpleSelect = _ref.showSimpleSelectMenu,
      showSimpleSelectMenu = _ref$showSimpleSelect === undefined ? false : _ref$showSimpleSelect;

  return React.createElement(
    'div',
    { style: { width: 150 } },
    React.createElement(
      Button,
      {
        icon: 'gear',
        onClick: handleButtonClick,
        type: 'neutral'
      },
      'Settings'
    ),
    showSimpleSelectMenu ? React.createElement(SimpleSelect, {
      items: [{ icon: 'auto', text: 'Auto' }, { icon: 'kids', text: 'Kids' }, { icon: 'pets', text: 'Pets' }],
      onScrimClick: handleScrimClick,
      styles: { menu: { left: 65 } }
    }) : null
  );
}

HeaderMenu.propTypes = {
  handleButtonClick: React.PropTypes.func,
  handleScrimClick: React.PropTypes.func,
  showSimpleSelectMenu: React.PropTypes.bool
};

module.exports = HeaderMenu;