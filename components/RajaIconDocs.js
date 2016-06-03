const React = require('react');

const { RajaIcon, Styles, AppConstants } = require('mx-react-components');

const Markdown = require('components/Markdown');

const RajaIconDocs = React.createClass({
  getInitialState () {
    return {
      icon: {
        value: 'accounts',
        displayValue: 'Accounts'
      }
    };
  },

  _handleSelectChange (option) {
    this.setState({
      icon: option
    });
  },

  render () {
    return (
      <div>
        <h1>
          Raja Icon
          <label>A set of predfined svg icons inspired by the MX products</label>
          <strong>NOTE: These are legacy icons and are not maintained. New icons are added to the Icon component</strong>
        </h1>

        <h3>Demo</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {AppConstants.RajaIcons.map(icon => {
            return (
              <div key={icon.value} style={{ width: 100, height: 100, textAlign: 'center' }}>
                <RajaIcon key={icon.value} size={40} type={icon.value} />
                <div style={{ color: Styles.Colors.ASH, fontSize: Styles.FontSizes.SMALL, marginTop: 5 }}>({icon.value})</div>
              </div>
            );
          })}
        </div>

        <h3>Usage</h3>
        <h5>size <label>Number, String</label></h5>
        <p>A single number representing the width and height of the icon in pixels.</p>

        <h5>type <label>String</label></h5>
        <p>The name of the icon to be displayed. See above for available options.</p>

        <h3>Example</h3>
        <Markdown>
          {`
            <RajaIcon
              size={50}
              type='accounts'
            />
          `}
        </Markdown>
      </div>
    );
  }
});

module.exports = RajaIconDocs;
