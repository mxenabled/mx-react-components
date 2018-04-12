const PropTypes = require('prop-types');
const React = require('react');

import { withTheme } from './Theme';
const Button = require('./Button');
const SimpleSelect = require('./SimpleSelect');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class HeaderMenu extends React.Component {
  static propTypes = {
    buttonIcon: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    theme: themeShape
  }

  state = {
    showSimpleSelectMenu: false
  }

  toggle = () => {
    this.setState({
      showSimpleSelectMenu: !this.state.showSimpleSelectMenu
    });
  }

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const items = this.props.items.map(item =>
      Object.assign({}, item, {
        onClick: (event, itemClicked) => {
          this.toggle();
          item.onClick(event, itemClicked);
        }
      })
    );

    return (
      <div style={{ width: 150 }}>
        <Button
          icon={this.props.buttonIcon}
          onClick={this.toggle}
          theme={theme}
          type='neutral'
        >
          {this.props.buttonText}
        </Button>
        {this.state.showSimpleSelectMenu ? (
          <SimpleSelect
            items={items}
            onScrimClick={this.toggle}
            styles={{ menu: { left: 65 } }}
            theme={theme}
          />
         ) : null}
      </div>
    );
  }
}

module.exports = withTheme(HeaderMenu);
